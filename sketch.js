var easterEGG;
var quote = false;

var BGM;
var BGM_ON = false;
var Swoosh;
var Explosion;
var JumpSound;
var BGMEND;
var gunSound1;
var gunSound2;
var reload;

var gun;
var gunshotMark = {
    x: 0,
    y: 0
};
var gunshotTime = 0;
var hasGun = false;
var gunIsFired = false;
var gunShot1;
var gunShot2;
var gunShot3;
var gunTimer = 0;
var pickupTimer = 0;
var revolver;

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var isJumping;
var jumpHeight;
var jumpHeightLimit;

var clouds = [{
        x_pos: 30,
        y_pos: 80,
        size: 1,
        speed: 1
    },
    {
        x_pos: 800,
        y_pos: 100,
        size: 1.2,
        speed: 2
    },
    {
        x_pos: 420,
        y_pos: 50,
        size: 0.8,
        speed: 1.5
    },
    {
        x_pos: 120,
        y_pos: 150,
        size: 0.6,
        speed: 2
    },
    {
        x_pos: 220,
        y_pos: 150,
        size: 1.1,
        speed: 2.7
    }
];

var mountains = [{
        x_pos: 468,
        y_pos: 222,
        size: 1
    },
    {
        x_pos: 800,
        y_pos: 180,
        size: 1.2
    },
    {
        x_pos: -110,
        y_pos: 86,
        size: 1.65
    },
    {
        x_pos: -1350,
        y_pos: 160,
        size: 1.2
    }
];

var trees_x = [100, 250, 400, 800, 1300, -950, -2000, -1700];
var trees_y = [282, 208, 313, 252, 282, 282, 190, 240];
var trees_scale = [1, 1.5, 0.8, 1.2, 1, 1, 1.3, 1];

var collectables = [{
        x_pos: 100,
        y_pos: 400,
        size: 1,
        isFound: false,
        isCounted: false
    },
    {
        x_pos: 800,
        y_pos: 350,
        size: 1,
        isFound: false,
        isCounted: false
    },
    {
        x_pos: -400,
        y_pos: 300,
        size: 1,
        isFound: false,
        isCounted: false
    },
    {
        x_pos: -900,
        y_pos: 400,
        size: 1,
        isFound: false,
        isCounted: false
    },
    {
        x_pos: -2240,
        y_pos: 200,
        size: 1,
        isFound: false,
        isCounted: false
    }
]

var canyons = [{
        x_pos: 650,
        y_pos: 432,
        width_c: 0.8
    },
    {
        x_pos: 1010,
        y_pos: 432,
        width_c: 1.4
    },
    {
        x_pos: -750,
        y_pos: 432,
        width_c: 1.7
    },
    {
        x_pos: -350,
        y_pos: 432,
        width_c: 0.8
    },
    {
        x_pos: -1120,
        y_pos: 432,
        width_c: 1.2
    },
    {
        x_pos: -4000,
        y_pos: 432,
        width_c: 23
    }
];

var platform = [];

platform.push(createPlatform(-1420, 400, 300));
platform.push(createPlatform(-2020, 380, 500));
platform.push(createPlatform(-2200, 300, 100));
platform.push(createPlatform(-2900, 400, 300));

var enemies;
var killedSound;
var falledSound;

var game_score;

var flag_pole = {
    x_pos: 1500,
    y_pos: 122,
    isReached: false,
    golePoint: 1400,
    startCutscene: false
};

var endingTimer;
var shake;
var lives;

var isDashingleft = false;
var isDashingRight = false;
var dashDistance = 100;
var dashedDistance = 0;
var dashRumble = 0;

