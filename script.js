'use strict'

const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

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

        if(pipe[i].x === 125) {
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
    requestAnimationFrame(draw);
}

draw();