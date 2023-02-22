import { hsl2rgb, rgb2hsl } from "../base/hsl";
import { hsv2rgb, rgb2hsv } from "../base/hsv";
import { BlueDyeColorInput } from "../instance/history";
import { hue_correction } from "../util/correction";
import { dark, light } from "../util/functions";
import { BasicEffects } from "./basic";

type ColorOrValue = BlueDye | number;

export class BlueDye extends BasicEffects {

    constructor(color?: BlueDyeColorInput) {
        super(color);
    }

    desaturate(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        const s = this.saturation() as number;
        return this.saturation(dark(s * 2.5, level) / 2.5) as this;
    }

    saturate(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        const s = this.saturation() as number;
        return this.saturation(light(s * 2.5, level) / 2.5) as this;
    }

    complementary() {
        return this.rotate(180);
    }

    rotate(hue: number) {
        let h = hue_correction((this.hue() as number) + hue);
        return this.hue(h) as this;
    }

    hue($p?: number): ColorOrValue {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([hue_correction($p), s, v]));
            return this.save();
        }
        return h;
    }

    saturation($p?: number): ColorOrValue {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([h, $p, v]));
            return this.save();
        }
        return s;
    }

    value($p?: number): ColorOrValue {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([h, s, $p]));
            return this.save();
        }
        return v;
    }

    lightness($p?:number): ColorOrValue {
        let [h, s, l] = rgb2hsl(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsl2rgb([h, s, $p]));
            return this.save();
        }
        return l;
    }

    hsv() {

    }

    template($t:string) {
        const tokens = [...new Set($t.match(/\$[rgbhsvla]/ig)||[])],
        color = this;
        tokens.forEach(token =>{
            let value = 0;
            switch(token){
                case 'r': value = color.RED;break;
                case 'g': value = color.GREEN;break;
                case 'b': value = color.BLUE;break;
                case 'h': value = color.hue() as number;break;
                case 's': value = color.saturation() as number;break;
                case 'l': value = color.lightness() as number;break;
                case 'v': value = color.value() as number;break;
                case 'a': value = color.ALPHA;break;
            }
            $t = $t.replace(new RegExp('\\'+token,'g'), value.toString());
        })
        return $t;
    }


}