console.log('%c p5.%c AwsomeBox %c https://github.com/HoangTran0410/p5.AwsomeBox', 'background: #111; color: #fff', 'background: #f55c; color: #fff', '');

let AwsomeGroups = {};

p5.prototype.registerMethod('post', function () {
    for (let ag in AwsomeGroups) {
        AwsomeGroups[ag].update();
    }
});

class AwsomeBox {
    constructor(config = {}) {
        const {
            group = "default",

            x = 0,
            y = 0,
            width = 100,
            height = 100,

            fillColor = "#0000",
            strokeColor = "#fff",
            strokeWeight = 1,
            cornerRadius = 0,
            draggable = true,

            angle = 0,
            rotateSpeed = 0,

            text = "",
            textFill = invertColor(fillColor, true),
            textStroke = "#fff",
            textStrokeWeight = 0,
            textSize = 16,
            textRotate = true
        } = config;

        this.group = group;
        this.position = createVector(x, y);
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
        this.cornerRadius = cornerRadius;
        this.draggable = draggable;
        this.angle = angle;
        this.rotateSpeed = rotateSpeed;
        this.text = text;
        this.textFill = textFill;
        this.textStroke = textStroke;
        this.textStrokeWeight = textStrokeWeight
        this.textSize = textSize;
        this.textRotate = textRotate;

        if (AwsomeGroups[group]) {
            AwsomeGroups[group].add(this);
        } else {
            AwsomeGroups[group] = new AwsomeGroup({
                id: group,
                boxes: [this]
            });
            console.log(AwsomeGroups[group]);
        }
    }

    contain(x, y) {
        return collidePoint_RectRotated(x, y,
            this.position.x, this.position.y,
            this.width, this.height,
            this.angle
        );
    }

    run() {
        this.draw();
        this.checkMouse();
    }

    draw() {
        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);

        push();
        translate(this.position.x, this.position.y);
        rotate(radians(this.angle));
        rect(0, 0, this.width, this.height, this.cornerRadius);

        if (this.text) {
            if (this.textRotate === false) {
                rotate(-radians(this.angle));
            } else if (this.textRotate !== true) {
                rotate(-radians(this.angle));
                rotate(this.textRotate);
            }
            strokeWeight(this.textStrokeWeight);
            stroke(this.textStroke)
            fill(this.textFill);
            textSize(this.textSize);
            text(this.text, 0, 0);
        }
        pop();

        this.angle += this.rotateSpeed;
    }

    checkMouse() {
        if (this.contain(mouseX, mouseY)) {
            let group = AwsomeGroups[this.group];
            group.lastHovered = this;

            if (mouseIsPressed && !group.mouseWasPressed) {
                group.lastClicked = this;
            }
        }
    }

    onHover() { }
    onOutside() { }
    onPress() { }
    onRelease() { }
    onDrag() { }
}

// ==================== PRIVATE =====================
class AwsomeGroup {
    constructor(config = {}) {
        const {
            id = "",
            boxes = []
        } = config;

        this.id = id;
        this.boxes = boxes;
        this.mouseWasPressed = false;
        this.lastHovered = null;
        this.lastClicked = null;
        this.offsetClicked = null;
    }

    add(box) {
        this.boxes.push(box);
    }

    update() {
        let mouse = createVector(mouseX, mouseY);

        // outside event
        for (let box of this.boxes) {
            if (box != this.lastHovered) {
                box.onOutside();
            }
        }

        // hover event
        if (this.lastHovered != null) {
            if (this.lastClicked != this.lastHovered) {
                this.lastHovered.onHover();
            }
        }

        // press event
        if (!this.mouseWasPressed && this.lastClicked != null) {
            this.lastClicked.onPress();
            this.offsetClicked = p5.Vector.sub(this.lastClicked.position, mouse);

            // move to front - bug
            // let index = this.boxes.indexOf(this.lastClicked);
            // let end = this.boxes.length - 1;
            // this.boxes.swap(index, end);

            // console.log(index, end);
        }

        // release event
        if (this.mouseWasPressed && !mouseIsPressed && this.lastClicked != null) {
            if (this.lastClicked == this.lastHovered) {
                this.lastClicked.onRelease();
            }
            this.lastClicked = null;
        }

        // drag event
        if (this.mouseWasPressed && mouseIsPressed && this.lastClicked != null) {
            if (this.lastClicked.draggable) {
                this.lastClicked.position = p5.Vector.add(mouse, this.offsetClicked);
                if (abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0) {
                    this.lastClicked.onDrag();
                }
            }
        }

        // reset value
        this.lastHovered = null;
        this.mouseWasPressed = mouseIsPressed;
    }

    run() {
        for (let box of this.boxes) {
            box.run();
        }
    }
}

function collidePoint_RectRotated(px, py, rectX, rectY, rectW, rectH, rectAngle) {
    let rectPos = createVector(rectX, rectY);
    let pointPos = createVector(px, py);
    let subVec = p5.Vector.sub(pointPos, rectPos);
    let rotatedVec = subVec.rotate(-radians(rectAngle));
    let rotatedPos = p5.Vector.add(rectPos, rotatedVec);

    return (
        rotatedPos.x > rectX - rectW * .5 &&
        rotatedPos.x < rectX + rectW * .5 &&
        rotatedPos.y > rectY - rectH * .5 &&
        rotatedPos.y < rectY + rectH * .5
    );
}

// https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        console.error(`invalid: ${hex}`)
        // throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array
const swapArrayElements = function (arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};
Array.prototype.swap = function (indexA, indexB) {
    swapArrayElements(this, indexA, indexB);
};

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
