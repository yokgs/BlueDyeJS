export const cmyk2rgb = (cmyk: number[]) => {
    const [c, m, y, k] = cmyk;

    if (k === 100) return [0, 0, 0];

    const i = 2.55 * (100 - k);

    return [
        c < 100 ? 100 - c : 0,
        m < 100 ? 100 - m : 0,
        y < 100 ? 100 - y : 0
    ].map(x => x * i);
}

export const rgb2cmyk = (rgb: number[]) => {
    let [r, g, b] = rgb.map(x => x / 2.55);
    const k = 100 - Math.max(r, g, b);
    const f = k < 100 ? 100 / (100 - k) : 0;
    const c = (100 - r - k) * f;
    const m = (100 - g - k) * f;
    const y = (100 - b - k) * f;
    return [c, m, y, k];
}