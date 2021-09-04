# BlueDyeJS

Lightweight javascript library for color manipulations.

## Usage

```javascript
    let color = bluedye('rgb(0,0,255)'), // red
        defaultColor = bluedye(), // transparent
        black = bluedye(false),
        blackToo=bluedye(0),
        white=bluedye(true),
        blue=bluedye('#0000ff'),
        randomColor = bluedye().random();
```

### Supported arguments

|  input  | equivalent |
____
|undefined | rgba(0,0,0,0)|
____
null | rgba(0,0,0,0)
____
Number (0...16777215) | rgba(0,0,0,1)...rgba(255,255,255,1)


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

## Intallation

```
    $ npm install @yokgs/bluedyejs
```
