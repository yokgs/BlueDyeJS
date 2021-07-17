/**
 * BlueDyeJS v1.0.0
 * by Yazid SLILA (@yokgs)
 * under MIT License
 */
 (function(r, e) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : (r.bluedye = e()); }(this, (function() {
    'use strict';
    var rgb = (r, g, b) => [r, g, b];
    var bluedye = function (color) {
        return new bluedye.y.color(color);
    };
    bluedye.y = bluedye.prototype = {
        color: function (color) {
            //default values
            var s = [0, 0, 0];

            if (typeof color == "string") {
                try {
                    s = eval(color);
                } catch (_) { };
            }

            this.RED = s[0];
            this.GREEN = s[1];
            this.BLUE = s[2];
            return this;
        },
        red: function (red) {
            this.RED = red;
            return this;
        },
        green: function (green) {
            this.GREEN = green;
            return this;
        },
        blue: function (blue) {
            this.BLUE = blue;
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
            thi.GREEN = this.BLUE;
            this.BLUE = t;
            return this;
        },
        blueToRed: function () {
            let t = this.BLUE;
            this.BLUE = this.GREEN;
            thi.GREEN = this.RED;
            this.RED = t;
            return this;
        },
    }
    window.bluedye = bluedye;
})));
