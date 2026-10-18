"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type Snapshot = {
  id: number;
  children: ReactNode;
  className?: string;
  bounds: DOMRect;
};
const FinishLoading = createContext<(snapshot: Omit<Snapshot, "id">) => void>(
  () => {},
);

export function LoadingTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const nextId = useRef(0);
  const reducedMotion = useReducedMotion();
  const finish = useCallback(
    (snapshot: Omit<Snapshot, "id">) => {
      if (reducedMotion) return;
      const id = nextId.current++;
      setSnapshots((current) => [...current, { ...snapshot, id }]);
    },
    [reducedMotion],
  );

  return (
    <FinishLoading.Provider value={finish}>
      {children}
      {snapshots.length > 0 &&
        createPortal(
          snapshots.map(({ id, children, className, bounds }) => (
            <motion.div
              key={id}
              aria-hidden="true"
              inert
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onAnimationComplete={() =>
                setSnapshots((current) =>
                  current.filter((item) => item.id !== id),
                )
              }
              className={`skeleton-exit ${className || ""}`}
              style={{
                position: "fixed",
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                margin: 0,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {children}
            </motion.div>
          )),
          document.body,
        )}
    </FinishLoading.Provider>
  );
}

export function SkeletonTransition({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const element = useRef<HTMLDivElement>(null);
  const finish = useContext(FinishLoading);
  // Keep current content without re-running the cleanup on ordinary renders.
  const latest = useRef({ children, className, finish });
  latest.current = { children, className, finish };

  useLayoutEffect(() => {
    const node = element.current;
    return () => {
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      const snapshot = {
        children: latest.current.children,
        className: latest.current.className,
        bounds,
      };
      const complete = latest.current.finish;
      requestAnimationFrame(() => {
        // Strict Mode also runs cleanup while the skeleton is still visible.
        if (node.isConnected && node.getClientRects().length > 0) return;
        complete(snapshot);
      });
    };
  }, []);

  return (
    <div
      {...props}
      ref={element}
      data-skeleton="true"
      className={`skeleton-enter ${className}`}
    >
      {children}
    </div>
  );
}
