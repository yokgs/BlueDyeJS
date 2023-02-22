import { BlueDyeColorInput } from "./instance/history";
import { color as bluedye } from "./parser/color";
import { alpha_correction, correction } from "./util/correction";
import { shex2number as fromHex, number2shex as hex } from "./util/hex.parse";
import { store as _private } from "./store";
import { $number } from "./parser/number";
import { $grayscale } from "./parser/grayscale";

export class Raw {

    protected RED: number = 0;
    protected GREEN: number = 0;
    protected BLUE: number = 0;
    protected ALPHA: number = 0;

    constructor(color?: BlueDyeColorInput) {
        var s = [0, 0, 0];
        if (typeof color == 'undefined') s[3] = 0;
        if (typeof color == "string") {
            if (/^#[0-9a-fA-F]{3,6}$/.test(color)) {
                color = fromHex(color);
            } else {
                if (color in _private.colors) {
                    return bluedye(_private.colors[color] as number).raw();
                }
                if (/^rgba*\([\d\.\s]+(,|\s)[\d\.\s]+(,|\s)[\d\.\s]+(,|\s)*[\d\.\s]*\)$/.test(color)) {
                    s = [...color.match(/[\d]*[.\d]+/g)||[]].map(x=>parseInt(x));
                }
            }
        }
        if (typeof color == "number") {
            return $number(color).raw();
        }
        if (color instanceof Array) {
            s = color;
            if (s.length === 1) return $grayscale(s[0]).raw();
        }
        if (typeof color == 'boolean') s = color ? [255, 255, 255, 1] : [0, 0, 0, 1];
        this.RED = correction(s[0]);
        this.GREEN = correction(s[1]);
        this.BLUE = correction(s[2]);
        this.ALPHA = alpha_correction(typeof s[3] != 'number' ? 1 : s[3]);
        return this;
    }

    css() {
        if (this.ALPHA === 1) return `rgb(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)})`;
        return `rgba(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)},${alpha_correction(this.ALPHA)})`;
    }
    hex() {
        return `#${hex(this.RED)}${hex(this.GREEN)}${hex(this.BLUE)}`;
    }
    number() {
        return ((correction(this.RED) * 256) + correction(this.GREEN)) * 256 + correction(this.BLUE);
    }
    toArray() {
        return [this.RED, this.GREEN, this.BLUE, this.ALPHA];
    }

}