function preload() {
    soundFormats('mp3', 'wav'); //audio files

    //load your sounds here
    BGM = loadSound('assets/BGM.DRAW');
    BGM.setVolume(0.2);

    Swoosh = loadSound('assets/swoosh.wav');
    Swoosh.setVolume(0.7);

    Explosion = loadSound('assets/explosion')
    Explosion.setVolume(0.5);

    JumpSound = loadSound('assets/jump.wav')
    JumpSound.setVolume(2);

    BGMEND = loadSound('assets/BGM.END');
    BGMEND.setVolume(0.5);

    gunSound1 = loadSound('assets/gunSound1.wav');
    gunSound1.setVolume(0.2);

    gunSound2 = loadSound('assets/gunSound2.wav');
    gunSound2.setVolume(0.2);

    reload = loadSound('assets/reload');
    reload.setVolume(1);

    killedSound = loadSound('assets/killed.wav')
    killedSound.setVolume(0.5);

    falledSound = loadSound('assets/falled.wav')
    falledSound.setVolume(0.5);

    gun = loadImage('assets/gun.png'); //image files

    gunShot1 = loadImage('assets/gunshot1.png')
    gunShot2 = loadImage('assets/gunshot2.png')
    gunShot3 = loadImage('assets/gunshot3.png')

    easterEGG = loadImage('assets/unicorn.png')
    bandit = loadImage('assets/bandit.png')
}


function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    lives = 4;
    startgame()

}


