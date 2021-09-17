# BlueDyeJS

Lightweight javascript library for color manipulations.

> **Try Our [Demo](#demo)**

![1.3.0](https://img.shields.io/github/package-json/v/yokgs/BlueDyeJS?color=%23118cff&style=for-the-badge)
![MIT](https://img.shields.io/github/license/yokgs/BlueDyeJS?color=%23007bff&style=for-the-badge)

## Table of Contents

  1. [Usage](#usage)
     1. [Supported Arguments](#supported-arguments)
     2. [Export Color As](#export-color-object-as)
        1. [String](#string)
        2. [Number](#number)
        3. [Array](#array)
     3. [Tags](#tags)
     4. [Names](#names)
     5. [History tracking](#history-tracking)
     6. [Reset and Pin](#reset-and-pin)
  2. [Installation](#installation)
## Usage

```javascript
    const bluedye = require('@yokgs/bluedyejs');

    let color = bluedye('rgb(0,0,255)'), // red
        defaultColor = bluedye(), // transparent
        black = bluedye(false),
        blackToo=bluedye(0),
        white=bluedye(true),
        blue=bluedye('#0000ff'),
        randomColor = bluedye().random();
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
    </tr>
    <tr>
        <td>Number (0 ... 16777215)</td>
        <td> rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)</td>
    </tr>
    <tr>
        <td>[n] ([0] ... [255])</td>
        <td> rgba(n, n, n, 1) (rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1))</td>
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
    color.css() // "rgb(255,0,0)"
    color.alpha(.6).css() // "rgba(255,0,0,0.6)"
    color.hex() // "#ff0000" (NOTE : hex() does not support alpha values)
    defaultColor.hex() // "#000000"
    defaultColor.css() // "rgba(0,0,0,0)"
```
#### Number
```javascript
    color.number() // 16711680
    black.number() // 0
```

#### Array
```javascript
    color.toArray() // [255, 0, 0, 0.6]
    black.toArray() // [0, 0, 0, 1]
```

### Tags
```javascript
    var a = bluedye().red(88).blue(11);
    a.RED // 88
    a.BLUE // 11
    a.setTag('my-color');
    a = 0; // oops our color is gone :(
    // do not worry we can recover it
    var b = bluedye.getColor('my-color');
    b.RED // 88 
    b.BLUE // 11
    b.green(30);
    b.GREEN // 30
    var c = bluedye.getColor('my-color');
    c.GREEN // 30 (my-color is automatically updated)
    c.red(255);
    c.RED // 255
    b.RED // 255 too (b and c represent the same color)
    b.setTag('color1').setTag('color2');
    bluedye.getColor('color1') // undefined (why? each color has only one tag)
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
    b.RED // still 88 (b and c are two diffrent colors)
    b.name('color1').name('color2');
    bluedye.name('color1') // rgb(88,0,11) (!=undefined)
```

> **Note**: Default colors will be added in the future e.g. red:'#f00', yellow:'#ff0'...

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
    a.gray().light(50);
    a.reset();
    a.toArray() // [7, 100, 6, 0]
    a.rgb(55,88,90);
    a.reset();
    a.toArray() // [7, 100, 6, 0]
    a.rgb(55,88,90).pin();
    a.reset();
    a.toArray() // [55, 88, 90, 0]
```

## Installation

```
npm install @yokgs/bluedyejs --registry=https://npm.pkg.github.com
```
## Demo
Stay tuned!
