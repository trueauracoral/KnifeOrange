let rotationCoords = {x: 307, y: 314};

let knifeWidth = 27
let knifeHeight = 137

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

class knife { 
    constructor(pos) {
        this.gravity = 9.8;
        this.gravityForce =
        this.pos = pos;
        this.angle = 90;
        this.force = 0;
        this.torque = this.force * this.distance * Math.sin(degreesToRadians(this.angle));
        this.endingCoords = {};
        this.distance = knifeHeight;
        this.mass = 5;
        this.momentOfInertia = this.mass * Math.pow(this.distance, 2);
        this.angularAcceleration = this.torque/ this.momentOfInertia;
        this.angularVelocity = 0;
    }

    update() {
        //this.pos.y += this.velocity.y;
        this.endingCoords = {
            x: this.pos.x + knifeHeight * Math.cos(degreesToRadians(this.angle)),
            y: this.pos.y + knifeHeight * Math.sin(degreesToRadians(this.angle))
        }
        this.torque = this.force * this.distance * Math.sin(degreesToRadians(this.angle));
        this.angularVelocity +=this.angularAcceleration;
        this.angle += this.angularVelocity;
    };

    draw() {
        const rotationPointX = rotationCoords.x;
        const rotationPointY = rotationCoords.y;
        const angleInRadians = this.angle * Math.PI/180;
      
        ctx.save();
        ctx.translate(rotationPointX, rotationPointY);
        ctx.rotate(angleInRadians);
        ctx.drawImage(knifeIMG, 14+-knifeWidth/2, -8);
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
    ctx.fillRect(Knife.endingCoords.x, Knife.endingCoords.y, 10, 10)

}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    
    gameUpdate();
    gameDraw()
    
}

canvas.addEventListener('pointerdown', (event) => {
    Knife.force += 1;
    console.log(Knife.force);
  });
gameLoop();