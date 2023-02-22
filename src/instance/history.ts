import { color as bluedye } from "../parser/color";
import { alpha_correction, correction } from "../util/correction";
import { shex2number as fromHex, number2shex as hex } from "../util/hex.parse";
import { store as _private } from "../store";
import { $number } from "../parser/number";
import { $grayscale } from "../parser/grayscale";
import { Raw } from "../raw";

export type BlueDyeColorInput = number | string | number[] | boolean | null;

export class ColorHistory extends Raw {

    private backup: number[][];
    private R: number[];
    private recycle: number[][];

    constructor(color?: BlueDyeColorInput) {
        super(color);
        this.R = this.toArray();
        this.backup = [];
        this.recycle = []
        return this.save();
    }

    save() {
        this.backup.push(this.toArray());
        this.recycle = [];
        return this;
    }

    pin() {
        this.R = this.toArray();
        this.backup = [];
        this.recycle = [];
        return this.save();
    }

    reset() {
        [this.RED, this.GREEN, this.BLUE, this.ALPHA] = this.R;
        this.backup = [];
        this.recycle = [];
        return this.save();
    }

    undo(n = 1) {
        if (this.backup.length <= 1) return this;
        while (n-- && this.backup.length > 1) {
            this.recycle.push(this.backup.pop() as number[]);
        }
        [this.RED, this.GREEN, this.BLUE, this.ALPHA] = this.backup[this.backup.length - 1];
        return this;
    }

    redo(n = 1) {
        while (n-- && this.recycle.length > 0) {
            this.backup.push(this.recycle.pop() as number[]);
        }
        [this.RED, this.GREEN, this.BLUE, this.ALPHA] = this.backup[this.backup.length - 1];
        return this;
    }

    ignore(n = 1) {
        while (n-- && this.backup.length > 1) {
            this.backup.pop();
        }
        this.backup.pop();
        this.backup.push(this.toArray());
        return this;
    }

    raw(): Raw {
        return new Raw(this.toArray());
    }

};


export const prototype = ColorHistory.prototype;