function draw() {
    if (gunshotMark.x != 0) {
        gunshotTime++
        if (gunshotTime > 10) {
            gunshotTime = 0;
            gunshotMark.x = 0;
            gunshotMark.y = 0;
        }
    }

    if (gameChar_y > 1000 && gameChar_y < 1030) // falling scream sound
    {
        falledSound.play();
    }
    if ((gameChar_y > 1300) && (lives > 0)) //check death
    {
        startgame();


        for (var j = 0; j < collectables.length; j++) {
            collectables[j].isFound = false;
            collectables[j].isCounted = false;
        }
    }


    push();
    translate(scrollPos, 0);



    background(210); // fill the sky blue

    noStroke();
    fill(60);
    rect(-1000, floorPos_y, width * 4, height / 4); // draw some ground




    // controls character jump, dash
    if (flag_pole.startCutscene == false) // stops jumping when cleared
    {


        if (isJumping == true) {
            if (jumpHeight < jumpHeightLimit - 80) {
                gameChar_y = gameChar_y - 15;
                jumpHeight = jumpHeight + 15;

            } else if (jumpHeightLimit - 80 <= jumpHeight && jumpHeight < jumpHeightLimit) {
                gameChar_y = gameChar_y - 7;
                jumpHeight = jumpHeight + 7;
            } else {
                isJumping = false;
                jumpHeight = 0;
            }
        }

        if (isDashingleft == true) {
            isFalling = false;

            if (dashedDistance < dashDistance - 30) {
                if (gameChar_x > width * 0.4) {
                    gameChar_x -= 10;
                } else {
                    scrollPos += 10;
                }
                dashedDistance = dashedDistance + 10;
            } else if (dashedDistance < dashDistance) {
                if (gameChar_x > width * 0.4) {
                    gameChar_x -= 4;
                } else {
                    scrollPos += 4;
                }
                dashedDistance = dashedDistance + 4;
            } else {
                dashedDistance = 0;
                isDashingleft = false;

            }
        }

        if (isDashingRight == true) {
            isFalling = false;

            if (dashedDistance < dashDistance - 30) {
                if (gameChar_x < width * 0.6) {
                    gameChar_x += 10;
                } else {
                    scrollPos -= 10;
                }
                dashedDistance = dashedDistance + 10;
            }
            if (dashedDistance < dashDistance) {
                if (gameChar_x < width * 0.6) {
                    gameChar_x += 4;
                } else {
                    scrollPos -= 4;
                }
                dashedDistance = dashedDistance + 4;
            } else {
                dashedDistance = 0;
                isDashingRight = false;
            }
        }
    }

    // Draw clouds.

    drawclouds();

    // Draw mountains.

    drawmountains();

    // Draw trees.

    drawtrees();

    // Draw canyons.

    for (var CAN = 0; CAN < canyons.length; CAN++) {
        drawCanyon(canyons[CAN]);
        checkCanyon(canyons[CAN]);
    }

    // Draw collectable items.

    for (var CI = 0; CI < collectables.length; CI++) {
        drawCollectable(collectables[CI]);
        checkCollectable(collectables[CI]);
    }

    // Draw gun.

    textSize(20);
    fill(0);
    if (hasGun == true) {
        text("Click to shoot.", -2152, 150)
    }
    if (hasGun == false) {
        image(gun, -2152, 230);
    }
    if (dist(gameChar_world_x, 0, -2144, 0) < 50) {
        hasGun = true;
        pickupTimer++;
    }
    if (pickupTimer == 1) {
        reload.play();
    }
    // draw UI

    drawUI();

    //Draw Flagpole

    renderFlagpole();

    if (lives > 0) {
        textSize(20);
        text("'Space' = jump ,push 'Shift' while moving = dash", 150, 180) // tutorial text
        text("'A' or 'left arrow' = go left , 'D' or 'right arrow' = go right", 150, 155)
        textSize(10);
        text("BGM = West of loathing - Draw!", 150, 125);
    }

    for (var i = 0; i < platform.length; i++) {
        platform[i].draw();
    }

    //Secret

    textSize(15);
    if (gameChar_world_x < -2600) {
        lives = 9;
    }

    text("Yes, this is an Easter egg.", -3100, 160);
    text("Why is there a pink unicorn here?", -3100, 180);
    text("Well, what else did you expect to find here?", -3100, 200);
    text("It's the wild west. Just roll with it.", -3100, 220);
    text("Regardless, pink unicorn likes you and gave you 9 lives.", -3100, 240);
    text("Feel free to hang out with him. If you hate him so much, jump off I guess.", -3100, 260);
    image(easterEGG, -2840, 275);

    if (quote == true) {
        textSize(20);
        text("Seriously?", -2640, 310);
    }


    //Draw enemies

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();

        if (enemies[i].bang(gunshotMark.x, gunshotMark.y) == true) {
            enemies[i].killed = true;
            gunshotMark.x = 0;
            gunshotMark.y = 0;
        }


        if (enemies[i].isContact(gameChar_world_x, gameChar_y) == true) {
            startgame();
            killedSound.play();
            break;
        }

    }


    pop();

    if (gunIsFired == true) // draw bullet trail
    {
        line(mouseX, mouseY, gameChar_x, gameChar_y - 30);
    }


    // Draw game character.
    if (lives > 0) {
        drawGameChar();
    }

    //game over
    if (lives < 1) {
        textSize(40)
        stroke(5);
        text("GAME OVER", gameChar_x - 100, 200);
        console.log("GAMEOVER");

        stroke(2);
        textSize(20)
        text("Press space to start again", gameChar_x - 100, 250);

        return;
    }

    if (flag_pole.isReached == true) {
        return;
    }

    //falling movement
    // Logic to make the game character rise and fall.

    if (gameChar_y < floorPos_y) {
        var isContact = false;

        for (var i = 0; i < platform.length; i++) {
            if (platform[i].checkContact(gameChar_world_x, gameChar_y) == true) {
                isContact = true;
                break;
            }
        }

        if (isContact == false) {
            gameChar_y += 5;
            isFalling = true;
        } else {
            isFalling = false;
        }

    } else {
        isFalling = false;
    }



    // Logic to make the game character move or the background scroll.

    if ((lives > 0) && (flag_pole.startCutscene == false)) //stops movement when cleared or dead
    {
        if (isLeft) {
            if (gameChar_x > width * 0.4) {
                gameChar_x -= 5;
            } else {
                scrollPos += 5;
            }
        }

        if (isRight) {
            if (gameChar_x < width * 0.6) {
                gameChar_x += 5;
            } else {
                scrollPos -= 5; // negative for moving against the background
            }
        }
    }



    // Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;


    if ((gameChar_world_x > flag_pole.golePoint + 50) && (flag_pole.startCutscene == false)) //world boundary
    {
        gameChar_world_x = flag_pole.golePoint + 50;
        gameChar_x = 600;
    }

    checkflagpole(); //check gamecleared conditions
    gunFired(); //draw gunfire marks.

}


// ---------------------
// Key control functions
// ---------------------

function mousePressed() {
    gunshotMark.x = -scrollPos + mouseX; // places the bullet's x value
    gunshotMark.y = mouseY; // places y value

    console.log(gunshotMark);

    if (dist(gunshotMark.x, gunshotMark.y, -2766, 388) < 100) {
        quote = true;
    }

    var i;
    i = random(0, 1);
    if (flag_pole.startCutscene == false && hasGun == true) {
        revolver = random(0, 3);
        gunIsFired = true;

        if (i < 0.5) {
            gunSound1.play();
        } else {
            gunSound2.play();
        }
    }

    if (mouseX < -2840) {
        quote = true;
    }

}

