# BlueDyeJS

Lightweight javascript library for color manipulations.

> **Try Our [Demo](https://bluedyejs.onrender.com/)**

![2.2.0](https://img.shields.io/github/package-json/v/yokgs/BlueDyeJS?color=%23118cff&style=for-the-badge)
![MIT](https://img.shields.io/github/license/yokgs/BlueDyeJS?color=%23007bff&style=for-the-badge)
![Downloads](https://img.shields.io/jsdelivr/npm/hy/@yokgs/bluedyejs?color=%23007bff&style=for-the-badge)
![Size](https://img.shields.io/bundlephobia/min/@yokgs/bluedyejs?color=%23007bff&style=for-the-badge)

## Table of Contents

- [BlueDyeJS](#bluedyejs)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Supported arguments](#supported-arguments)
    - [Export color object as](#export-color-object-as)
      - [String](#string)
      - [Number](#number)
      - [Array](#array)
    - [Tags](#tags)
    - [Names](#names)
    - [History tracking](#history-tracking)
    - [Reset and Pin](#reset-and-pin)
  - [Installation](#installation)
  - [API](#api)
    - [`undo()`](#undo)
    - [`pin()`](#pin)
    - [`reset()`](#reset)
    - [`red(red: number)`](#redred-number)
    - [`green(green: number)`](#greengreen-number)
    - [`blue(blue: number)`](#blueblue-number)
    - [`alpha(alpha: number)`](#alphaalpha-number)
    - [`cyan(cyan: number)`](#cyancyan-number)
    - [`yellow(yellow: number)`](#yellowyellow-number)
    - [`magenta(magenta: number)`](#magentamagenta-number)
    - [`black(black: number)`](#blackblack-number)
    - [`cmyk()`](#cmyk)
    - [`rgb(red: number, green: number, blue: number)`](#rgbred-number-green-number-blue-number)
    - [`rgba(red: number, green: number, blue: number, alpha: number)`](#rgbared-number-green-number-blue-number-alpha-number)
    - [`dark(level: number)`](#darklevel-number)
    - [`light(level: number)`](#lightlevel-number)
    - [`negative()`](#negative)
    - [`redToBlue()`](#redtoblue)
    - [`blueToRed()`](#bluetored)
    - [`gray()`](#gray)
    - [`grey()`](#grey)
    - [`random()`](#random)
    - [`css()`](#css)
    - [`hex()`](#hex)
    - [`number()`](#number-1)
    - [`setTag(tag: string)`](#settagtag-string)
    - [`name(name: string)`](#namename-string)
  - [License](#license)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fyokgs%2FBlueDyeJS.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fyokgs%2FBlueDyeJS?ref=badge_large)

## Usage

```javascript
    const bluedye = require('@yokgs/bluedyejs');

    let color = bluedye('red'); // red color

    let defaultColor = bluedye(); // transparent is the default color
    
    let black = bluedye(false), // you can also use boolean values 
        white = bluedye(true); // (black is false and white is true)

    let blackToo = bluedye(0),
        blue = bluedye('#0000ff'),
        randomColor = bluedye.random();
```

### Supported arguments

<table>
    <tr>
        <td>input</td>
        <td>equivalent</td>
    </tr>
    <tr>
        <td>undefined</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>null</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>''</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>false</td>
        <td>rgba(0, 0, 0, 1)</td>
    </tr>
    <tr>
        <td>true</td>
        <td>rgba(255, 255, 255, 1)</td>
    </tr>
    <tr>
        <td>rgb(0, 0, 0) ... rgb(255, 255, 255)</td>
        <td>rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)</td>
         <td>bluedye.rgb(0, 0, 0) ... bluedye.rgb(255, 255, 255)</td>
    </tr>
    <tr>
        <td>Number (0 ... 16777215)</td>
        <td> rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)</td>
        <td>bluedye.number(0) ...  bluedye.number(16777215)</td>
    </tr>
    <tr>
        <td>[n] ([0] ... [255])</td>
        <td> rgba(n, n, n, 1) (rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1))</td>
        <td>bluedye.grayscale(0) ... bluedye.grayscale(255)</td>
    </tr>
    <tr>
        <td>[r, g, b] ([0, 0, 0] ... [255, 255, 255])</td>
        <td> rgba(r, g, b, 1) (rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1))</td>
    </tr>
    <tr>
        <td>[r, g, b, a] ([0, 0, 0, 0] ... [255, 255, 255, 1])</td>
        <td> rgba(r, g, b, a) (rgba(0, 0, 0, 0) ... rgba(255, 255, 255, 1))</td>
    </tr>
</table>

### Export color object as

#### String

```javascript
    let color = bluedye('red');

    color.css() // "rgb(255,0,0)"
    color.alpha(.6).css() // "rgba(255,0,0,0.6)"
    color.hex() // "#ff0000" (NOTE : hex() does not support alpha values)

    let defaultColor = bluedye();
    defaultColor.hex() // "#000000"
    defaultColor.css() // "rgba(0,0,0,0)"
```

#### Number

```javascript
    bluedye('red').number() // 16711680
    blueedye('black').number() // 0
```

#### Array

```javascript
    bluedye('red').toArray() // [255, 0, 0, 0.6]
    bluedye('black').toArray() // [0, 0, 0, 1]
```

### Tags

```javascript
    var a = bluedye().red(88).blue(11);
    a.RED; /* = 88 */ a.BLUE; /* = 11 */

    a.setTag('my-color'); // we store the color
    a = 0; // oops the color is overwritten now :(

    // do not worry we can restore it
    var b = bluedye.getColor('my-color');
    b.RED; /* = 88 */ b.BLUE; /* = 11 */

    b.green(30);
    b.GREEN // 30

    var c = bluedye.getColor('my-color');
    c.GREEN // 30 (my-color represents the same instance of the color)

    c.red(255);
    c.RED // 255
    b.RED // 255 too (b and c represent the same color)

    b.setTag('color1').setTag('color2');

    bluedye.getColor('color1') // undefined (why? each color has only one tag name)
    c.tag // color2 (tag 'my-color' is updated to 'color2')
```

### Names

```javascript
    var a = bluedye().red(88).blue(11);
    a.RED // 88
    a.BLUE // 11
    a.name('my-color');
    a = 0; // oops our color is gone :(
    // do not worry we can recover it
    var b = bluedye('my-color'); // or bluedye.colorName('my-color')
    b.RED // 88 
    b.BLUE // 11
    b.green(30);
    b.GREEN // 30
    var c = bluedye('my-color');
    c.GREEN // 0 (my-color is a constant)
    c.red(255);
    c.RED // 255
    b.RED // still 88 (b and c are independant colors)
    b.name('color1').name('color2');
    bluedye.name('color1') // rgb(88,0,11) ( != undefined)
```

> **Note**: Default colors are now supported

### History tracking

```javascript
    let a = bluedye();
    a.BLUE // 0
    a.blue(15);
    a.BLUE // 15
    a.undo();
    a.BLUE // 0
    a.red(7).green(100).blue(6);
           a.toArray() // [7, 100, 6, 0]
    a.undo().toArray() // [7, 100, 0, 0]
    a.undo().toArray() // [7, 0, 0, 0]
    a.undo().toArray() // [0, 0, 0, 0]
    a.undo().toArray() // [0, 0, 0, 0]
```

### Reset and Pin

```javascript
    let a = bluedye();
    a.toArray() // [0, 0, 0, 0]
    a.red(7).green(100).blue(6);
    a.toArray() // [7, 100, 6, 0]
    a.pin(); 
    a.undo().toArray() // [7, 100, 6, 0]
    a.undo().toArray() // [7, 100, 6, 0] (`undo` do not work)
    // after each pin . the color saves the current state as an origin (initial state)

    a.gray().light(50);
    a.reset();
    // reset() restores the original state of the color and clears the changes' history 

    a.toArray() // [7, 100, 6, 0]
    a.rgb(55,88,90);
    a.reset();
    a.toArray() // [7, 100, 6, 0]
    a.rgb(55,88,90).pin();
    a.reset();
    a.toArray() // [55, 88, 90, 0]
```

## Installation

Using NPM :

```sh
npm install @yokgs/bluedyejs
```

Using Yarn :

```sh
yarn add @yokgs/bluedyejs
```

## API

### `undo()`

 Undoes the last color change by restoring the previous state from the backup stack.

### `pin()`

 Saves the current color state as a reference point for future resets.

### `reset()`

 Restores the color to its state at the last pinned reference point.

### `red(red: number)`

 Sets or gets the red component of the color. (0 - 255)

### `green(green: number)`

 Sets or gets the green component of the color. (0 - 255)

### `blue(blue: number)`

 Sets or gets the blue component of the color. (0 - 255)

### `alpha(alpha: number)`

 Sets or gets the alpha (transparency) value of the color. (0 - 1)

### `cyan(cyan: number)`

Sets the Cyan value of the color to the given value. (0 - 255)

### `yellow(yellow: number)`

Sets the Yellow value of the color to the given value. (0 - 255)

### `magenta(magenta: number)`

Sets the Magenta value of the color to the given value. (0 - 255)

### `black(black: number)`

Sets the Key (Black) value of the color to the given value. (0 - 255)

### `cmyk()`

Returns an array of the current CMYK values of the color.

### `rgb(red: number, green: number, blue: number)`

Sets or gets the color as an RGB array.

### `rgba(red: number, green: number, blue: number, alpha: number)`

Sets or gets the color as an RGBA array.

### `dark(level: number)`

Darkens the color by a given percentage. (0 - 100)

### `light(level: number)`

Lightens the color by a given percentage. (0 - 100)

### `negative()`

Inverts the color.

### `redToBlue()`

Swaps the red and blue components of the color with hue of 240deg.

### `blueToRed()`

Swaps the blue and red components of the color with hue of 120deg.

### `gray()`

Converts the color to grayscale.

### `grey()`

An alias for `gray()`.

### `random()`

Sets the color to a random value.

### `css()`

Returns the color as a CSS-compatible string.

### `hex()`

Returns the color as a hex string.

### `number()`

Returns the color as a number.

### `setTag(tag: string)`

 Sets a tag on the color object for easy retrieval.

### `name(name: string)`

 Adds the color to the library of named colors.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Yazid Slila (yokgs)
