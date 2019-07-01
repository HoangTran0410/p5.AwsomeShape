# 🖱 p5.AwsomeShape
**p5.AwsomeShape** is a [p5.js](http://p5js.org) library, update from [p5.clickable](https://github.com/Lartu/p5.clickable) that lets you create and customize box (button) and assign event based behaviours to them. Plain speaking, with **p5.AwsomeShape** you can create buttons and define what happens when the user *hovers over*, *clicks*, *releases*, *drag* or moves their cursor *out* of them.

![image](https://github.com/HoangTran0410/p5.AwsomeShape/raw/master/images/Screenshot_1.png)

## Live Example
[This Example](https://hoangtran0410.github.io/p5_Examples_Live/p5.AwsomeShape/) ([Source code](https://github.com/HoangTran0410/p5.AwsomeShape/tree/master/examples/basics)) showcasts some of the main features of this library.

## Code Example
With **p5.AwsomeShape** and just a few lines of code you can get a button up and running. For example, to create a plain button at (20, 20) that when pressed changes color and shows an alert message you just do:
```javascript
myButton = new AwsomeRect({          //Create button
    x: 20,
    y: 20
});
myButton.onPress = function(){      // When myButton is pressed
    this.fillColor = "#AAAAFF";     // Change button color
    alert("Yay!");                  // Show an alert message
}
```
Easy as pie!

## Required options
**p5.AwsomeShape** require init() call in *setup* function
```javascript
function setup() {
    createCanvas(500, 500);
    ...
    AwsomeShape.init(this);
    ...
}
```

## How to Create a Button

**p5.AwsomeShape** provides the `AwsomeShape` class (aka, the buttons). To create a new button just instantiate a new AwsomeRect, like this:
```javascript
myButton = new AwsomeRect();
```

The starting position of a AwsomeShape defaults to (0, 0) and its size to (100, 50). You can create it at a different location:

```javascript
myButton = new AwsomeRect({
    x: 200,
    y: 300
});
```

To move a AwsomeShape you can change its `x` and `y` properties:
```javascript
myButton.x = 100;
myButton.y = 200;
```
or use the `locate` method:
```javascript
myButton.locate(100, 200);
```

Likewise, to resize a Clickable you can modify its `width` and `height` properties:
```javascript
myButton.width = 250;
myButton.height = 100;
```
or use the `resize` method:
```javascript
myButton.resize(250, 100);
```

AwsomeShape also contain other properties that can be changed to alter their appearance:
```javascript
// All value below is default value
myButton.fillColor = "#0000";       // Background color - default is transparent color
myButton.strokeColor = "#fff";      // Border color - default is white
myButton.strokeWeight = 1;          // Border width of myButton
myButton.cornerRadius = 0;          // Corner radius
myButton.draggable = true;          // If value is 'false', myButton can't be dragged
myButton.picture = someImage;       // Picture to draw inside button, type of 'someImage' is p5.Image

myButton.angle = 0;                 // Angle rotation of myButton
myButton.rotateSpeed = 0;           // Angle changing speed

myButton.text = "";                 // Text inside myButton
myButton.textFill = "#fff";         // Text color - default is inverted with fillColor
myButton.textStroke = "#0000";      // Text border color - default is transparent
myButton.textStrokeWeight = 0;      // Border width of text
myButton.textSize = 16;             // Size of text
myButton.textRotate = false;        // Text rotation - default is false

// With textRotate
// If value is 'true' - text rotate with button's angle
// If value is an angle (in radians) - text rotate with that angle value
```

Or you can do it shorter:
```javascript
myButton = new AwsomeRect({
    x: 200,
    y: 300,
    width: 250,
    height: 100,
    fillColor: "#f00",
    strokeColor: "#000",
    cornerRadius: 100,
    draggable: false,
    rotateSpeed: radians(-1.5),
    text: "Awsome",
    textRotate: true
})
// All others properties (you not set) will have default value
```

To **run** a AwsomeShape, you have to use its `run` method. For example:
```javascript
function draw(){
  myButton.run();
}
```
This is very important, for without this step your button will not be shown (nor work).

## Button Methods

AwsomeShape provide 5 methods that are called when the user interacts with the AwsomeShape in different ways.

**onOut** is called whenever the cursor is move to outside the area of the AwsomeShape.
```javascript
myButton.onOut = function(){
  console.log("Hey! Cursor is out!");
}
```

**onHover** is called whenever the cursor is within the area of the AwsomeShape, but it's not being pressed:
```javascript
myButton.onHover = function(){
  console.log("The cursor is over me!");
}
```

**onPress** is called when the user presses a AwsomeShape.
```javascript
myButton.onPress = function(){
  console.log("I've been pressed!");
}
```

**onRelease** is called whenever the user clicks a AwsomeShape and then releases the click.
```javascript
myButton.onRelease = function(){
  console.log("Bye bye!");
}
```

Finally, **onDrag** is called whenever the user clicks a AwsomeShape and then drag it around.
```javascript
myButton.onDrag = function(){
  console.log("Dragging...");
}
```

## Contributing
If there's a missing feature you'd like to see on p5.AwsomeShape, feel free to write it and submit a pull request. Also feel free to submit issues and requests for future features.

## Licensing  
`p5.AwsomeShape` is licensed under the MIT License.

This repo also includes code from other libraries:  
* [p5.js](https://github.com/processing/p5.js) is licensed under LGPL 2.1