// Global variable contain all groups
let AwsomeGroups = {};

// Global constant contain all AwsomeShape methods
const AwsomeShape = {
    init: function (sketch) {
        let css = 'background: #111; color: #fff; font-size: 21px;';
        let css2 = 'background: #f55c; color: #fff; font-size: 21px;';
        console.log('%c p5.%c AwsomeShape %c https://github.com/HoangTran0410/p5.AwsomeBox', css, css2, '');

        sketch.registerMethod('post', function () {
            for (let ag in AwsomeGroups) {
                AwsomeGroups[ag].update();
            }
        });

        imageMode(CENTER);
        rectMode(CENTER);
        textAlign(CENTER, CENTER);

        AwsomeGroups = {};
    },
    runShapes: function () {
        for (let ag in AwsomeGroups) {
            for (let shape of AwsomeGroups[ag].shapes) {
                shape.run();
            }
        }
    },
    create: function (config = {}) {
        const {
            shape = "rectangle",
            size = 70
        } = config;

        switch (shape.toLowerCase()) {
            case "rectangle": return new AwsomeRect(config);
            case "circle": return new AwsomeCircle(config);
            case "poly": return new AwsomePoly(config);
            case "triangle":
                config.vertices = AwsomeShape.Tools.createVertices_Polygon(0, 0, size, 3);
                return new AwsomePoly(config);
            case "star":
                config.vertices = AwsomeShape.Tools.createVertices_Star(0, 0, size / 2.3, size, 5);
                return new AwsomePoly(config);
            case "polygon":
                let nPoint = config.nPoint || 5;
                config.vertices = AwsomeShape.Tools.createVertices_Polygon(0, 0, size, nPoint);
                return new AwsomePoly(config);

            default: return new AwsomeRect(config);
        }
    },
    Tools: {
        // http://p5js.org/examples/form-star.html
        createVertices_Star(x, y, radius1, radius2, npoints) {
            let vertices = [];
            let angle = TWO_PI / npoints;
            let halfAngle = angle / 2.0;

            for (let a = 0; a < TWO_PI; a += angle) {
                let sx = x + cos(a) * radius2;
                let sy = y + sin(a) * radius2;
                vertices.push({ x: sx, y: sy });

                sx = x + cos(a + halfAngle) * radius1;
                sy = y + sin(a + halfAngle) * radius1;
                vertices.push({ x: sx, y: sy });
            }

            return vertices;
        },
        // http://p5js.org/examples/form-regular-polygon.html
        createVertices_Polygon(x, y, radius, npoints) {
            let vertices = [];
            let angle = TWO_PI / npoints;
            for (let a = 0; a < TWO_PI; a += angle) {
                let sx = x + cos(a) * radius;
                let sy = y + sin(a) * radius;
                vertices.push({ x: sx, y: sy });
            }
            return vertices;
        },
        // http://jeffreythompson.org/collision-detection/table_of_contents.php
        collidePoint_RectRotated: function (px, py, rectX, rectY, rectW, rectH, rectAngle) {
            let rectPos = createVector(rectX, rectY);
            let pointPos = createVector(px, py);
            let subVec = p5.Vector.sub(pointPos, rectPos);
            let rotatedVec = subVec.rotate(-rectAngle);
            let rotatedPos = p5.Vector.add(rectPos, rotatedVec);

            return (
                rotatedPos.x > rectX - rectW * .5 &&
                rotatedPos.x < rectX + rectW * .5 &&
                rotatedPos.y > rectY - rectH * .5 &&
                rotatedPos.y < rectY + rectH * .5
            );
        },
        collidePoint_Circle: function (px, py, cirX, cirY, cirRadius) {
            return dist(px, py, cirX, cirY) < cirRadius;
        },
        collidePoint_Poly(px, py, vertices) {
            let collision = false;

            // go through each of the vertices, plus the next
            // vertex in the list
            let next = 0;
            for (let current = 0; current < vertices.length; current++) {

                // get next vertex in list
                // if we've hit the end, wrap around to 0
                next = current + 1;
                if (next == vertices.length) next = 0;

                // get the PVectors at our current position
                // this makes our if statement a little cleaner
                let vc = vertices[current];    // c for "current"
                let vn = vertices[next];       // n for "next"

                // compare position, flip 'collision' variable
                // back and forth
                if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
                    (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
                    collision = !collision;
                }
            }
            return collision;
        },
        // https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
        invertColor: function (hex, bw) {
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            // convert 3-digit hex to 6-digits.
            if (hex.length === 3 || hex.length === 4) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            } else if (hex.length == 8) {
                hex = hex[0] + hex[1] + hex[2] + hex[3] + hex[4] + hex[5];
            } else if (hex.length !== 6) {
                console.error(`Invalid HEX color: ${hex}`)
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
            return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
        },
        padZero: function (str, len) {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        },
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        uuidv4: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        }
    },
    KeyCodes: {
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PAUSE': 19,
        'CAPS_LOCK': 20,
        'ESC': 27,
        'SPACE': 32,
        ' ': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'LEFT': 37,
        'UP_ARROW': 38,
        'UP': 38,
        'RIGHT_ARROW': 39,
        'RIGHT': 39,
        'DOWN_ARROW': 40,
        'DOWN': 40,
        'INSERT': 45,
        'DELETE': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        '0NUMPAD': 96,
        '1NUMPAD': 97,
        '2NUMPAD': 98,
        '3NUMPAD': 99,
        '4NUMPAD': 100,
        '5NUMPAD': 101,
        '6NUMPAD': 102,
        '7NUMPAD': 103,
        '8NUMPAD': 104,
        '9NUMPAD': 105,
        'MULTIPLY': 106,
        'PLUS': 107,
        'MINUS': 109,
        'DOT': 110,
        'SLASH1': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'EQUAL': 187,
        'COMMA': 188,
        'SLASH': 191,
        'BACKSLASH': 220
    }
}

