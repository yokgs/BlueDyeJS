export const correction = (a: number) => Math.max(0, Math.min(Math.round(a), 255));

export const alpha_correction = (a: number) => Math.max(0, Math.min(a, 1));

export const hue_correction = (a: number): number => ((a < 0) ? hue_correction(a + 360) : a % 360);