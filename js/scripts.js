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