function gunFired() {

    if (gunIsFired == true) // shows random bullet hole 
    {

        if (revolver < 1) {
            image(gunShot1, mouseX - 25, mouseY - 25);
        }
        if (revolver > 2) {
            image(gunShot2, mouseX - 25, mouseY - 25);
        } else {
            image(gunShot3, mouseX - 25, mouseY - 25);
        }

        gunTimer++
    }
    if (gunTimer == 10) // resets bullet hole
    {
        gunIsFired = false;
        gunTimer = 0;
    }

}

function keyPressed() {

    if (BGM_ON == false) //turns on music as player starts moving.
    {
        BGM.play();
        BGM_ON = true;
    }

    if (flag_pole.isReached && key == ' ') {
        nextLevel();
        return
    } else if (lives == 0 && key == ' ') {
        lives = 4;
        startgame()
    }



    // if statements to control the animation of the character when
    // keys are pressed.

    if (flag_pole.startCutscene == false) // stops movement when game is cleared
    {

        if (keyCode == 37 || keyCode == 65) // moveLeft
        {
            isLeft = true;
        }

        if (keyCode == 39 || keyCode == 68) // moveRight
        {
            isRight = true;
        }

        if (keyCode == 32 && isFalling == false && isPlummeting == false) // jump key
        {
            isJumping = true;
            JumpSound.play();
        }
    }

    if (keyCode == 16 && isLeft == true && isDashingleft == false && isDashingRight == false) //left dash
    {
        isDashingleft = true;
        Swoosh.play();
    }
    if (keyCode == 16 && isRight == true && isDashingleft == false && isDashingRight == false) //right dash
    {
        isDashingRight = true;
        Swoosh.play();
    }




}

function keyReleased() {

    // if statements to control the animation of the character when
    // keys are released.

    if (keyCode == 37 || keyCode == 65) // isLeft
    {
        isLeft = false;
    }

    if (keyCode == 39 || keyCode == 68) // isRight
    {
        isRight = false;
    }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
    // draw game character

    if (isLeft && isFalling) {
        // add your jumping-left code

        push(); //jumping to the left main character
        translate(gameChar_x, gameChar_y);

        stroke(0);
        strokeWeight(3);
        scale(-1, 1);

        rotate(0.2);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -20);
        vertex(10, -46);
        vertex(2, -39);
        vertex(-10, -46);
        endShape(CLOSE);

        rotate(-0.4);

        fill(240); //head
        ellipse(20, -55, 18, 18);

        fill(0); //hat
        quad(32, -62, 5, -55, 14, -63, 22, -67);
        quad(14, -63, 22, -67, 24, -71, 10, -66);

        pop();

    } else if (isRight && isFalling) {
        // add your jumping-right code

        push(); //jumping to the right main character
        translate(gameChar_x, gameChar_y);

        stroke(0);
        strokeWeight(3);

        rotate(0.2);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -20);
        vertex(10, -46);
        vertex(2, -39);
        vertex(-10, -46);
        endShape(CLOSE);

        rotate(-0.4);

        fill(240); //head
        ellipse(20, -55, 18, 18);

        fill(0); //hat
        quad(32, -62, 5, -55, 14, -63, 22, -67);
        quad(14, -63, 22, -67, 24, -71, 10, -66);

        pop();

    } else if (isRight) {
        // add your walking right code

        push(); //walking right main character
        translate(gameChar_x, gameChar_y);

        stroke(0);
        strokeWeight(3);

        rotate(0.2);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -16);
        vertex(10, -42);
        vertex(2, -35);
        vertex(-10, -42);
        endShape(CLOSE);

        rotate(-0.2);

        fill(240); //head
        ellipse(10, -50, 18, 18);

        fill(0); //hat
        quad(22, -57, -5, -50, 4, -58, 12, -62);
        quad(4, -58, 12, -62, 14, -66, 0, -61);

        pop();

    } else if (isLeft) {
        // add your walking left code

        push(); //walking left main character
        translate(gameChar_x, gameChar_y);
        scale(-1, 1);

        stroke(0);
        strokeWeight(3);

        rotate(0.2);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -16);
        vertex(10, -42);
        vertex(2, -35);
        vertex(-10, -42);
        endShape(CLOSE);

        rotate(-0.2);

        fill(240); //head
        ellipse(10, -50, 18, 18);

        fill(0); //hat
        quad(22, -57, -5, -50, 4, -58, 12, -62);
        quad(4, -58, 12, -62, 14, -66, 0, -61);

        pop();

    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code

        push(); //jumping facing forwards main character
        translate(gameChar_x, gameChar_y);

        stroke(0);
        strokeWeight(3);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -20);
        vertex(10, -46);
        vertex(2, -39);
        vertex(-10, -46);
        endShape(CLOSE);

        rotate(-0.4);

        fill(240); //head
        ellipse(20, -55, 18, 18);

        fill(0); //hat
        quad(32, -62, 5, -55, 14, -63, 22, -67);
        quad(14, -63, 22, -67, 24, -71, 10, -66);

        pop();

    } else {
        // add your standing front facing code

        push(); //standing front facing main character
        translate(gameChar_x, gameChar_y);

        stroke(0);
        strokeWeight(3);

        fill(240); //legs
        triangle(-4, -12, 0, -3, 4, -12);

        fill(120); //cape
        beginShape();
        vertex(-18, -16);
        vertex(10, -16);
        vertex(10, -42);
        vertex(2, -35);
        vertex(-10, -42);
        endShape(CLOSE);

        fill(240); //head
        ellipse(0, -52, 18, 18);

        fill(0); //hat
        quad(12, -57, -15, -50, -6, -58, 2, -62);
        quad(-6, -58, 2, -62, 4, -66, -10, -61);

        pop();


    }



}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.


