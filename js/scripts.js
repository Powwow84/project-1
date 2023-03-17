// selectors
const movement = document.querySelector('#movement')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

// canvas

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

function renderMaze(ctx, mazeArray) {
    for (let i = 0; i < mazeArray.length; i++) {
      for (let j = 0; j < mazeArray[i].length; j++) {
        ctx.beginPath();
  
        ctx.rect(j * 10, i * 10, 10, 10)
  
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

const hero = new Crawler(10, 10, 10, 10, 'blue')
hero.render()


function handleKeyPressEvent(e) {
    const speed = 10
    let prevX = hero.x;
    let prevY = hero.y;

    switch(e.key) {
        case "w":
        case "ArrowUp" :
            hero.y -= speed
            break;
        case "s" :
        case "ArrowDown" :
            hero.y += speed
            break;
         case "a" :   
         case "ArrowLeft" :
            hero.x -= speed
            break;
         case "d":   
         case "ArrowRight" :
            hero.x += speed
            break; 
    }
    movement.innerText = `x: ${hero.x} y: ${hero.y}`
    ctx.fillStyle = '#F7F1E5';
    ctx.fillRect(prevX, prevY, hero.width, hero.height);
    hero.render()
}

