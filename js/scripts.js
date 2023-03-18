// selectors
const movement = document.querySelector('#movement')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

// canvas display

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// render map function

function renderMaze(ctx, mazeArray) {
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[i].length; j++) {
            ctx.beginPath();
            ctx.rect(j * 20, i * 20, 20, 20)
            ctx.fillStyle = mazeArray[i][j] === 0 ? '#F7F1E5' : '#898121';
            ctx.fill();
            ctx.closePath()
        }
    }
}

renderMaze(ctx, mazeArray)

// game objects prototype

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }  
}

// game objects

const hero = new Crawler(20, 20, 20, 20, 'blue')
const goal = new Crawler(400, 400, 20, 20, 'green')
const mob = new Crawler(200,200, 20, 20, 'purple')
hero.render()
goal.render()
mob.render()

let mobs = 0
// FUNCTIONS*********

// generates a random x and Y which we use to randomly spawn mobs

function randomX() {
    const randomMultiple = Math.floor(Math.random() * (62) + 1);
    return randomMultiple * 20;
  }
  console.log(randomX());

function randomY() {
    const randomMultiple = Math.floor(Math.random() * (34) + 1);
    return randomMultiple * 20;
}
console.log(randomY())

// // checks to see if the next spot the user moves to is a wall or not
function isValidMove(x, y) {
    const arrayX = Math.floor(x / 20);
    const arrayY = Math.floor(y / 20);
    if (mazeArray[arrayY] && mazeArray[arrayY][arrayX] === 0) {
        return true;
    } else {
        return false;
    }
}



for (let i = 0 ; i < mobNames.length ; i++) {
    let x = randomX()
    let y = randomY()
    if(isValidMove(x,y)) {
        mobNames[i] = new Crawler(x,y, 20, 20, 'red')
        mobNames[i].render()
    }
}
console.log(mobNames)




// detects key strokes and moves the character if the move is valid
document.addEventListener('keydown', handleKeyPressEvent)

function handleKeyPressEvent(e) {
    const speed = 20;
    let prevX = hero.x;
    let prevY = hero.y;
    let newX = hero.x;
    let newY = hero.y;

    switch (e.key) {
        case "w":
        case "ArrowUp":
            newY -= speed;
            break;
        case "s":
        case "ArrowDown":
            newY += speed;
            break;
        case "a":
        case "ArrowLeft":
            newX -= speed;
            break;
        case "d":
        case "ArrowRight":
            newX += speed;
            break;
    }

    if (isValidMove(newX, newY)) {
        hero.x = newX;
        hero.y = newY;
        movement.innerText = `x: ${hero.x} y: ${hero.y}`;
        ctx.fillStyle = '#F7F1E5';
        ctx.fillRect(prevX, prevY, hero.width, hero.height);
        hero.render();
    }
}

// gameloop to detect if two crawlers occupy the same space
const gameLoopInterval = setInterval(gameLoop, 60)
function gameLoop() {
    if(goal.x === hero.x && goal.y === hero.y) {
       console.log("your pretty clever")
    }else if (mob.x === hero.x && mob.y === hero.y) {
        console.log("endgame baby")
    }
}
