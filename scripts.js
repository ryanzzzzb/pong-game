//setup
const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 320;

//variables
let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = 2;
const ballRadius = 10.5;
let score1, score2;
score1 = score2 = 0;
console.log(score1, score2);

// PADDLE 1
const paddle1_Height = 70;
const paddle1_Width = 10;
let paddle1Y = (canvas.height - paddle1_Height) / 2;

// PADDLE 2
const paddle2_Height = 70;
const paddle2_Width = 10;
let paddle2Y = (canvas.height - paddle1_Height) / 2;

function drawBall(){
    c.beginPath();
    c.arc(x, y, ballRadius, 0, Math.PI* 2);
    c.fillStyle = "#30D5C8";
    c.fill();
    c.closePath();
}

function drawPaddle1(){
    c.beginPath();
    c.rect(0, paddle1Y, paddle1_Width, paddle1_Height);
    c.fillStyle = '#000000';
    c.fill();
    c.closePath();
}

function drawPaddle2(){
    c.beginPath();
    c.rect(canvas.width - paddle2_Width, paddle2Y, paddle2_Width, paddle2_Height);
    c.fillStyle = '#000000';
    c.fill();
    c.closePath();
}

function draw(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle1();
    drawPaddle2();
    
    //bounce off the walls
    //Right wall (Enemy)
    if (x + dx > canvas.width - ballRadius){
        if (y > paddle2Y && y < paddle2Y + paddle2_Height){
            console.log("hit");
            dx = -dx; //reverse movement
            dx -= 0.2; //adding speed
        } else {
            score1++;
            x = canvas.width/2;
            dx = 2;
        }
    }
    //Left wall (You)
    else if (x + dx < ballRadius){
        if (y > paddle1Y && y < paddle1Y + paddle1_Height){
            console.log("hit");
            dx = -dx; //reverse movement
            dx += 0.2; //adding speed
        } else {
            score2++;
            x = canvas.width/2;
            dx = 2;
        }

    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    x += dx;
    y += dy;

    //keybinds 
    if (up1_pressed){
        paddle1Y = Math.max(paddle1Y - 4, 0);
    } else if (down1_pressed){
        paddle1Y = Math.min(paddle1Y + 4, canvas.height - paddle1_Height);
    }

    if (up2_pressed){
        paddle2Y = Math.max(paddle2Y - 4, 0);
    } else if (down2_pressed){
        paddle2Y = Math.min(paddle2Y + 4, canvas.height - paddle2_Height);
    }

    //draw score
    document.getElementById("score").innerHTML = `${score1} : ${score2}`;


    //restart game once someone gets to 20
    if (score1 === 20){
        alert("Player 1 Won.")
        window.location.reload();
        clearInterval(interval);
    } else if (score2 === 20){
        alert("Player 2 Won.");
        window.location.reload();
        clearInterval(interval);
    }
}

const interval = setInterval(() => {
    draw();
}, 8);

//keyboard events
let up1_pressed, down1_pressed, up2_pressed, down2_pressed;
up1_pressed = down1_pressed = up2_pressed = down2_pressed = false;
console.log(up1_pressed,up2_pressed,down1_pressed,down2_pressed); //works

//Player
document.addEventListener("keydown", downHandler, false);
document.addEventListener("keyup", upHandler, false);
//Player 2
document.addEventListener("keydown", downHandlerTwo, false);
document.addEventListener("keyup", upHandlerTwo, false);

function downHandler(evt){
    if (evt.key === "w"){
        up1_pressed = true;
    } else if (evt.key === "s"){
        down1_pressed = true;
    }
}

function upHandler(evt){
    if (evt.key === "w"){
        up1_pressed = false;
    } else if (evt.key === "s"){
        down1_pressed = false;
    }
}

function downHandlerTwo(evt){
    if (evt.key === "ArrowUp"){
        up2_pressed = true;
    } else if (evt.key === "ArrowDown"){
        down2_pressed = true;
    }
}

function upHandlerTwo(evt){
    if (evt.key === "ArrowUp"){
        up2_pressed = false;
    } else if (evt.key === "ArrowDown"){
        down2_pressed = false;
    }
}