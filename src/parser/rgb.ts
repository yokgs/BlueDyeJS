import { color } from "./color";

export const $rgb = function (r: number, g: number, b: number) {
    return color([r, g, b, 1]);
}