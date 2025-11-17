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
    "slate"
]

export const getRandomColor = () => {
    const randomItem = colors[Math.floor(Math.random() * colors.length)]
    return randomItem
}
