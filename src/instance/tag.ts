import { BlueDyeColorInput, ColorHistory } from "./history"
import { store as _private } from "../store";

export class TaggedColor extends ColorHistory {

    protected tag: string | null;

    constructor(color?: BlueDyeColorInput) {
        super(color);
        this.tag = null;
    }

    setTag(tag: string): TaggedColor {
        if (this.tag) delete _private.tags[this.tag];
        _private.tags[tag] = this;
        this.tag = tag;
        return this;
    }

}