function drawclouds() {

    // Draw clouds.

    for (var C = 0; C < clouds.length; C++) {

        clouds[C].x_pos = clouds[C].x_pos - 1 * clouds[C].speed; //move cloud
        if (clouds[C].x_pos < gameChar_world_x - 850 || clouds[C].x_pos > gameChar_world_x + 850) {
            clouds[C].x_pos = gameChar_world_x + 850;
        }

        fill(180); //shade cloud set

        rect(clouds[C].x_pos + 10 * clouds[C].size,
            clouds[C].y_pos - 10 * clouds[C].size,
            130 * clouds[C].size,
            75 * clouds[C].size,
            20, 20, 20, 20);

        ellipse(clouds[C].x_pos + 40 * clouds[C].size,
            clouds[C].y_pos + 10 * clouds[C].size,
            100 * clouds[C].size,
            100 * clouds[C].size);

        rect(clouds[C].x_pos + 155 * clouds[C].size,
            clouds[C].y_pos + 50 * clouds[C].size,
            60 * clouds[C].size,
            40 * clouds[C].size,
            20, 20, 20, 20);

        fill(235); //front cloud set

        rect(clouds[C].x_pos,
            clouds[C].y_pos,
            130 * clouds[C].size,
            75 * clouds[C].size,
            20 * clouds[C].size,
            20, 20, 20);

        ellipse(clouds[C].x_pos + 30 * clouds[C].size,
            clouds[C].y_pos + 25 * clouds[C].size,
            100 * clouds[C].size,
            100 * clouds[C].size);

        rect(clouds[C].x_pos + 150 * clouds[C].size,
            clouds[C].y_pos + 55 * clouds[C].size,
            60 * clouds[C].size,
            40 * clouds[C].size,
            20, 20, 20, 20);

    }

}

// Function to draw mountains objects.

