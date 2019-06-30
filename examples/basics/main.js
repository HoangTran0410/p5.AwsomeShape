let boxes = [];
let pic;

function preload() {
    pic = loadImage('../../images/subscribe.png');
}

function setup() {
    createCanvas(800, 600);

    // == AwsomeBox need this options ==
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // ==============================

    // == Add examples box to boxes list ==
    addFillStrokeBoxes();
    addTextBoxes();
    addCornerBox();
    addRotateBoxes();
    addUnDraggableBox();
    addEventBox();
    addPictureBox();
}

function draw() {
    background(240);

    for (let box of boxes) {
        box.run();
    }

    showFrameRate(10, 10);
}

// ======================= EXAMPLES BOXES ==========================

function addFillStrokeBoxes() {
    // ========= Fill Color ============
    boxes.push(new AwsomeBox({
        text: "fillColor",
        x: 251,
        y: 218,
        width: 140,
        height: 50,
        fillColor: randHexColor()
    }));

    // ========= Stroke Color ============
    boxes.push(new AwsomeBox({
        text: "strokeColor",
        x: 84,
        y: 220,
        width: 140,
        height: 50,
        strokeColor: randHexColor(),
        strokeWeight: 5
    }));
}

function addCornerBox() {
    boxes.push(new AwsomeBox({
        text: "cornerRadius",
        x: 700,
        y: 218,
        width: 140,
        height: 50,
        cornerRadius: random(50, 100)
    }));
}

function addUnDraggableBox() {
    // default value of draggable is true
    boxes.push(new AwsomeBox({
        text: "draggable: false",
        x: 693,
        y: 350,
        width: 140,
        height: 50,
        draggable: false
    }));
}

function addRotateBoxes() {
    // rotate animation with rotateSpeed
    boxes.push(new AwsomeBox({
        text: "rotateSpeed",
        x: 416,
        y: 222,
        width: 100,
        height: 50,
        rotateSpeed: radians(1)
    }));
    // rotate with angle
    boxes.push(new AwsomeBox({
        text: "angle:60",
        x: 558,
        y: 224,
        width: 100,
        height: 70,
        angle: radians(60),
        fillColor: "#abf"
    }));
}

function addTextBoxes() {
    boxes.push(new AwsomeBox({
        text: "textRotate:true",
        x: 518,
        y: 68,
        width: 120,
        height: 50,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: true
    }));

    boxes.push(new AwsomeBox({
        text: "textRotate:false",
        x: 386,
        y: 76,
        width: 100,
        height: 50,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: false
    }));

    boxes.push(new AwsomeBox({
        text: "textRotate: 45",
        x: 247,
        y: 71,
        width: 50,
        height: 100,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: radians(45)
    }));

    boxes.push(new AwsomeBox({
        text: "textSize: 25",
        x: 678,
        y: 70,
        width: 140,
        height: 50,
        textSize: 25
    }));

    boxes.push(new AwsomeBox({
        text: 'textFill: "#f0f"',
        x: 87,
        y: 66,
        width: 140,
        height: 50,
        textFill: "#f0f"
    }));
}

function addEventBox() {
    let eventBox = new AwsomeBox({
        text: "Event",
        x: 412,
        y: 348,
        width: 140,
        height: 50
    })

    eventBox.onHover = function () {
        this.text = "Hover";
    }
    eventBox.onOut = function () {
        this.text = "Outside";
    }
    eventBox.onPress = function () {
        this.text = "Press";
        this.width -= 10;
        this.height -= 10;
    }
    eventBox.onRelease = function () {
        this.text = "Release";
        this.width += 10;
        this.height += 10;
        this.fillColor = randHexColor();
        this.textFill = AwsomeBoxFuncs.invertColor(this.fillColor, true);
    }
    eventBox.onDrag = function () {
        this.text = "Drag";
    }
    boxes.push(eventBox);
}

function addPictureBox() {
    let box = new AwsomeBox({
        x: 150,
        y: 318,
        width: 170,
        height: 50,
        strokeWeight: 0,
        cornerRadius: 5,
        picture: pic
    })

    box.onHover = function() {
        this.strokeWeight = 3;
    }
    box.onOut = function() {
        this.strokeWeight = 0;
    }

    box.onPress = function() {
        this.y += 5; 
    }
    box.onRelease = function() {
        this.y -= 5; 
    }

    boxes.push(box);
}

// ============= OTHER FUNCTIONS ==============
function showFrameRate(x, y) {
    fill(255);
    noStroke();
    text(~~frameRate(), x, y);
}

function randHexColor() {
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];

    return color;
}