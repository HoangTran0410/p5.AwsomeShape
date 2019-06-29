let boxes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    for (let i = 0; i < 10; i++) {
        let group = (i < 5 ? "1" : "2");
        let box = new AwsomeBox({
            group: group,
            x: group * 350,
            y: random(100, height - 100),
            width: 150,
            height: 75,
            // rotateSpeed: random(-2, 2),
            fillColor: randHexColor(),
            cornerRadius: 100,
            text: random(["Hoàng", "Hiền", "Hương", "Nam", "Linh", "Hợp"]) + " - " + group
        });

        box.onHover = function () {
            this.strokeWeight = 5;
            this.textSize = 25;
        }
        box.onOutside = function () {
            this.strokeWeight = 1;
            this.textSize = 20;
        }

        boxes.push(box);
    }
}

function draw() {
    background(20);

    for (let box of boxes) {
        box.run();
    }
}

function mousePressed() {
    // getAudioContext().resume();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, true);
}

function randHexColor() {
    var letters = "0123456789ABCDEF"; 
    var color = '#'; 
    for (var i = 0; i < 6; i++) 
       color += letters[(Math.floor(Math.random() * 16))];

    return color;
}

// =========================================
class Box1 {
    constructor(config = {}) {
        const {
            position = createVector(0, 0),
            width = 100,
            height = 100,
            angle = 0
        } = config;

        this.position = position;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    contain(x, y) {
        let vec = createVector(x, y);
        let vec2 = p5.Vector.sub(vec, this.position);
        vec2.rotate(-this.angle);
        let vec3 = p5.Vector.add(this.position, vec2);

        return (
            vec3.x > this.position.x - this.width * .5 &&
            vec3.x < this.position.x + this.width * .5 &&
            vec3.y > this.position.y - this.height * .5 &&
            vec3.y < this.position.y + this.height * .5
        );
    }

    pushState() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
    }
    popState() {
        pop()
    }

    display() {
        this.pushState();

        noFill();
        stroke(200);
        strokeWeight(1);
        rect(0, 0, this.width, this.height);

        this.popState();

        // this.angle += 1
    }

    showTool() {
        this.pushState();

        let r = 10;

        translate(this.width * .5 - r, -this.height * .5 + r);
        noStroke();
        fill(150, 20, 20);
        rect(0, 0, r * 2, r * 2);

        rotate(-this.angle);
        fill(255);
        text("X", 0, 0);

        this.popState();
    }

    hightlight() {
        this.pushState();

        noFill();
        stroke(200);
        strokeWeight(4);
        rect(0, 0, this.width, this.height);

        this.popState();
    }
}

class BoxesList1 {
    constructor(config = {}) {
        const {
            boxes = []
        } = config;

        this.boxes = boxes;

        this.currentSelected = null;
        this.selectedOffset = createVector(0, 0);

        this.setupEvent()
    }

    display() {
        let hovered = null;

        for (let box of this.boxes) {
            box.display()

            if (box.contain(mouseX, mouseY)) {
                hovered = box;
            }
        }

        if (this.currentSelected) {
            this.currentSelected.hightlight();
            this.currentSelected.showTool();

        } else if (hovered) {
            hovered.hightlight();
            hovered.showTool();
        }
    }

    add(box) {
        this.boxes.push(box);
    }

    setupEvent() {
        document.addEventListener("mousedown", () => {
            this.currentSelected = this.getBoxAt(mouseX, mouseY);

            if (this.currentSelected) {
                this.selectedOffset = p5.Vector.sub(this.currentSelected.position, createVector(mouseX, mouseY));
            }
        });

        // document.addEventListener("mouseup", () => {
        //     if (this.currentSelected) {
        //         this.currentSelected = null;
        //     }
        // });

        document.addEventListener("mousemove", () => {
            if (mouseIsPressed) {
                if (this.currentSelected) {
                    this.currentSelected.position = p5.Vector.add(createVector(mouseX, mouseY), this.selectedOffset);
                }
            }
        });
    }

    getBoxAt(x, y) {
        for (let box of this.boxes) {
            if (box.contain(x, y)) {
                return box;
            }
        }
    }
}
