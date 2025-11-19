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
] as const;

export type Color = (typeof colors)[number];

type ColorClass = {
  bg: {
    normal: string;
    transparent: string;
  };
};

export type ColorClassMap = Record<Color, ColorClass>;

export const colorClasses: ColorClassMap = {
  red: {
    bg: {
      normal: "bg-red-500",
      transparent: "bg-red-500/60"
    }
  },
  orange: {
    bg: {
      normal: "bg-orange-500",
      transparent: "bg-orange-500/60"
    }
  },
  yellow: {
    bg: {
      normal: "bg-yellow-500",
      transparent: "bg-yellow-500/60"
    }
  },
  lime: {
    bg: {
      normal: "bg-lime-500",
      transparent: "bg-lime-500/60"
    }
  },
  green: {
    bg: {
      normal: "bg-green-500",
      transparent: "bg-green-500/60"
    }
  },
  teal: {
    bg: {
      normal: "bg-teal-500",
      transparent: "bg-teal-500/60"
    }
  },
  sky: {
    bg: {
      normal: "bg-sky-500",
      transparent: "bg-sky-500/60"
    }
  },
  blue: {
    bg: {
      normal: "bg-blue-500",
      transparent: "bg-blue-500/60"
    }
  },
  purple: {
    bg: {
      normal: "bg-purple-500",
      transparent: "bg-purple-500/60"
    }
  },
  fuchsia: {
    bg: {
      normal: "bg-fuchsia-500",
      transparent: "bg-fuchsia-500/60"
    }
  },
  pink: {
    bg: {
      normal: "bg-pink-500",
      transparent: "bg-pink-500/60"
    }
  },
  rose: {
    bg: {
      normal: "bg-rose-500",
      transparent: "bg-rose-500/60"
    }
  },
  slate: {
    bg: {
      normal: "bg-slate-500",
      transparent: "bg-slate-500/60"
    }
  }
}



export const getRandomColor = () => {
    const randomItem = colors[Math.floor(Math.random() * colors.length)]
    return randomItem
}
