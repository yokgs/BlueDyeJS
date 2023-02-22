
import { color } from "./parser/color";
import { $grayscale } from "./parser/grayscale";
import { $number } from "./parser/number";
import { $rgb } from "./parser/rgb";
import { $rgba } from "./parser/rgba";
import { BlueDye } from "./effects/hsv";

let bluedye = {
    color,
    grayscale: $grayscale,
    rgb: $rgb,
    rgba: $rgba,
    number: $number,
    version: [3, 0, 0],
    fn: BlueDye
};

export default bluedye;