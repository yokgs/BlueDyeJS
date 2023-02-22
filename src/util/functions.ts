export const dark = (a: number, b: number) => (1 - b / 100) * a;
export const light = (a: number, b: number) => (a + b / 100 * (255 - a));