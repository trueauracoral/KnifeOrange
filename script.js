let rotationCoords = {x: 307, y: 314};

let knifeWidth = 27
let knifeHeight = 137

class knife { 
    constructor(pos) {
        this.pos = pos;
    }

    update() {
        //this.pos.y += this.velocity.y;
    };

    draw() {
        const rotationPointX = rotationCoords.x;
        const rotationPointY = rotationCoords.y;
        const angleInDegrees = 45;
        const angleInRadians = angleInDegrees * Math.PI / 180;
      
        ctx.save();
        ctx.translate(rotationPointX, rotationPointY);
        ctx.rotate(angleInRadians);
        ctx.drawImage(knifeIMG, -knifeWidth/2, -knifeHeight/2);
        ctx.translate(-this.pos.x, -this.pos.y);

        ctx.restore();
    };
}
function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

var knifeIMG =       loadImage('./img/knife.png');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 700;

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

const Knife = new knife(vec2(halfWidth - knifeIMG.width / 2, halfHeight-40), vec2(5,5), 15)

function startGame() {
    gameLoop();
}

// https://jakesgordon.com/writing/javascript-game-foundations-sound/
function createAudio(src) {
    var audio = document.createElement('audio');
    audio.volume = 0.5;
    //audio.loop   = options.loop;
    audio.src = src;
    return audio;
}

//var bounce = createAudio('./sound/bounce.wav');

function vec2(x, y) {
    return {x: x, y: y};
}

function gameUpdate() {
    Knife.update();
    
}

function gameDraw() {
    Knife.draw();
    ctx.fillStyle = "red";
    ctx.fillRect(rotationCoords.x, rotationCoords.y, 10, 10)
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    
    gameUpdate();
    gameDraw()
    
}
gameLoop();