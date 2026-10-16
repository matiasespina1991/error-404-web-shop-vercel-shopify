"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function ScrollHeader({ children }: { children: ReactNode }) {
  const placeholder = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [fixed, setFixed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = placeholder.current;
    const element = header.current;
    if (!container || !element) return;

    // Reserve the original space so switching to fixed never moves the page.
    const resize = new ResizeObserver(() => {
      setHeight(element.getBoundingClientRect().height);
    });
    resize.observe(element);

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry) setFixed(entry.boundingClientRect.bottom <= 0);
    });
    visibility.observe(container);
    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div ref={placeholder} style={{ height }}>
      <motion.div
        ref={header}
        initial={false}
        animate={{ opacity: fixed && !reducedMotion ? [0, 1] : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className={fixed ? "fixed inset-x-0 top-0 z-40 bg-black" : "relative"}
      >
        {children}
      </motion.div>
    </div>
  );
}
