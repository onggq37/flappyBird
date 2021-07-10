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

let gravity = 5;
//gap between the pipes
let gap = 85;
let pX = bg.width

//floor
let floor = bg.height-fg.height;

document.addEventListener("keydown",moveup);

function moveup() {
    bY -= 50;
}
//position of pip
function draw() {
    // pipeSouth.onload = function() {}
    ctx.drawImage(bg,0,0);
    ctx.drawImage(pipeNorth,pX,0);
    ctx.drawImage(pipeSouth,pX,pipeNorth.height+gap);
    ctx.drawImage(bird,bX,bY);
    ctx.drawImage(fg,0,floor)
    if (bY <= floor-bird.height) {
        bY += gravity;
    }
    pX -= 1;
    
    //console.log(bY);
    requestAnimationFrame(draw);
}

draw();