export const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "sky",
  "blue",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "mono"
] as const;

export type Color = (typeof colors)[number];

export type ColorVariant = {
  normal: string;
  transparent: string;
};

export type ColorDefinition = {
  bg: ColorVariant;
  text: ColorVariant;
};

export type ColorClassMap = Record<string, ColorDefinition>;

export const colorClasses: ColorClassMap = {
  red: {
    bg: {
      normal: "bg-red-500",
      transparent: "bg-red-500/60"
    },
    text: {
      normal: "text-red-500",
      transparent: "text-red-500/60"
    }
  },
  orange: {
    bg: {
      normal: "bg-orange-500",
      transparent: "bg-orange-500/60"
    },
    text: {
      normal: "text-orange-500",
      transparent: "text-orange-500/60"
    }
  },
  yellow: {
    bg: {
      normal: "bg-yellow-500",
      transparent: "bg-yellow-500/60"
    },
    text: {
      normal: "text-yellow-500",
      transparent: "text-yellow-500/60"
    }
  },
  lime: {
    bg: {
      normal: "bg-lime-500",
      transparent: "bg-lime-500/60"
    },
    text: {
      normal: "text-lime-500",
      transparent: "text-lime-500/60"
    }
  },
  green: {
    bg: {
      normal: "bg-green-500",
      transparent: "bg-green-500/60"
    },
    text: {
      normal: "text-green-500",
      transparent: "text-green-500/60"
    }
  },
  teal: {
    bg: {
      normal: "bg-teal-500",
      transparent: "bg-teal-500/60"
    },
    text: {
      normal: "text-teal-500",
      transparent: "text-teal-500/60"
    }
  },
  sky: {
    bg: {
      normal: "bg-sky-500",
      transparent: "bg-sky-500/60"
    },
    text: {
      normal: "text-sky-500",
      transparent: "text-sky-500/60"
    }
  },
  blue: {
    bg: {
      normal: "bg-blue-500",
      transparent: "bg-blue-500/60"
    },
    text: {
      normal: "text-blue-500",
      transparent: "text-blue-500/60"
    }
  },
  purple: {
    bg: {
      normal: "bg-purple-500",
      transparent: "bg-purple-500/60"
    },
    text: {
      normal: "text-purple-500",
      transparent: "text-purple-500/60"
    }
  },
  fuchsia: {
    bg: {
      normal: "bg-fuchsia-500",
      transparent: "bg-fuchsia-500/60"
    },
    text: {
      normal: "text-fuchsia-500",
      transparent: "text-fuchsia-500/60"
    }
  },
  pink: {
    bg: {
      normal: "bg-pink-500",
      transparent: "bg-pink-500/60"
    },
    text: {
      normal: "text-pink-500",
      transparent: "text-pink-500/60"
    }
  },
  rose: {
    bg: {
      normal: "bg-rose-500",
      transparent: "bg-rose-500/60"
    },
    text: {
      normal: "text-rose-500",
      transparent: "text-rose-500/60"
    }
  },
  slate: {
    bg: {
      normal: "bg-slate-500",
      transparent: "bg-slate-500/60"
    },
    text: {
      normal: "text-slate-500",
      transparent: "text-slate-500/60"
    }
  },
    mono: {
    bg: {
      normal: "bg-gray-900 dark:bg-white text-white dark:text-gray-900",
      transparent: "bg-gray-900/60 dark:bg-white/60"
    },
    text: {
      normal: "text-gray-900 dark:text-white",
      transparent: "text-gray-900/60 dark:text-white/60"
    }
  }
};



export const getRandomColor = () => {
    const randomItem = colors[Math.floor(Math.random() * colors.length)]
    return randomItem
}