function drawmountains() {

    // Draw mountains.

    for (var M = 0; M < mountains.length; M++) {

        fill(80); //back mountain

        triangle(mountains[M].x_pos + 80 * mountains[M].size, mountains[M].y_pos + 210 * mountains[M].size,
            mountains[M].x_pos + 115 * mountains[M].size, mountains[M].y_pos - 30 * mountains[M].size,
            mountains[M].x_pos + 170 * mountains[M].size, mountains[M].y_pos + 210 * mountains[M].size);

        fill(110) //midle mountains[M] 

        beginShape();
        vertex(mountains[M].x_pos, mountains[M].y_pos + 200 * mountains[M].size);
        vertex(mountains[M].x_pos + 30 * mountains[M].size, mountains[M].y_pos + 10 * mountains[M].size);
        vertex(mountains[M].x_pos + 100 * mountains[M].size, mountains[M].y_pos);
        vertex(mountains[M].x_pos + 105 * mountains[M].size, mountains[M].y_pos + 200 * mountains[M].size);
        endShape(CLOSE);

        fill(150); //front mountains[M]

        quad(mountains[M].x_pos - 15 * mountains[M].size, mountains[M].y_pos + 210 * mountains[M].size, mountains[M].x_pos + 30, mountains[M].y_pos + 150 * mountains[M].size, mountains[M].x_pos + 140 * mountains[M].size, mountains[M].y_pos + 150 * mountains[M].size, mountains[M].x_pos + 155 * mountains[M].size, mountains[M].y_pos + 210 * mountains[M].size)

    }

}

// Function to draw trees objects.


function drawtrees() {

    // Draw trees.

    for (var T = 0; T < trees_x.length; T++) {


        fill(60); //cactus hands

        rect(trees_x[T] + 10 * trees_scale[T], trees_y[T] + 50 * trees_scale[T], 40 * trees_scale[T], 20 * trees_scale[T], 20, 20, 20, 20);
        rect(trees_x[T] - 24 * trees_scale[T], trees_y[T] + 40 * trees_scale[T], 40 * trees_scale[T], 20 * trees_scale[T], 20, 20, 20, 20);
        rect(trees_x[T] - 24 * trees_scale[T], trees_y[T] + 10 * trees_scale[T], 20 * trees_scale[T], 40 * trees_scale[T], 20, 20, 20, 0);

        fill(100); //cactus stem

        rect(trees_x[T], trees_y[T], 30 * trees_scale[T], 150 * trees_scale[T], 20, 20, 0, 0);



    }

}

function createPlatform(x, y, length) {

    var p = {

        x: x,
        y: y,
        length: length,
        draw: function() {
            fill(60);
            quad(this.x, this.y,
                this.x + this.length, this.y,
                this.x + this.length + 25, 1000,
                this.x - 40, 1000)

        },

        checkContact: function(gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                var d = this.y - gc_y;
                if (d >= 0 && d < 5) {
                    return true;
                }

            }

            return false;

        }
    }

    return p;
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
    fill(210);

    triangle(t_canyon.x_pos,
        t_canyon.y_pos,
        t_canyon.x_pos + 20 * t_canyon.width_c,
        t_canyon.y_pos + 60,
        t_canyon.x_pos + 30 * t_canyon.width_c,
        t_canyon.y_pos);

    quad(t_canyon.x_pos + 25 * t_canyon.width_c,
        t_canyon.y_pos,
        t_canyon.x_pos + 40 * t_canyon.width_c,
        t_canyon.y_pos + 300,
        t_canyon.x_pos + 80 * t_canyon.width_c,
        t_canyon.y_pos + 300,
        t_canyon.x_pos + 95 * t_canyon.width_c,
        t_canyon.y_pos);

    triangle(t_canyon.x_pos + 50 * t_canyon.width_c,
        t_canyon.y_pos,
        t_canyon.x_pos + 50 * t_canyon.width_c,
        t_canyon.y_pos + 200,
        t_canyon.x_pos + 130 * t_canyon.width_c,
        t_canyon.y_pos);


}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
    //check if character falls into canyon

    if (t_canyon.x_pos < gameChar_world_x &&
        gameChar_world_x < t_canyon.x_pos + 130 * t_canyon.width_c &&
        gameChar_y >= floorPos_y &&
        isDashingleft == false &&
        isDashingRight == false) {
        isPlummeting = true;
    }
    if (isPlummeting == true) {
        push();
        gameChar_y = gameChar_y + 4; //plummeting speed
        pop();
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
    if (t_collectable.isFound == false) {

        translate(t_collectable.x_pos, t_collectable.y_pos);
        rotate(-1)

        stroke(0);
        strokeWeight(3);
        fill(250); //fuse
        rect(10 * t_collectable.size,
            5 * t_collectable.size,
            55 * t_collectable.size,
            5 * t_collectable.size);

        fill(180); //tnt body
        rect(0 * t_collectable.size,
            0 * t_collectable.size,
            55 * t_collectable.size,
            15 * t_collectable.size, 3, 3, 3, 3);

        noStroke();

        fill(0, 0, 0); //tnt body(black)
        rect(10 * t_collectable.size,
            0 * t_collectable.size,
            35 * t_collectable.size,
            15 * t_collectable.size);

        fill(255); // tnt text
        textSize(14 * t_collectable.size);
        textStyle(BOLD);
        text("TNT", 13 * t_collectable.size, 13 * t_collectable.size);

        rotate(1);
        translate(-t_collectable.x_pos, -t_collectable.y_pos);

    }


}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
    if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos + 20, t_collectable.y_pos) < 50) {
        t_collectable.isFound = true;
    }
}

