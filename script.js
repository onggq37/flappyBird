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
            // pipes.reset();
            // bird.speedReset();
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

    dx: 2,

    draw: function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w,this.h);
    },

    update: function() {
        if (state.current === state.game) {
            this.x = (this.x - this.dx)%(this.w/2); //keep the fg moving and bring it back to it's original position once it past w/2
        }
    },
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
    radius: 12,
    
    frame: 0,
    period: 0, //frequency that the bird is flapping
    
    gravity: 0.2,
    speed: 0,
    jump: 4.5,
    rotation: 0,
    rotationRad: 5,


    draw: function() {
        let bird = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    },

    flap: function() {
        this.speed = -this.jump;
    },

    update: function() {
        //during getReady state, bird flap slower
        if (state.current === state.getReady) {
            this.period = 10;
        } else {
            this.period = 5;
        }
        
        //increment of bird frame, base on the game period
        if (frames%this.period === 0){
            this.frame += 1;
            this.frame = this.frame%this.animation.length; //ensure that frames go in loop
        }

        if (state.current === state.getReady) {
            this.speed = 0;
            this.y = 150; //reset bird position when game over
            this.rotation = 0 * Math.PI/180;
        } else {
            if (this.y+this.h/2 >= cvs.height-fg.h) {
                this.y = cvs.height-fg.h-this.h/2;
                if(state.current == state.game) {
                    state.current = state.gameOver;
                }
            } else {
                this.speed += this.gravity;
                this.y += this.speed;  
            }

            if (this.speed >= this.jump) {
                this.rotation = 90 * Math.PI/180;
                this.frame = 1;
            } else if (this.speed >=0 && this.speed <= this.jump) {
                this.rotation = 0 * Math.PI/180;
            } else {
                this.rotation = -25 * Math.PI/180;
            }
        }
    }
}
//pipes
const pipes = {
    position: [],

    top: {
        sX: 553,
        sY:0,
    },
    bottom: {
        sX: 502,
        sY: 0,
    },
    w: 53,
    h: 400,
    gap: 85,
    maxYPos: -150,
    dx: 2,

    draw: function() {
        for (let i=0; i<this.position.length; i++) { //looping through and drawing the top and bottom pipes
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y+this.h+this.gap;

            //top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

            //bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    update: function() {
        if (state.current === state.game) {
            if(frames%100 === 0) { //every 100 frames create a new set of pipes with random position from -300 to -150
                this.position.push({
                    x: cvs.width, //pipe always start outside of canvas
                    y: this.maxYPos*(Math.random()+1),
                });
            }
            for (let j=0; j<this.position.length; j++) {
                let p = this.position[j];
                let bottomPipeYPos = p.y+this.h+this.gap;

                //Collision for top pipe
                if (bird.x+bird.radius > p.x && bird.x-bird.radius < p.x+this.w && bird.y+bird.radius > p.y && bird.y-bird.radius < p.y+this.h) {
                    state.current = state.gameOver;
                }
                
                //Collision for bottom pipe
                if (bird.x+bird.radius > p.x && bird.x-bird.radius < p.x+this.w && bird.y+bird.radius > bottomPipeYPos && bird.y-bird.radius < bottomPipeYPos+this.h) {
                    state.current = state.gameOver;
                }

                //moving pipe to the left
                p.x -= this.dx; 

                //if pipe move out of canvas, remove it and increment score
                if (p.x+this.w <= 0) { 
                    this.position.shift();
                }
            }
        } else if (state.current === state.getReady) { //reset the position array
            this.position = [];
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
        if (state.current === state.getReady){
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
        if (state.current === state.gameOver) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

function draw() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function update() {
    bird.update();
    fg.update();
    pipes.update();
}

function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();