import { hue_correction } from "../util/correction";

export const hsv2rgb = ( hsv: number[]) => {
    let [h,s,v]=hsv;
    v *= 2.55;

    if (s === 0) return [v, v, v];

    let n = hue_correction(h) / 60;
    const d = Math.floor(n);
    const f0 = n - d;
    const f1 = v * s / 100;
    const f2 = f1 * f0;
    const f3 = f1 - f2;

    let rgb = [0, 0, 0];

    switch (d) {
        case 0: rgb = [1, f3, f1]; break
        case 1: rgb = [f2, 1, f1]; break
        case 2: rgb = [f1, 1, f3]; break
        case 3: rgb = [f1, f2, 1]; break
        case 4: rgb = [f3, f1, 1]; break
        case 5: rgb = [1, f1, f2]; break
    }
    return rgb.map(x => x + v);
}

export const rgb2hsv = (rgb:number[]): number[] => {
    let [r, g, b] = rgb;
    const min = Math.min(r, g, b),
     max = Math.max(r, g, b);

    if (max === 0)
        return [0, 0, 0];

    let v = max / 2.55;

    if (max === min)
        return [0, 0, v];

    let h = 60;

    const d = max - min;
    let s = d / max * 100;

    if (r === max) h *= (g - b) / d;
    if (g === max) h *= 2 + (b - r) / d;
    if (b === max) h *= 4 + (r - g) / d;


    return [hue_correction(h), s, v];
}