// Function to count collectables collected.

function countGameScore() {
    for (var i = 0; i < collectables.length; i++) {
        if ((collectables[i].isFound == true) && (collectables[i].isCounted == false)) {
            game_score = game_score + 1;
            collectables[i].isCounted = true;
        }

    }


}

function drawUI() {
    //draws Dynamite counter

    translate(-scrollPos + 10, 50);
    rotate(-1)

    stroke(0);
    strokeWeight(3);
    fill(250); //fuse
    rect(10 * 0.75, 5 * 0.75, 55 * 0.75, 5 * 0.75);

    fill(180); //tnt body
    rect(0 * 0.75, 0 * 0.75, 55 * 0.75, 15 * 0.75, 3, 3, 3, 3);

    noStroke();

    fill(0, 0, 0); //tnt body(black)
    rect(10 * 0.75, 0 * 0.75, 35 * 0.75, 15 * 0.75);

    fill(255); // tnt text
    textSize(14 * 0.75);
    textStyle(BOLD);
    text("TNT", 13 * 0.75, 13 * 0.75);

    rotate(1);

    stroke(0);
    strokeWeight(5);
    textSize(28);
    text("X " + game_score, 40, 0) //counts number of objects collected

    translate(scrollPos - 10, -50);

    countGameScore() // calls function to count gamescore. 


    //draws character icon

    translate(-scrollPos + 130, 90);

    stroke(0);
    strokeWeight(3);


    fill(240); //head
    ellipse(0, -52, 18, 18);

    fill(0); //hat
    quad(12, -57, -15, -50, -6, -58, 2, -62);
    quad(-6, -58, 2, -62, 4, -66, -10, -61);

    stroke(0);
    strokeWeight(5);
    textSize(28);
    fill(255);
    text("X " + lives, 30, -40) //counts number of objects collected

    translate(scrollPos - 130, -90)


    //draws gun
    translate(-scrollPos + 220, 13);

    if (hasGun == true) {

        image(gun, 0, 0);
    }
    translate(scrollPos - 220, -13)
}

