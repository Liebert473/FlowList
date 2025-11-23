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
  border: ColorVariant;
};

export type ColorClassMap = Record<string, ColorDefinition>;

export const colorClasses: ColorClassMap = {
  red: {
    bg: {
      normal: "bg-red-400",
      transparent: "bg-red-400/60"
    },
    text: {
      normal: "text-red-400",
      transparent: "text-red-400/60"
    },
    border: {
      normal: "border-red-400",
      transparent: "border-red-400/60"
    }
  },
  orange: {
    bg: {
      normal: "bg-orange-400",
      transparent: "bg-orange-400/60"
    },
    text: {
      normal: "text-orange-400",
      transparent: "text-orange-400/60"
    },
    border: {
      normal: "border-orange-400",
      transparent: "border-orange-400/60"
    }
  },
  yellow: {
    bg: {
      normal: "bg-yellow-400",
      transparent: "bg-yellow-400/60"
    },
    text: {
      normal: "text-yellow-400",
      transparent: "text-yellow-400/60"
    },
    border: {
      normal: "border-yellow-400",
      transparent: "border-yellow-400/60"
    }
  },
  lime: {
    bg: {
      normal: "bg-lime-400",
      transparent: "bg-lime-400/60"
    },
    text: {
      normal: "text-lime-400",
      transparent: "text-lime-400/60"
    },
    border: {
      normal: "border-lime-400",
      transparent: "border-lime-400/60"
    }
  },
  green: {
    bg: {
      normal: "bg-green-400",
      transparent: "bg-green-400/60"
    },
    text: {
      normal: "text-green-400",
      transparent: "text-green-400/60"
    },
    border: {
      normal: "border-green-400",
      transparent: "border-green-400/60"
    }
  },
  teal: {
    bg: {
      normal: "bg-teal-400",
      transparent: "bg-teal-400/60"
    },
    text: {
      normal: "text-teal-400",
      transparent: "text-teal-400/60"
    },
    border: {
      normal: "border-teal-400",
      transparent: "border-teal-400/60"
    }
  },
  sky: {
    bg: {
      normal: "bg-sky-400",
      transparent: "bg-sky-400/60"
    },
    text: {
      normal: "text-sky-400",
      transparent: "text-sky-400/60"
    },
    border: {
      normal: "border-sky-400",
      transparent: "border-sky-400/60"
    }
  },
  blue: {
    bg: {
      normal: "bg-blue-400",
      transparent: "bg-blue-400/60"
    },
    text: {
      normal: "text-blue-400",
      transparent: "text-blue-400/60"
    },
    border: {
      normal: "border-blue-400",
      transparent: "border-blue-400/60"
    }
  },
  purple: {
    bg: {
      normal: "bg-purple-400",
      transparent: "bg-purple-400/60"
    },
    text: {
      normal: "text-purple-400",
      transparent: "text-purple-400/60"
    },
    border: {
      normal: "border-purple-400",
      transparent: "border-purple-400/60"
    }
  },
  fuchsia: {
    bg: {
      normal: "bg-fuchsia-400",
      transparent: "bg-fuchsia-400/60"
    },
    text: {
      normal: "text-fuchsia-400",
      transparent: "text-fuchsia-400/60"
    },
    border: {
      normal: "border-fuchsia-400",
      transparent: "border-fuchsia-400/60"
    }
  },
  pink: {
    bg: {
      normal: "bg-pink-400",
      transparent: "bg-pink-400/60"
    },
    text: {
      normal: "text-pink-400",
      transparent: "text-pink-400/60"
    },
    border: {
      normal: "border-pink-400",
      transparent: "border-pink-400/60"
    }
  },
  rose: {
    bg: {
      normal: "bg-rose-400",
      transparent: "bg-rose-400/60"
    },
    text: {
      normal: "text-rose-400",
      transparent: "text-rose-400/60"
    },
    border: {
      normal: "border-rose-400",
      transparent: "border-rose-400/60"
    }
  },
  slate: {
    bg: {
      normal: "bg-slate-400",
      transparent: "bg-slate-400/60"
    },
    text: {
      normal: "text-slate-400",
      transparent: "text-slate-400/60"
    },
    border: {
      normal: "border-slate-400",
      transparent: "border-slate-400/60"
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
    },
    border: {
      normal: "border-gray-900 dark:border-white",
      transparent: "border-gray-900/60 dark:border-white/60"
    }
  }
};



export const getRandomColor = () => {
    const randomItem = colors[Math.floor(Math.random() * colors.length)]
    return randomItem
}
