// selectors
const movement = document.querySelector('#movement')
const clock = document.querySelector('#clock')
const infoScreen = document.querySelector('#infoScreen')
const pButton = document.querySelector('#pButton')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")



// canvas display

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// render map function, this generates the maze according to the 2d Array added as a argument

// creates and starts timer on button click

const renderMaze = (ctx, mazeArray) => {
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[i].length; j++) {
            ctx.beginPath()
            ctx.rect(j * 20, i * 20, 20, 20)
            ctx.fillStyle = mazeArray[i][j] === 0 ? 'black' : 'grey'
            ctx.fill()
            ctx.closePath()
        }
    }
}

renderMaze(ctx, mazeArray)


// game objects prototype, this came from the lesson for canvas from GA instructor Bailey

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

// game objects, this came from the lesson for canvas from GA instructor Bailey 


// FUNCTIONS*********

// // checks to see if a block is a 1 or 0 in the mapArray
function isValidMove(x, y) {
    const arrayX = Math.floor(x / 20)
    const arrayY = Math.floor(y / 20)
    if (mazeArray[arrayY] && mazeArray[arrayY][arrayX] === 0) {
        return true
    } else {
        return false
    }
}

// generates a random x and Y which we use to randomly spawn our objects

const randomX = () => {
    const randomMultiple = Math.floor(Math.random() * (62) + 1)
    return randomMultiple * 20
  }
  

const randomY = () => {
    const randomMultiple = Math.floor(Math.random() * (34) + 1)
    return randomMultiple * 20
}


// this creates a random spawn for the hero and the goal
let hero = new Crawler(20, 20, 20, 20, 'pink')

const createHero = () => {
    ctx.fillStyle = '#F7F1E5'
    ctx.fillRect(hero.x, hero.y, 20, 20)
    hero = ''
    let x = randomX()
    let y = randomY()
    if(isValidMove(x,y)) {
        hero = new Crawler(x,y, 20, 20, 'pink')
        hero.render()
    } else {
        createHero()
    }
       
}

let goal = new Crawler(1240, 20, 20, 20, 'pink')

const createGoal =() => {
    ctx.fillStyle = '#F7F1E5'
    ctx.fillRect(goal.x, goal.y, 20, 20)
    goal = ''
    let x = randomX()
    let y = randomY()
    if(isValidMove(x,y) && x !== hero.x && y !== hero.y) {   
        goal = new Crawler(x,y, 20, 20, 'green')
        goal.render()
    } else {
        createGoal()
    }
       
}

const createMobs = () => {
    let numberOfMobs = 0
    mobNames = []
    while (numberOfMobs < 50) {
        let x = randomX()
        let y = randomY()

        if (isValidMove(x, y) && x !== hero.x && y !== hero.y && x !== goal.x && y !== goal.y) {
            let newMob = new Crawler(x, y, 20, 20, 'red')
            newMob.render()
            mobNames.push(newMob)
            numberOfMobs++
        }
    }
}


// On click starts timer + Creates hero/goal/mobs
let timeLeft = 60
let timerPause = 0
let timerId = ''
const timer = () => {
    timerId = setInterval(function(){
        timeLeft --
        clock.innerText = `You have ${timeLeft} seconds`
        if(timeLeft < 0) {
            clearInterval(timerId)
            infoScreen.style.zIndex = "3"
            clock.innerHTML = "You're dead"     
        }
    },1000)
}


pButton.addEventListener('click', function(){
    clearInterval(timerId)
    timeLeft = 60
    timer()  
    //recalling all these renders make it so on click it clears all the old stuff off the map
    renderMaze(ctx, mazeArray)
    createHero()
    createGoal()
    createMobs()
    infoScreen.style.zIndex = "0"
})


// Function needed for collision detection which is used in the handle Key press event function
const isColliding = (crawler1, crawler2) => {
    return crawler1.x === crawler2.x && crawler1.y === crawler2.y
}

// detects key strokes and moves the character if the move is valid. this came from the lesson for canvas from GA instructor Bailey. Add function to check for a valid move based on the maze array

document.addEventListener('keydown', handleKeyPressEvent)

function handleKeyPressEvent(e) {
    const speed = 20;
    let prevX = hero.x
    let prevY = hero.y
    let newX = hero.x
    let newY = hero.y

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
        hero.x = newX
        hero.y = newY
        movement.innerText = `x: ${hero.x} y: ${hero.y}`
        ctx.fillStyle = '#F7F1E5'
        ctx.fillRect(prevX, prevY, hero.width, hero.height)
        goal.render() //this is to make it so the color of the goal doesnt go away if the hero runs past it
        hero.render()
        }

        // moved the collision detection in here. it makes it so that the user can't run past an object
    if (isColliding(hero, goal)) {
        clearInterval(timerId)
        infoScreen.style.zIndex = "3"
        clock.innerHTML = "Life is fleeting, don't waste a second"
    } else { for (let i = 0; i < mobNames.length; i++) {
                if (isColliding(hero, mobNames[i])) {
                    clearInterval(timerId)
                    clock.innerHTML = "Run: if you make it there is no time penalty  Fight: if you win you get +10 seconds  Hide: High chance of survival but you lose 5 seconds"
                    battle.style.zIndex = "3"
                    // add something here to freeze the clock
                    mobNames[i] = (10,10, 10,10, "black")
                }
            }
        }    
    }
// }









// MINIGAME

// Selectors for the mini game
const battle = document.querySelector('#battle')
const run = document.querySelector('#battleRun')
const fight = document.querySelector('#battleFight')
const hide = document.querySelector('#battleHide')

// functions for the minigame

const enableButtons = () => {
    run.disabled = false
    fight.disabled = false
    hide.disabled = false
}
const disableButtons = () => {
    run.disabled = true
    fight.disabled = true
    hide.disabled = true
}


const yourDead = () => {
    setTimeout(() =>{
        battle.style.zIndex = '0'
        infoScreen.style.zIndex = '3'
        clock.innerHTML = "You're dead"
        enableButtons()
        clearInterval(timerId)
    },2000)
}

const survived = () => {
    setTimeout(()=>{
        battle.style.zIndex = '0'
        enableButtons()
        timer()
    }, 2000)
}

// User selector options for the minigame

run.addEventListener('keydown', function() {
    disableButtons()
    computerChoice = Math.floor(Math.random() * 3) 
        if(computerChoice === 3) {
            // need to add clear interval to stop the timer
            yourDead()
        } else { 
            survived() 
    }

})

fight.addEventListener('click', function(){
    disableButtons()
    computerChoice = Math.floor(Math.random() * 3) 
    if(computerChoice === 0 || computerChoice === 2) {
        yourDead()
    } else {
        timeLeft += 10
        survived()
        
    }
})

hide.addEventListener('click', function(){
    disableButtons()
    computerChoice = Math.floor(Math.random() * 5) 
    if(computerChoice === 0) {
        yourDead()
    } else {
        timeLeft -= 5
        survived()
    }

})