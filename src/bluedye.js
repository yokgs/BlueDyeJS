/**
 * BlueDyeJS v2.1.0
 * by Yazid SLILA (@yokgs)
 * MIT License
 */
(function (r, e) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : (r.bluedye = e()); }(this, (function () {
    'use strict';
    var rgb = (r, g, b) => [r, g, b, 1],
        rgba = (r, g, b, a) => [r, g, b, a],
        Hex = a => ((a > 15 ? '' : '0') + Math.floor(a).toString(16)),
        fromHex = a => {
            if (a.length == 4) return parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16);
            return parseInt(a.substr(1), 16);
        },
        correction = a => Math.max(0, Math.min(Math.round(a), 255)),
        alpha_correction = a => Math.max(0, Math.min(a, 1)),
        _dark = (a, b) => (1 - b / 100) * a,
        _light = (a, b) => (a + b / 100 * (255 - a));

    var bluedye = function (color) {
        return new localBlueDye.color(color);
    };

    let localBlueDye = bluedye.prototype = {
        color: function (color) {
            //default values
            var s = [0, 0, 0];
            if (typeof color == 'undefined') s[3] = 0;
            if (typeof color == "string") {
                if (/^#[0-1a-fA-F]+/.test(color)) {
                    color = fromHex(color);
                } else {
                    if (color in _private.colors) {
                        return bluedye(_private.colors[color]);
                    }
                    if (/^rgba*\([\d,\.\s]+\)/.test(color)) {
                        let rgb = (r, g, b) => [r, g, b, 1],
                            rgba = (r, g, b, a) => [r, g, b, a];
                        try { s = eval(color) } catch (_) { };
                    }
                }
            }
            if (typeof color == "number") {
                return bluedye.number(color)
            }
            if (typeof color == 'object' && color.length) {
                s = color;
                if (s.length === 1) return bluedye.grayscale(s[0]);
            }
            if (typeof color == 'boolean') s = color ? [255, 255, 255, 1] : [0, 0, 0, 1];
            this.RED = correction(s[0]);
            this.GREEN = correction(s[1]);
            this.BLUE = correction(s[2]);
            this.ALPHA = alpha_correction(typeof s[3] != 'number' ? 1 : s[3]);
            this.R = this.toArray();
            this.backup = [];
            this.tag = null;
            return this.save();
        },
        save: function () {
            this.backup.push({
                r: this.RED,
                g: this.GREEN,
                b: this.BLUE,
                a: this.ALPHA
            });
            return this;
        },
        undo: function () {
            if (this.backup.length === 1) {
                return this;
            }
            this.backup.pop();
            var i = this.backup.pop();
            [this.RED, this.GREEN, this.BLUE, this.ALPHA] = [i.r, i.g, i.b, i.a];
            return this.save();
        },
        pin: function () {
            this.R = this.toArray();
            this.backup = [];
            return this.save();
        },
        reset: function () {
            [this.RED, this.GREEN, this.BLUE, this.ALPHA] = this.R;
            this.backup = [];
            return this.save();
        },
        red: function (red) {
            if (typeof red == 'number') this.RED = correction(red);
            return this.save();
        },
        green: function (green) {
            if (typeof green == 'number') this.GREEN = correction(green);
            return this.save();
        },
        blue: function (blue) {
            if (typeof blue == 'number') this.BLUE = correction(blue);
            return this.save();
        },
        alpha: function (alpha) {
            this.ALPHA = alpha_correction(alpha);
            return this.save();
        },
        rgb: function (r, g, b) {
            [this.RED, this.GREEN, this.BLUE] = [r, g, b].map(correction);
            return this.save();
        },
        rgba: function (r, g, b, a) {
            [this.RED, this.GREEN, this.BLUE] = [r, g, b].map(correction);
            this.ALPHA = alpha_correction(a);
            return this.save();
        },
        dark: function (level = 1) {
            level = Math.min(Math.max(level, 0), 100);
            [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => _dark(x, level));
            return this.save();
        },
        light: function (level = 1) {
            level = Math.min(Math.max(level, 0), 100);
            [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => _light(x, level));
            return this.save();
        },
        negative: function () {
            [this.RED, this.GREEN, this.BLUE] = this.toArray().map(x => (255 - x));
            return this.save();
        },
        redToBlue: function () {
            [this.BLUE, this.RED, this.GREEN] = this.toArray();
            return this.save();
        },
        blueToRed: function () {
            [this.GREEN, this.BLUE, this.RED] = this.toArray();
            return this.save();
        },
        gray: function () {
            let y = (this.RED + this.GREEN + this.BLUE) / 3;
            this.RED = this.GREEN = this.BLUE = y;
            return this.save();
        },
        grey: function () {
            return this.gray();
        },
        random: function () {
            this.RED = correction(Math.random() * 256);
            this.GREEN = correction(Math.random() * 256);
            this.BLUE = correction(Math.random() * 256);
            return this.save();
        },
        css: function () {
            if (this.ALPHA === 1) return `rgb(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)})`;
            return `rgba(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)},${alpha_correction(this.ALPHA)})`;
        },
        hex: function () {
            return `#${Hex(this.RED)}${Hex(this.GREEN)}${Hex(this.BLUE)}`;
        },
        number: function () {
            return ((correction(this.RED) * 256) + correction(this.GREEN)) * 256 + correction(this.BLUE);
        },
        toArray: function () {
            return [this.RED, this.GREEN, this.BLUE, this.ALPHA];
        },
        setTag: function (tag) {
            if (this.tag) delete _private.tags[this.tag];
            _private.tags[tag] = this;
            this.tag = tag;
            return this;
        },
        name: function (name) {
            if (/[\w\-]+/.test(name)) {
                _private.colors[name] = this.css();
            }
            return this;
        }
    }
    localBlueDye.color.prototype = localBlueDye;
    bluedye.add = function (obj, overwrite) {
        for (let k in obj) {
            var t = ((k in bluedye) && overwrite) || !(k in bluedye);
            if (t) bluedye[k] = obj[k];
        }
        return bluedye;
    };
    /* default colors are picked from https://www.w3schools.com/colors/colors_names.asp */
    let _default = {
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

    let _private = {
        colors: Object.create(_default),
        tags: {}
    };

    bluedye.add({
        version: [2, 1, 0],
        alpha: false,
        getColor: function (tag) {
            return _private.tags[tag];
        },
        rgb: function (r, g, b) {
            return bluedye(`rgb(${r},${g},${b})`);
        },
        rgba: function (r, g, b, a) {
            return bluedye(`rgba(${r},${g},${b},${a})`);
        },
        number: function (n) {
            var s = [0, 0, 0];
            for (let i = 2; i >= 0; i--) {
                s[i] = Math.floor(n) % 256;
                n /= 256;
            }
            return bluedye(s);
        },
        colorName: function (name) {
            return bluedye(_private.colors[name]);
        },
        grayscale: function (a) {
            return bluedye.rgb(a, a, a);
        },
        random: function () {
            return bluedye().random().pin();
        },
        free: function () {
            var y = _private.tags;
            for (let i in y) {
                y[i].tag = undefined;
            }
            _private.tags = {};
            _private.colors = Object.create(_default);
            return bluedye;
        }
    }, true);
    return bluedye;
})));
