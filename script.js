'use strict'

//select canvas
const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

let frames = 0;

const sprite = new Image();
sprite.src="images/sprite.png";

//game state
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    gameOver: 2,
}

//control the state of the game
cvs.addEventListener("click", function(e){
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            bird.flap();
            break;
        case state.gameOver:
            state.current = state.getReady;
            break;
    }
})

//background
const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height-226,

    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);
    }
}

//foreground
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height-112,

    draw: function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w,this.h);
    }
}

//bird
const bird = {
    animation:[
        {sX: 276, sY: 112},
        {sX: 276, sY: 139},
        {sX: 276, sY: 164},
        {sX: 276, sY: 139},
    ],
    w: 34,
    h: 26,
    x: 50,
    y: 150,
    
    frame: 0,
    period: 0,
    
    draw: function() {
        let bird = this.animation[this.frame];

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
    },

    flap: function() {

    },

    update: function() {
        //during getReady state, bird flap slower
        if(state.current == state.getReady) {
            this.period = 10;
        } else {
            this.period = 5;
        }
        
        //increment of bird frame, base on the game period
        if(frames%this.period == 0){
            this.frame += 1;
            this.frame = this.frame%this.animation.length; //ensure that frames go in loop
        }

    }
}

//get ready
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width/2-173/2,
    y: cvs.height/3,

    draw: function() {
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//game over
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width/2-225/2,
    y: cvs.height/3,

    draw: function() {
        if(state.current == state.gameOver) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

function draw() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function update() {
    bird.update();
}

function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();
/*
//load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//bird intial position
let bX = 10;
let bY = 150;

let gravity = 1;
//gap between the pipes
let gap = 100;
let pX = cvs.width;
let pipeDist = 80;
let pipe = [];

pipe[0] = {
    x: pX,
    y: 0
}

//floor
let floor = cvs.height-fg.height;

document.addEventListener("keydown",moveup);

function moveup() {
    bY -= 50;
}
//position of pip 
function draw() {
    // pipeSouth.onload = function() {}
    ctx.drawImage(bg,0,0);

    for(let i=0; i<pipe.length;i++) {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+pipeNorth.height+gap); 
        
        pipe[i].x--;

        if(pipe[i].x === pipeDist) {
            pipe.push ({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height,
             }
            )
        }  
    }
    ctx.drawImage(bird,bX,bY);
    ctx.drawImage(fg,0,floor)
    if (bY <= floor-bird.height) {
        bY += gravity;
    }
    
    
    //console.log(bY);
    //requestAnimationFrame(draw);
}

draw();  
*/