/**
 * BlueDyeJS v2.0.0
 * by Yazid SLILA (@yokgs)
 * MIT License
 */
(function (r, e) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : (r.bluedye = e()); }(this, (function () {
    'use strict';
    var rgb = (r, g, b) => [r, g, b, 1],
        rgba = (r, g, b, a) => [r, g, b, a],
        Hex = a => ((a > 15 ? '' : '0') + Math.floor(a).toString(16)),
        fromHex = a => {
            if (a.length == 4) return parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16) * 17;
            return parseInt(a.substr(1), 16);
        },
        correction = a => Math.max(0, Math.min(Math.round(a), 255)),
        alpha_correction = a => Math.max(0, Math.min(a, 1));
    var _dark = (a, b) => (1 - b / 100) * a,
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
                for (let i = 2; i >= 0; i--) {
                    s[i] = Math.floor(color) % 256;
                    color /= 256;
                }
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

            /* v2.0 */

            this.R = [this.RED, this.GREEN, this.BLUE, this.ALPHA];
            this.backup = [];

            this.tag = null;
            return this;
        },

        /* v2.0 */

        save: function () {

        },
        undo: function () {
            
        },
        pin: function () {
            this.R = [this.RED, this.GREEN, this.BLUE, this.ALPHA];
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
            return this;
        },
        green: function (green) {
            if (typeof green == 'number') this.GREEN = correction(green);
            return this;
        },
        blue: function (blue) {
            if (typeof blue == 'number') this.BLUE = correction(blue);
            return this;
        },
        alpha: function (alpha) {
            this.ALPHA = alpha_correction(alpha);
            return this;
        },
        rgb: function (r, g, b) {
            return this.red(r).green(g).blue(b);
        },
        rgba: function (r, g, b, a) {
            return this.rgb(r, g, b).alpha(a);
        },
        dark: function (level = 1) {
            level = Math.min(Math.max(level, 0), 100);
            this.RED = _dark(this.RED, level);
            this.GREEN = _dark(this.GREEN, level);
            this.BLUE = _dark(this.BLUE, level);
            return this;
        },
        light: function (level = 1) {
            level = Math.min(Math.max(level, 0), 100);
            this.RED = _light(this.RED, level);
            this.GREEN = _light(this.GREEN, level);
            this.BLUE = _light(this.BLUE, level);
            return this;
        },
        negative: function () {
            this.RED = 255 - this.RED;
            this.GREEN = 255 - this.GREEN;
            this.BLUE = 255 - this.BLUE;
            return this;
        },
        redToBlue: function () {
            let t = this.RED;
            this.RED = this.GREEN;
            this.GREEN = this.BLUE;
            this.BLUE = t;
            return this;
        },
        blueToRed: function () {
            let t = this.BLUE;
            this.BLUE = this.GREEN;
            this.GREEN = this.RED;
            this.RED = t;
            return this;
        },
        gray: function () {
            var y = (this.RED + this.GREEN + this.BLUE) / 3;
            this.RED = this.GREEN = this.BLUE = y;
            return this;
        },
        grey: function () {
            return this.gray();
        },
        random: function () {
            this.RED = correction(Math.random() * 256);
            this.GREEN = correction(Math.random() * 256);
            this.BLUE = correction(Math.random() * 256);
            return this;
        },
        css: function () {
            if (this.ALPHA === 1) return `rgb(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)})`;
            return `rgba(${correction(this.RED)},${correction(this.GREEN)},${correction(this.BLUE)},${alpha_correction(this.ALPHA)})`;
        },
        hex: function () {
            return `#${Hex(this.RED)}${Hex(this.GREEN)}${Hex(this.BLUE)}`;
        },
        number: function () {
            return ((this.RED * 256) + this.GREEN) * 256 + this.BLUE;
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
            var t = k in bluedye ? overwrite : !overwrite;
            if (t) bluedye[k] = obj[k];
        }
        return bluedye;
    };
    let _private = {
        colors: {},
        tags: {}
    };
    bluedye.add({
        version: [2, 0, 0],
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
        name: function (name) {
            return _private.colors[name];
        },
        grayscale: function (a) {
            return bluedye.rgb(a, a, a);
        },
        random: function () {
            return bluedye().random();
        },
    })
    return bluedye;
})));
