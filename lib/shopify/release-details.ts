type ReleaseDetails = {
  tracks: {
    position: string;
    title: string;
    duration?: string;
    remixBy?: string;
    vocalsBy?: string;
  }[];
  details: [string, string][];
  credits: [string, string][];
  identifiers?: [string, string][];
};

export const RELEASE_DETAILS: Record<string, ReleaseDetails> = {
  "r-36015688": {
    tracks: [
      {
        position: "A1",
        title: "Extravagancia (Vocals by Lourene)",
        vocalsBy: "Lourene",
      },
      { position: "A2", title: "The Last Romantic" },
      { position: "B1", title: "Nastysanty" },
      {
        position: "B2",
        title: "The Last Romantic (Light Blue File Rework)",
        remixBy: "Light Blue File",
      },
    ],
    details: [
      ["Label", "Error404 - ERROR404-02"],
      ["Format", 'Vinyl, 12", 33 ⅓ RPM, EP'],
      ["Country", "Spain"],
      ["Released", "December 2025"],
      ["Genre", "Electronic"],
      ["Style", "Electro, House, Deep House, Breakbeat"],
    ],
    credits: [["Distributed by", "Runas Distribution"]],
  },
  "r-36497119": {
    tracks: [
      { position: "A1", title: "Limpiaelmantel" },
      { position: "A2", title: "The Congo" },
      { position: "B1", title: "Try Again" },
    ],
    details: [
      ["Label", "Akasha Records - AKSH002"],
      ["Format", 'Vinyl, 12", EP'],
      ["Country", "Spain"],
      ["Released", "2026"],
      ["Genre", "Electronic"],
      ["Style", "Techno, Deep Techno, Dub Techno, Tribal"],
    ],
    credits: [
      ["Distributed by", "Runas Distribution"],
      ["Lacquer cut at", "Analogcut Mastering"],
      ["Artwork by", "MZ"],
      ["Mastered by", "Dani Labb"],
      ["Written and produced by", "Light Blue File"],
    ],
    identifiers: [
      ["Matrix / Runout (side A)", "AKSH002 A ANALOGCUT"],
      ["Matrix / Runout (side B)", "AKSH002 B ANALOGCUT"],
    ],
  },
  "r-23299694": {
    tracks: [
      { position: "A1", title: "Zarem - Sun Ray", duration: "7:00" },
      {
        position: "B1",
        title: "Zarem - Sun Ray (Philippe Jeanneret Remix)",
        duration: "6:48",
      },
    ],
    details: [
      ["Label", "Error404 - ERROR404-01"],
      ["Format", 'Vinyl, 12", EP'],
      ["Country", "Germany"],
      ["Released", "June 10, 2022"],
      ["Style", "Breaks, House, Tech House"],
    ],
    credits: [
      ["Artwork by", "Analogbrek"],
      ["Mastered by", "Matthias Heinstein"],
    ],
  },
  "r-34787453": {
    tracks: [
      { position: "A1", title: "Monkey Slayer", duration: "4:58" },
      {
        position: "A2",
        title: "Monkey Slayer (Deep Mariano 0355AM Remix)",
        duration: "6:54",
        remixBy: "Deep Mariano",
      },
      { position: "B1", title: "After", duration: "5:03" },
      { position: "B2", title: "Reincarnation", duration: "6:11" },
      {
        position: "B3",
        title: "Memory Access (Ambient Mix)",
        duration: "4:36",
      },
    ],
    details: [
      ["Label", "Akasha Records - AKSH001"],
      ["Format", 'Vinyl, 12", 33 ⅓ RPM, EP'],
      ["Country", "Spain"],
      ["Released", "August 8, 2025"],
      ["Genre", "Electronic"],
      ["Style", "House, Ambient, Electro, Techno"],
    ],
    credits: [["Distributed by", "Runas Distribution"]],
  },
};