function renderFlagpole() {
    if (flag_pole.startCutscene == false) // before completion
    {
        fill(60);
        noStroke();
        quad(flag_pole.x_pos + 20, flag_pole.y_pos,
            flag_pole.x_pos + 200, flag_pole.y_pos + 10,
            flag_pole.x_pos + 260, flag_pole.y_pos + 330,
            flag_pole.x_pos - 5, flag_pole.y_pos + 330);
    }
    if (flag_pole.startCutscene == true) //starts the ending cutscene
    {
        BGM.stop();
        fill(60);
        noStroke();
        quad(flag_pole.x_pos + 20 + shake, flag_pole.y_pos,
            flag_pole.x_pos + 200 + shake, flag_pole.y_pos + 10,
            flag_pole.x_pos + 260 + shake, flag_pole.y_pos + 330,
            flag_pole.x_pos - 5 + shake, flag_pole.y_pos + 330);


        endingTimer++

        if ((endingTimer > 20) && (endingTimer < 120)) {
            for (var i = 0; i < collectables.length; i++) {
                translate(flag_pole.x_pos + 80, flag_pole.y_pos + 200 + i * 18);

                stroke(0);
                strokeWeight(3);
                fill(250); //fuse
                rect(10, 5, 55, 5);

                fill(180); //tnt body
                rect(0, 0, 55, 15, 3, 3, 3, 3);

                noStroke();

                fill(0, 0, 0); //tnt body(black)
                rect(10, 0, 35, 15);

                fill(255); // tnt text
                textSize(14);
                textStyle(BOLD);
                text("TNT", 13, 13);

                translate(-flag_pole.x_pos - 80, -flag_pole.y_pos - 200 - i * 18);
            }
        }
        if (endingTimer == 120) //Boom sound
        {
            Explosion.play();
        }

        if (endingTimer > 120) // shaky effect
        {
            shake = random(-5, 5)
        }

        if (endingTimer > 250) //sink
        {
            flag_pole.y_pos = flag_pole.y_pos + 2
        }

        if (endingTimer == 500) //start ending music
        {
            BGMEND.play();
        }

        if (endingTimer > 500) //auto character move
        {
            gameChar_x = gameChar_x + 0.5
        }

        if (endingTimer > 650) {
            textSize(10);
            text("BGM = West of loathing - Sit Fer A Spell", flag_pole.x_pos - 300, 170);

            textSize(20);
            text("Your journey continues!", flag_pole.x_pos - 300, 200)
            text("Thank you for playing! Push space to continue.", flag_pole.x_pos - 300, 230)
            flag_pole.isReached = true;
        }




    }
}

function checkflagpole() {
    if ((gameChar_world_x > flag_pole.golePoint) && (flag_pole.startCutscene == false) && (game_score != collectables.length)) // not enough collectables
    {
        stroke(3);
        textSize(20);
        text("I'll need " + collectables.length + " dynamites to clear the away", gameChar_x - 300, 250); //show objective
    }

    if ((gameChar_world_x > flag_pole.golePoint) && (flag_pole.startCutscene == false) && (game_score == collectables.length)) // enough collectables
    {
        flag_pole.startCutscene = true;
    }
}

function startgame() // setups the game conditions when it starts, player dies
{

    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

    // variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isJumping = false
    jumpHeight = 0;
    jumpHeightLimit = 210;
    game_score = 0;
    endingTimer = 0;
    shake = 0;
    hasGun = false;
    pickupTimer = 0;

    //loses life on death
    lives = lives - 1;

    //respawns enemies on death
    enemies = [];
    enemies.push(new Enemy(-520, floorPos_y, 170, 1, false));
    enemies.push(new Enemy(-955, floorPos_y, 200, 1.3, false));
    enemies.push(new Enemy(-2000, 382, 270, 1.5, false));
    enemies.push(new Enemy(-1900, 382, 370, 1, false));
    enemies.push(new Enemy(-1530, 382, 10, 2, false));
    enemies.push(new Enemy(762, floorPos_y, 230, 2, false));

    gunshotMark.x = 0;
    gunshotMark.y = 0;

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].killed = false;
    }


}

function Enemy(x, y, range, scale, killed) //handles enemy spawn, movement, death
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.scale = scale;


    this.killed = killed;

    this.current_x = x;
    this.incr = 1 * scale;

    this.bang = function(XMark, YMark) //kills enemy
    {
        if (hasGun == true) {
            var d = dist(XMark, YMark, this.current_x - 13, this.y - 34);

            if (d < 30) {
                console.log("bang!");
                return true;
            }
        }

    }

    this.draw = function() // draws sprite
    {
        if (this.killed != true) {
            image(bandit, this.current_x - 26, this.y - 69)
        }

    }

    this.update = function() // moves enemy
    {
        this.current_x += this.incr;

        if (this.current_x < this.x) {
            this.incr = 1 * this.scale;
        } else if (this.current_x > this.x + this.range) {
            this.incr = -1 * this.scale;
        }

    }

    this.isContact = function(gc_x, gc_y) //kills player incontact
    {
        if (this.killed != true) {
            var d = dist(gc_x, gc_y, this.current_x, this.y);

            if (d < 30) {
                console.log("ouch!");
                return true;
            }

            return false;
        }

    }
}