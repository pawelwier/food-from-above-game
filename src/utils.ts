export const getRandom = ({ min = 0, max }) => Math.floor(Math.random() * (max + 1 - min) + min)