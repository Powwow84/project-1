// selectors
const movement = document.querySelector('#movement')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

// canvas display

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

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


class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


document.addEventListener('keydown', handleKeyPressEvent)

// game objects

const hero = new Crawler(20, 20, 20, 20, 'blue')
hero.render()

function isValidMove(x, y) {
    const arrayX = Math.floor(x / 20);
    const arrayY = Math.floor(y / 20);

    if (mazeArray[arrayY] && mazeArray[arrayY][arrayX] === 0) {
        return true;
    } else {
        return false;
    }
}

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


