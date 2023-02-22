const correction = (a) => Math.max(0, Math.min(Math.round(a), 255));
const alpha_correction = (a) => Math.max(0, Math.min(a, 1));
const hue_correction = (a) => ((a < 0) ? hue_correction(a + 360) : a % 360);

const hsl2rgb = (hsl) => {
    let [h, s, l] = hsl;
    if (s === 0)
        return [l, l, l].map(x => x * 2.55);
    const p = [h + 120, h, h - 120].map(hue_correction);
    s /= 100;
    l /= 100;
    const m = l * s;
    const q = l < 0.5 ? m : s - m;
    const t = l - q;
    return p.map(n => {
        if (n < 60)
            return t + q * n / 30;
        if (n < 180)
            return l + q;
        if (n < 240)
            return t + q * (8 - n / 30);
        return t;
    }).map(x => x * 255);
};
const rgb2hsl = (rgb) => {
    let [r, g, b] = rgb;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    let d = max - min, t = max + min;
    const l = t / 5.1;
    let h = 60;
    t /= 255;
    if (d === 0)
        return [0, 0, l];
    let s = d / (l < 50 ? t : 2 - t) / 2.55;
    if (r == max)
        h *= (g - b) / d;
    else if (g == max)
        h *= 2 + (b - r) / d;
    else if (b == max)
        h *= 4 + (r - g) / d;
    return [hue_correction(h), s, l];
};

const hsv2rgb = (hsv) => {
    let [h, s, v] = hsv;
    v *= 2.55;
    if (s === 0)
        return [v, v, v];
    let n = hue_correction(h) / 60;
    const d = Math.floor(n);
    const f0 = n - d;
    const f1 = v * s / 100;
    const f2 = f1 * f0;
    const f3 = f1 - f2;
    let rgb = [0, 0, 0];
    switch (d) {
        case 0:
            rgb = [1, f3, f1];
            break;
        case 1:
            rgb = [f2, 1, f1];
            break;
        case 2:
            rgb = [f1, 1, f3];
            break;
        case 3:
            rgb = [f1, f2, 1];
            break;
        case 4:
            rgb = [f3, f1, 1];
            break;
        case 5:
            rgb = [1, f1, f2];
            break;
    }
    return rgb.map(x => x + v);
};
const rgb2hsv = (rgb) => {
    let [r, g, b] = rgb;
    const min = Math.min(r, g, b), max = Math.max(r, g, b);
    if (max === 0)
        return [0, 0, 0];
    let v = max / 2.55;
    if (max === min)
        return [0, 0, v];
    let h = 60;
    const d = max - min;
    let s = d / max * 100;
    if (r === max)
        h *= (g - b) / d;
    if (g === max)
        h *= 2 + (b - r) / d;
    if (b === max)
        h *= 4 + (r - g) / d;
    return [hue_correction(h), s, v];
};

const dark = (a, b) => (1 - b / 100) * a;
const light = (a, b) => (a + b / 100 * (255 - a));

const number2shex = (a) => ((a > 15 ? '' : '0') + Math.floor(a).toString(16));
const shex2number = (a) => {
    if (a.length == 4)
        return parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16);
    return parseInt(a.substr(1), 16);
};

const colors = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgrey: 11119017,
    darkgreen: 25600,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    grey: 8421504,
    green: 32768,
    greenyellow: 11403055,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgrey: 13882323,
    lightgreen: 9498256,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662680,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14184595,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};

const store = {
    colors: Object.create(colors),
    tags: {}
};

const $number = function (n) {
    var s = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
        s[i] = Math.floor(n) % 256;
        n /= 256;
    }
    return color(s);
};

const $rgb = function (r, g, b) {
    return color([r, g, b, 1]);
};

const $grayscale = function (a) {
    return $rgb(a, a, a);
};

