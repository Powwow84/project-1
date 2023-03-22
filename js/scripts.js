// selectors
const movement = document.querySelector('#movement')
const clock = document.querySelector('#clock')
const infoScreen = document.querySelector('#infoScreen')
const info =document.querySelector('#info')
const winScreen = document.querySelector('#survivor')
const deathScreen = document.querySelector('#deathScreen') 
const pButton = document.querySelector('#pButton')
const replayWin = document.querySelector('#replaywin')
const replayDead = document.querySelector('#replayDead')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")
const battle = document.querySelector('#battle')
pButton.disabled = false
replayDead.disabled = true
replayWin.disabled = true

// Selectors for the mini game
const battleUpdate = document.querySelector('#battleUpdate')
const run = document.querySelector('#battleRun')
const fight = document.querySelector('#battleFight')
const hide = document.querySelector('#battleHide')
run.disabled = true
fight.disabled = true
hide.disabled = true


// canvas display

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// render map function, this generates the maze according to the 2d Array added as a argument

const darkness =() => {
    ctx.fillStyle = "Black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const path = new Image();
path.src = 'https://i.imgur.com/8HAkEms.png';

const walls = new Image();
walls.src = 'https://i.imgur.com/YclNGjT.png';

const renderMaze = (ctx, mazeArray, tileImage, tileImage2) => {
    const heroTileX = hero.x / 20;
    const heroTileY = hero.y / 20;

    for (let i = heroTileY - 1; i <= heroTileY + 1; i++) {
        for (let j = heroTileX - 1; j <= heroTileX + 1; j++) {
            if (i >= 0 && i < mazeArray.length && j >= 0 && j < mazeArray[0].length) {
                if (mazeArray[i][j] === 0) {
                    ctx.drawImage(tileImage, j * 20, i * 20, 20, 20);
                } else if (mazeArray[i][j] === 1) {
                    ctx.drawImage(tileImage2, j * 20, i * 20, 20, 20);
                }
            }
        }
    }
};


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



// FUNCTIONS*********

// // checks to see if a block is a 1 or 0 in the mapArray
function isValidMove(x, y) {
    const arrayX = x / 20
    const arrayY = y / 20
    if (mazeArray[arrayY] && mazeArray[arrayY][arrayX] === 0) {
        return true
    } else {
        return false
    }
}

// generates a random x and Y which we use to randomly spawn our objects

const randomX = () => {
    const randomMultiple = Math.floor(Math.random() * 63)
    return randomMultiple * 20
  }
  

const randomY = () => {
    const randomMultiple = Math.floor(Math.random() * 35)
    return randomMultiple * 20
}
 

// this creates a random spawn for the hero and the goal
let hero = new Crawler(20, 20, 20, 20, 'pink')

const createHero = () => {
    ctx.fillStyle = 'black'
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
    ctx.fillStyle = 'black'
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
    mobNames = [] //this is to clear the array of mobs before running again on replay
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



// On click starts timer + and decrements from the timeleft. then it checks for time less than 0
let timeLeft = 61
let timerId = ''
const timer = () => {
    timerId = setInterval(function(){
        timeLeft --
        clock.innerText = `You have ${timeLeft} seconds`
        if(timeLeft < 0) {
            deathScreen.style.zIndex = '3'
            clock.innerHTML = "You're dead"
            clearInterval(timerId)
            replayDead.disabled = false   
        }
    },1000)
}

//reset stuff for different screens. Its used to reset some of the UI when the game restarts

const reset = () => {
    clearInterval(timerId)
    timeLeft = 61
    timer()  
    //recalling all these renders make it so on click it clears all the old stuff off the map
    createMobs()
    darkness()
    createGoal()
    createHero()
    infoScreen.style.zIndex = "0"
    deathScreen.style.zIndex = "0"
    winScreen.style.zIndex = "0"
}

// buttons for title/win/lose screens

pButton.addEventListener('click', function(){
    info.style.zIndex = "3"
    setTimeout(() =>{
        info.style.zIndex = "0"
    }, 2000)
    pButton.disabled = true
    reset()
})

replayDead.addEventListener('click', function() {
    reset()
    replayDead.disabled = true
})

replayWin.addEventListener('click', function(){
    reset()
    replayWin.disabled = true
})


// Function needed for collision detection which is used in the handle Key press event function
const isColliding = (crawler1, crawler2) => {
    return crawler1.x === crawler2.x && crawler1.y === crawler2.y
}

// detects key strokes and moves the character if the move is valid. Part of this came from the lesson for canvas from GA instructor Bailey. Add function to check for a valid move based on the maze array

document.addEventListener('keydown', handleKeyPressEvent)

let battleUP = false

function handleKeyPressEvent(e) {
    const speed = 20;
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
        case "1":
            hide.click();
            break;
        case "2":
            run.click();
            break;
        case "3":
            fight.click();
            break;
    }

        // this function is needed to check to see for boundaries. Added a bolean to check for the battle slide so that you cantr move if the slide is up
    if (isValidMove(newX, newY) && battleUP === false)  {
            hero.x = newX
            hero.y = newY
            movement.innerText = `x: ${hero.x} y: ${hero.y}`
            ctx.fillStyle = "rgba(250, 250, 250, 0)"
            renderMaze(ctx, mazeArray, path, walls)
            hero.render()
        }

        // needed to repaint the goal since the map redraw drew over it
    if ((hero.x <= goal.x + 20 && hero.x >= goal.x -20) && (hero.y <= goal.y + 20 && hero.y >= goal.y - 20 )) {
        goal.render()
    }

        // moved the collision detection in here. it makes it so that the user can't run past an object
    if (isColliding(hero, goal)) {
            clearInterval(timerId)
            winScreen.style.zIndex = "3"
            clock.innerHTML = `Your score is ${timeLeft}`
         } else { for (let i = 0; i < mobNames.length; i++) {
                if (isColliding(hero, mobNames[i])) {
                    clearInterval(timerId)
                    clearBattle()
                    battle.style.zIndex = "3"
                    enableButtons()
                    battleUP = true
                    mobNames[i] = (10,10, 10,10, "black")
                }
            }
        }    
    }
// }

// MINIGAME


// functions for the minigame

const clearBattle = () => {
    battleUpdate.innerText = 'There is a creature in your path. What do you want to do?'
    battle.style.backgroundImage =  "url('https://i.imgur.com/0LYXRge.jpg')"
}

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

const moveInterval = (sentence, bgIMG) => {
    setTimeout(() => {
        battleUpdate.innerText = sentence
        battle.style.backgroundImage =  bgIMG
    }, 1500)
}

const yourDead = () => {
    setTimeout(() =>{
        battle.style.zIndex = '0'
        deathScreen.style.zIndex = '3'
        clock.innerHTML = "You're dead"
        clearInterval(timerId)
        battleUP = false
        replayDead.disabled = false
    }, 3200)
}

const survived = () => {
    setTimeout(()=>{
        battle.style.zIndex = '0'
        timer()
        battleUP = false
        replayWin.disabled = false
    }, 3200)
}

// User selector options for the minigame

run.addEventListener('click', function() {
    disableButtons()
    battleUpdate.innerText = "You decided run"
    computerChoice = Math.floor(Math.random() * 3) 
    if(computerChoice === 0) {
        moveInterval(runCaught, runCaughtBG)
        yourDead()
        } else { 
            moveInterval(runEscape, runEscapeBG)
            survived() 
    }

})

fight.addEventListener('click', function(){
    disableButtons()
    battleUpdate.innerText = "You pickup a rock to fight the creature"
    computerChoice = Math.floor(Math.random() * 2) 
    if(computerChoice === 0) {
        moveInterval(fightLost, fightLostBG)
        yourDead()
    } else {
        moveInterval(fightWin, fightWinBG)
        timeLeft += 5
        survived()
    }
})

hide.addEventListener('click', function(){
    disableButtons()
    battleUpdate.innerText = "You quickly hide"
    computerChoice = Math.floor(Math.random() * 4) 
    if(computerChoice === 0) {
        moveInterval(hideFound, hideFoundBG)
        yourDead()
    } else {
        moveInterval(hideHidden, hideHiddenBG)
        timeLeft -= 5
        survived()
    }

})