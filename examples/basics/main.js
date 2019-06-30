let shapes = [];
let pic, circlePic;

function preload() {
    pic = loadImage('../../images/subscribe.png');
    circlePic = loadImage('../../images/youtube_play_btn.png');
}

function setup() {
    createCanvas(800, 600);

    // == AwsomeRect need this options ==
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // ==============================

    // == Add examples box to shapes list ==
    addFillStrokeshapes();
    addTextshapes();
    addCornerBox();
    addRotateshapes();
    addUnDraggableBox();
    addEventBox();
    addPictureBox();
    addAwsomeCircle();
    addAwsomePoly();
}

function draw() {
    background(240);

    for (let box of shapes) {
        box.run();
    }

    showFrameRate(10, 10);
}

// ======================= EXAMPLES shapes ==========================

function addFillStrokeshapes() {
    // ========= Fill Color ============
    shapes.push(new AwsomeRect({
        text: "fillColor",
        x: 251,
        y: 218,
        width: 140,
        height: 50,
        fillColor: randHexColor()
    }));

    // ========= Stroke Color ============
    shapes.push(new AwsomeRect({
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
    shapes.push(new AwsomeRect({
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
    shapes.push(new AwsomeRect({
        text: "draggable: false",
        x: 693,
        y: 350,
        width: 140,
        height: 50,
        draggable: false
    }));
}

function addRotateshapes() {
    // rotate animation with rotateSpeed
    shapes.push(new AwsomeRect({
        text: "rotateSpeed",
        x: 416,
        y: 222,
        width: 100,
        height: 50,
        rotateSpeed: radians(1)
    }));
    // rotate with angle
    shapes.push(new AwsomeRect({
        text: "angle:60",
        x: 558,
        y: 224,
        width: 100,
        height: 70,
        angle: radians(60),
        fillColor: "#abf"
    }));
}

function addTextshapes() {
    shapes.push(new AwsomeRect({
        text: "textRotate:true",
        x: 518,
        y: 68,
        width: 120,
        height: 50,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: true
    }));

    shapes.push(new AwsomeRect({
        text: "textRotate:false",
        x: 386,
        y: 76,
        width: 100,
        height: 50,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: false
    }));

    shapes.push(new AwsomeRect({
        text: "textRotate: 45",
        x: 247,
        y: 71,
        width: 50,
        height: 100,
        rotateSpeed: radians(random(1, 2) * random([-1, 1])),
        textRotate: radians(45)
    }));

    shapes.push(new AwsomeRect({
        text: "textSize: 25",
        x: 678,
        y: 70,
        width: 140,
        height: 50,
        textSize: 25
    }));

    shapes.push(new AwsomeRect({
        text: 'textFill: "#f0f"',
        x: 87,
        y: 66,
        width: 140,
        height: 50,
        textFill: "#f0f"
    }));
}

function addEventBox() {
    let eventBox = new AwsomeRect({
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
        this.textFill = AwsomeShapeFuncs.invertColor(this.fillColor, true);
    }
    eventBox.onDrag = function () {
        this.text = "Drag";
    }
    shapes.push(eventBox);
}

function addPictureBox() {
    let box = new AwsomeRect({
        x: 150,
        y: 318,
        width: 170,
        height: 50,
        strokeWeight: 0,
        cornerRadius: 5,
        picture: pic
    })

    box.onHover = function () {
        this.strokeWeight = 3;
    }
    box.onOut = function () {
        this.strokeWeight = 0;
    }

    box.onPress = function () {
        this.y += 5;
    }
    box.onRelease = function () {
        this.y -= 5;
    }

    shapes.push(box);
}

function addAwsomeCircle() {
    let circle = new AwsomeCircle({
        x: 150,
        y: 400,
        picture: circlePic,
        rotateSpeed: radians(1)
    })
    circle.onHover = function () {
        this.strokeWeight = 5;
    }
    circle.onOut = function () {
        this.strokeWeight = 0;
    }
    shapes.push(circle);
}

function addAwsomePoly() {
    // init vertices list
    let verticesArr = [
        {x: -50, y: -20},
        {x: -20, y: -40},
        {x: 50, y: -20},
        {x: 100, y: 10},
        {x: 50, y: 70}
    ];

    // create AwsomePoly with vertices list
    let poly = new AwsomePoly({
        x: 500,
        y: 500,
        text: "Poly",
        fillColor: randHexColor(),
        rotateSpeed: radians(-1),
        vertices: verticesArr
    });

    // add some event
    poly.onHover = function () {
        this.strokeWeight = 5;
    }
    poly.onOut = function () {
        this.strokeWeight = 1;
    }

    // add poly to shapes
    shapes.push(poly);
}

// ============= OTHER FUNCTIONS ==============
function showFrameRate(x, y) {
    fill(0);
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