class Raw {
    RED = 0;
    GREEN = 0;
    BLUE = 0;
    ALPHA = 0;
    constructor(color$1) {
        var s = [0, 0, 0];
        if (typeof color$1 == 'undefined')
            s[3] = 0;
        if (typeof color$1 == "string") {
            if (/^#[0-9a-fA-F]{3,6}$/.test(color$1)) {
                color$1 = shex2number(color$1);
            }
            else {
                if (color$1 in store.colors) {
                    return color(store.colors[color$1]).raw();
                }
                if (/^rgba*\([\d\.\s]+(,|\s)[\d\.\s]+(,|\s)[\d\.\s]+(,|\s)*[\d\.\s]*\)$/.test(color$1)) {
                    s = [...color$1.match(/[\d]*[.\d]+/g) || []].map(x => parseInt(x));
                }
            }
        }
        if (typeof color$1 == "number") {
            return $number(color$1).raw();
        }
        if (color$1 instanceof Array) {
            s = color$1;
            if (s.length === 1)
                return $grayscale(s[0]).raw();
        }
        if (typeof color$1 == 'boolean')
            s = color$1 ? [255, 255, 255, 1] : [0, 0, 0, 1];
        this.RED = correction(s[0]);
        this.GREEN = correction(s[1]);
        this.BLUE = correction(s[2]);
        this.ALPHA = alpha_correction(typeof s[3] != 'number' ? 1 : s[3]);
        return this;
    }
    css() {
        if (this.ALPHA === 1)
            return `rgb(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)})`;
        return `rgba(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)},${alpha_correction(this.ALPHA)})`;
    }
    hex() {
        return `#${number2shex(this.RED)}${number2shex(this.GREEN)}${number2shex(this.BLUE)}`;
    }
    number() {
        return ((correction(this.RED) * 256) + correction(this.GREEN)) * 256 + correction(this.BLUE);
    }
    toArray() {
        return [this.RED, this.GREEN, this.BLUE, this.ALPHA];
    }
}

class ColorHistory extends Raw {
    backup;
    R;
    recycle;
    constructor(color) {
        super(color);
        this.R = this.toArray();
        this.backup = [];
        this.recycle = [];
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
        if (this.backup.length <= 1)
            return this;
        while (n-- && this.backup.length > 1) {
            this.recycle.push(this.backup.pop());
        }
        [this.RED, this.GREEN, this.BLUE, this.ALPHA] = this.backup[this.backup.length - 1];
        return this;
    }
    redo(n = 1) {
        while (n-- && this.recycle.length > 0) {
            this.backup.push(this.recycle.pop());
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
    raw() {
        return new Raw(this.toArray());
    }
}

class TaggedColor extends ColorHistory {
    tag;
    constructor(color) {
        super(color);
        this.tag = null;
    }
    setTag(tag) {
        if (this.tag)
            delete store.tags[this.tag];
        store.tags[tag] = this;
        this.tag = tag;
        return this;
    }
}

class BasicEffects extends TaggedColor {
    constructor(color) {
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
    rgb(rgb) {
        [this.RED, this.GREEN, this.BLUE] = rgb;
        return this.save();
    }
}

class BlueDye extends BasicEffects {
    constructor(color) {
        super(color);
    }
    desaturate(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        const s = this.saturation();
        return this.saturation(dark(s * 2.5, level) / 2.5);
    }
    saturate(level = 1) {
        level = Math.min(Math.max(level, 0), 100);
        const s = this.saturation();
        return this.saturation(light(s * 2.5, level) / 2.5);
    }
    complementary() {
        return this.rotate(180);
    }
    rotate(hue) {
        let h = hue_correction(this.hue() + hue);
        return this.hue(h);
    }
    hue($p) {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([hue_correction($p), s, v]));
            return this.save();
        }
        return h;
    }
    saturation($p) {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([h, $p, v]));
            return this.save();
        }
        return s;
    }
    value($p) {
        let [h, s, v] = rgb2hsv(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsv2rgb([h, s, $p]));
            return this.save();
        }
        return v;
    }
    lightness($p) {
        let [h, s, l] = rgb2hsl(this.toArray());
        if (typeof $p === 'number') {
            this.rgb(hsl2rgb([h, s, $p]));
            return this.save();
        }
        return l;
    }
    hsv() {
    }
    template($t) {
        const tokens = [...new Set($t.match(/\$[rgbhsvla]/ig) || [])], color = this;
        tokens.forEach(token => {
            let value = 0;
            switch (token) {
                case 'r':
                    value = color.RED;
                    break;
                case 'g':
                    value = color.GREEN;
                    break;
                case 'b':
                    value = color.BLUE;
                    break;
                case 'h':
                    value = color.hue();
                    break;
                case 's':
                    value = color.saturation();
                    break;
                case 'l':
                    value = color.lightness();
                    break;
                case 'v':
                    value = color.value();
                    break;
                case 'a':
                    value = color.ALPHA;
                    break;
            }
            $t = $t.replace(new RegExp('\\' + token, 'g'), value.toString());
        });
        return $t;
    }
}

const color = function (color) {
    return new BlueDye(color);
};

const $rgba = function (r, g, b, a) {
    return color([r, g, b, a]);
};

let bluedye = {
    color,
    grayscale: $grayscale,
    rgb: $rgb,
    rgba: $rgba,
    number: $number,
    version: [3, 0, 0],
    fn: BlueDye
};

export { bluedye as default };
//# sourceMappingURL=bluedye.mjs.map