// ========================= CLASSES ========================
class AwsomeGroup {
    constructor(config = {}) {
        const {
            id = "",
            shapes = []
        } = config;

        this.id = id;
        this.shapes = shapes;
        this.mouseWasPressed = false;
        this.lastHovered = null;
        this.hovering = null;
        this.lastClicked = null;
        this.offsetClicked = null;
    }

    add(box) {
        this.shapes.push(box);
    }

    update() {
        let mouse = createVector(mouseX, mouseY);

        // mouseout event
        if (!mouseIsPressed && this.lastHovered != null && this.hovering != this.lastHovered) {
            this.lastHovered.onOut();
            this.lastHovered = this.hovering;
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

            let position = createVector(this.lastClicked.x, this.lastClicked.y);
            this.offsetClicked = p5.Vector.sub(position, mouse);
        }

        // release event
        if (this.mouseWasPressed && !mouseIsPressed && this.lastClicked != null) {
            if (this.lastClicked == this.lastHovered || this.lastClicked != null) {
                this.lastClicked.onRelease();
            }
            this.lastClicked = null;
        }

        // drag event
        if (this.mouseWasPressed && mouseIsPressed && this.lastClicked != null) {
            if (this.lastClicked.draggable) {
                if (abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0) {

                    let newPosition = p5.Vector.add(mouse, this.offsetClicked);
                    this.lastClicked.locate(newPosition.x, newPosition.y);

                    this.lastClicked.onDrag();
                }
            }
        }

        // reset value
        this.hovering = null;
        this.mouseWasPressed = mouseIsPressed;
    }

    run() {
        for (let box of this.shapes) {
            box.run();
        }
    }
}

class AwsomeClass {
    constructor(config = {}) {
        const {
            group = "default",
            hide = false,
            x = 0,
            y = 0,
            fillColor = "#fff0",
            strokeColor = "#000",
            strokeWeight = 1,
            draggable = true,

            picture = null,
            pictureWidth = 0,
            pictureHeight = 0,

            angle = 0,
            rotateSpeed = 0,

            text = "",
            textFill = AwsomeShape.Tools.invertColor(fillColor, true),
            textStroke = "#fff",
            textStrokeWeight = 0,
            textSize = 16,
            textRotate = false,

            onHover = function () { },
            onOut = function () { },
            onPress = function () { },
            onRelease = function () { },
            onDrag = function () { }
        } = config;

        this.group = group;
        this.hide = hide;
        this.x = x;
        this.y = y;
        this.picture = picture;
        this.pictureWidth = pictureWidth;
        this.pictureHeight = pictureHeight;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
        this.draggable = draggable;
        this.angle = angle;
        this.rotateSpeed = rotateSpeed;
        this.text = text.toString();
        this.textFill = textFill;
        this.textStroke = textStroke;
        this.textStrokeWeight = textStrokeWeight
        this.textSize = textSize;
        this.textRotate = textRotate;

        this.onHover = onHover;
        this.onOut = onOut;
        this.onPress = onPress;
        this.onRelease = onRelease;
        this.onDrag = onDrag;

        if (AwsomeGroups[group]) {
            AwsomeGroups[group].add(this);
        } else {
            AwsomeGroups[group] = new AwsomeGroup({
                id: group,
                shapes: [this]
            });
        }
    }

