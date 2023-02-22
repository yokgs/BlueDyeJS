import { BlueDyeColorInput } from "../instance/history";
import { correction } from "../util/correction";
import { dark, light } from "../util/functions";
import { TaggedColor } from "../instance/tag";

export class BasicEffects extends TaggedColor {

    constructor(color?: BlueDyeColorInput) {
        super(color);
    }

    dark(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => dark(x, level));
        return this.save();
    }

    light(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => light(x, level));
        return this.save();
    }

    negative() {
        [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => (255 - x));
        return this.save();
    }

    redToBlue() {
        [this.BLUE, this.RED, this.GREEN] = this.toArray();
        return this.save();
    }

    blueToRed() {
        [this.GREEN, this.BLUE, this.RED] = this.toArray();
        return this.save();
    }

    gray() {
        let y = (this.RED + this.GREEN + this.BLUE) / 3;
        this.RED = this.GREEN = this.BLUE = y;
        return this.save();
    }

    grey() {
        return this.gray();
    }

    random() {
        this.RED = correction(Math.random() * 256);
        this.GREEN = correction(Math.random() * 256);
        this.BLUE = correction(Math.random() * 256);
        return this.save();
    }

    rgb(rgb:number[]) {
        [this.RED, this.GREEN, this.BLUE] = rgb;
        return this.save();
    }

}
