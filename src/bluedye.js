/**
 * BlueDyeJS v1.1.0
 * by Yazid SLILA (@yokgs)
 * under MIT License
 */
(function (r, e) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : (r.bluedye = e()); }(this, (function () {
    'use strict';
    var rgb = (r, g, b) => [r, g, b, 1],
        rgba = (r, g, b, a) => [r, g, b, a],
        Hex=a=>((a > 15 ? '' : '0') + Math.floor(a).toString(16)),
        correction = a => Math.max(0, Math.min(Math.round(a), 255));
    var bluedye = function (color) {
        return new bluedye.y.color(color);
    };
    bluedye.y = bluedye.prototype = {
        color: function (color) {
            //default values
            var s = [0, 0, 0, 1];

            if (typeof color == "string") {
                try {
                    s = eval(color);
                } catch (_) { };
            }
            this.RED = correction(s[0]);
            this.GREEN = correction(s[1]);
            this.BLUE = correction(s[2]);
            this.ALPHA = s[3];
            return this;
        },
        red: function (red) {
            this.RED = correction(red);
            return this;
        },
        green: function (green) {
            this.GREEN = correction(green);
            return this;
        },
        blue: function (blue) {
            this.BLUE = correction(blue);
            return this;
        },
        alpha: function (alpha) {
            this.ALPHA = Math.max(Math.min(alpha, 1), 0);
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
            var y = Math.floor((this.RED + this.GREEN + this.BLUE) / 3);
            this.RED = this.GREEN = this.BLUE = y;
            return this;
        },
        random:function(){
            this.RED=correction(Math.random()*256);
            this.GREEN=correction(Math.random()*256);
            this.BLUE=correction(Math.random()*256);
            return this;
        },
        css: function () {
            if (this.ALPHA === 1) return `rgb(${this.RED},${this.GREEN},${this.BLUE})`;
            return `rgba(${this.RED},${this.GREEN},${this.BLUE},${this.ALPHA})`;
        },
        hex:function(){
            return `#${Hex(this.RED)}${Hex(this.GREEN)}${Hex(this.BLUE)}`;
        },
    }
    bluedye.y.color.prototype = bluedye.y
    return bluedye;
})));