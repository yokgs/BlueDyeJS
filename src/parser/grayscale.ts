import { $rgb } from "./rgb";

export const $grayscale = function (a: number) {
    return $rgb(a, a, a);
}