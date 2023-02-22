import { BlueDye } from "../effects/hsv";
import { BlueDyeColorInput, ColorHistory } from "../instance/history";
export const color = function (color?: BlueDyeColorInput) {
    return new BlueDye(color);
}