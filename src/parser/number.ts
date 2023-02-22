import { color } from "./color";

export const $number = function (n: number) {
    var s = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
        s[i] = Math.floor(n) % 256;
        n /= 256;
    }
    return color(s);
}
