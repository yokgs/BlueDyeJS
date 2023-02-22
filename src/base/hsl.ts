import { hue_correction } from "../util/correction";

export const hsl2rgb = (hsl: number[]) => {
    let [h, s, l] = hsl;
    if (s === 0)
        return [l, l, l].map(x => x * 2.55);

    const p = [h + 120, h, h - 120].map(hue_correction);

    s /= 100;
    l /= 100;
    const m = l * s;
    const q = l < 0.5 ? m : s - m;
    const t = l - q;
    const h_ = h / 360;

    return p.map(n => {
        if (n < 60)
            return t + q * n / 30;
        if (n < 180)
            return l + q;
        if (n < 240)
            return t + q * (8 - n / 30);
        return t;
    }).map(x => x * 255);

}

export const rgb2hsl = (rgb: number[]) => {

    let [r, g, b] = rgb;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    let d = max - min,
        t = max + min;

    const l = t / 5.1;
    let h = 60;

    t /= 255;
    if (d === 0)
        return [0, 0, l];

    let s = d / (l < 50 ? t : 2 - t) / 2.55;

    if (r == max) h *= (g - b) / d;
    else if (g == max) h *= 2 + (b - r) / d;
    else if (b == max) h *= 4 + (r - g) / d;

    return [hue_correction(h), s, l];
}