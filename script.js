class knife { 
    constructor(pos) {
        this.pos = pos;
    }

    update() {
        //this.pos.y += this.velocity.y;
    };

    draw() {
        ctx.drawImage(knifeIMG, this.pos.x, this.pos.y)
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
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    
    gameUpdate();
    gameDraw()
    
}
gameLoop();