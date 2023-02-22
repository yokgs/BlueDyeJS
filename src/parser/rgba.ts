import { color } from "./color";

export const $rgba = function (r: number, g: number, b: number, a: number) {
    return color([r, g, b, a]);
}