let boxes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // == AwsomeBox need this options ==
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // ==============================

    for (let i = 0; i < 10; i++) {
        let group = (i < 5 ? "1" : "2");

        let box = new AwsomeBox({
            group: group,
            x: random(150, height - 150),
            y: random(75, height - 75),
            width: random(100, 150),
            height: random(50, 100),
            rotateSpeed: random(-1, 1),
            fillColor: randHexColor(),
            strokeColor: "#fff9",
            cornerRadius: random(100),
            text: random(["Hoàng", "Hiền", "Hương", "Nam", "Linh", "Hợp"]) + " - " + group,
            textSize: 20,
            textRotate: true // random(360) or //false
        });

        box.onHover = function () {
            this.strokeWeight = 5;
        }
        box.onOutside = function () {
            this.strokeWeight = 0;
        }
        box.onPress = function() {
            this.textSize = 18;
            this.width -= 10;
            this.height -= 10;
        }
        box.onRelease = function() {
            this.textSize = 20;
            this.width += 10;
            this.height += 10;
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