    run() {
        if (!this.hide) {
            this.draw();
            this.checkMouse();
        }
    }

    locate(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        this.drawShape();
        this.drawText();
        this.angle += this.rotateSpeed;
    }

    drawShape() {
        if (this.picture) {
            push();
            translate(this.x, this.y);
            rotate(this.angle);

            image(this.picture, 0, 0, this.pictureWidth, this.pictureHeight);

            pop();
        }
    }

    drawText() {
        if (this.text != "") {
            push();
            translate(this.x, this.y);
            if (this.textRotate === true) {
                rotate(this.angle);
            } else if (this.textRotate !== false) {
                rotate(this.textRotate);
            }
            strokeWeight(this.textStrokeWeight);
            stroke(this.textStroke)
            fill(this.textFill);
            textSize(this.textSize);
            text(this.text, 0, 0);
            pop();
        }
    }

    checkMouse() {
        if (this.contain(mouseX, mouseY)) {
            let group = AwsomeGroups[this.group];
            group.hovering = this;

            if (group.lastHovered == null)
                group.lastHovered = this;

            if (mouseIsPressed && !group.mouseWasPressed) {
                group.lastClicked = this;
            }
        }
    }

    contain(x, y) { }
}

class AwsomeRect extends AwsomeClass {
    constructor(config = {}) {
        const {
            width = 100,
            height = 50,
            cornerRadius = 0
        } = config;

        super(config);

        this.width = width;
        this.height = height;
        this.cornerRadius = cornerRadius;

        if (this.pictureWidth == 0) this.pictureWidth = width;
        if (this.pictureHeight == 0) this.pictureHeight = height;
    }

    drawShape() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);

        rect(0, 0, this.width, this.height, this.cornerRadius);
        this.picture && image(this.picture, 0, 0, this.pictureWidth, this.pictureHeight);

        pop();
    }

    contain(x, y) {
        return AwsomeShape.Tools.collidePoint_RectRotated(
            x, y,
            this.x, this.y,
            this.width, this.height,
            this.angle
        );
    }
}

class AwsomeCircle extends AwsomeClass {
    constructor(config = {}) {
        const {
            radius = 50,
        } = config;

        super(config);

        this.radius = radius;
        if (this.pictureWidth == 0) this.pictureWidth = radius * 2;
        if (this.pictureHeight == 0) this.pictureHeight = radius * 2;
    }

    drawShape() {
        push();
        translate(this.x, this.y);

        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);

        ellipse(0, 0, this.radius * 2);

        if (this.picture) {
            rotate(this.angle);
            image(this.picture, 0, 0, this.pictureWidth, this.pictureHeight);
        }

        pop();
    }

    contain(x, y) {
        return AwsomeShape.Tools.collidePoint_Circle(
            x, y,
            this.x, this.y,
            this.radius
        );
    }
}

class AwsomePoly extends AwsomeClass {
    constructor(config = {}) {
        const {
            vertices = AwsomeShape.Tools.createVertices_Polygon(0, 0, 50, 5)
        } = config;

        super(config);

        this.vertices = vertices;
    }

    drawShape() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        beginShape();
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
        endShape(CLOSE);

        // point(0, 0);

        pop();
    }

    contain(x, y) {
        let vertices = [];
        for (let v of this.vertices) {

            let rotateV = createVector(v.x, v.y);
            if (this.angle != 0) {
                rotateV.rotate(this.angle);
            }

            vertices.push({
                x: rotateV.x + this.x,
                y: rotateV.y + this.y
            });
        }
        return AwsomeShape.Tools.collidePoint_Poly(x, y, vertices);
    }
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