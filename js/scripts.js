// selectors
const clock = document.querySelector('#clock')
const infoScreen = document.querySelector('#infoScreen')
const info =document.querySelector('#info')
const winScreen = document.querySelector('#survivor')
const deathScreen = document.querySelector('#deathScreen') 
const pButton = document.querySelector('#pButton')
const replayWin = document.querySelector('#replaywin')
const replayDead = document.querySelector('#replayDead')
const start = document.querySelector('#start')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")
const battle = document.querySelector('#battle')
const difficultySelector = document.querySelector('#difficultySelector')
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

// this resets the audio tracks to start from the beginning

const resetAudio = (music) => {
    music.pause()
    music.currentTime = 0
}

// render map function, this generates the maze according to the 2d Array added as a argument

const darkness =() => {
    ctx.fillStyle = "Black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}


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
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        
    }
    
    render(ctx,img) {
        ctx.drawImage(img,this.x, this.y, this.width, this.height)
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
let hero = new Crawler(20, 20, 20, 20)

const createHero = () => {
    hero = ''
    let x = randomX()
    let y = randomY()
    if(isValidMove(x,y)) {
        hero = new Crawler(x,y, 20, 20)
        hero.render(ctx,heroStartIMG)
    } else {
        createHero()
    }
       
}

let goal = new Crawler(1240, 20, 20, 20)

const createGoal =() => {
    goal = ''
    let x = randomX()
    let y = randomY()
    if(isValidMove(x,y) && x !== hero.x && y !== hero.y) {   
        goal = new Crawler(x,y, 20, 20)
        goal.render(ctx, goalIMG)
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
            let newMob = new Crawler(x, y, 20, 20)
            newMob.render(ctx, mobIMG)
            mobNames.push(newMob)
            numberOfMobs++
        }
    }
}

const createPowerUps = () => {
    let numberOfPowerUps = 0
    powerUps = [] //this is to clear the array of mobs before running again on replay
    while (numberOfPowerUps < 15) {
        let x = randomX()
        let y = randomY()

        if (isValidMove(x, y) && x !== hero.x && y !== hero.y && x !== goal.x && y !== goal.y) {
            let newPowerUp = new Crawler(x, y, 20, 20)
            newPowerUp.render(ctx, powerUpIMG)
            powerUps.push(newPowerUp)
            numberOfPowerUps++
        }
    }
}



// On click starts timer + and decrements from the timeleft. then it checks for time less than 0. There is some styling added to this function to add effect for the game and to disable and enable some buttons/selectors/start and stop music/ etc

let timeLeft = 61
let timerId = ''
const timer = () => {
    timerId = setInterval(function(){
        timeLeft --
        clock.style.backgroundColor = 'white'
        resetAudio(tiktok)
        clock.innerText = `You have ${timeLeft} seconds`
        if(timeLeft < 0) {
            laughSFX.play()
            fadeIN(deathScreen)
            clock.innerHTML = "You ran out of time"
            clearInterval(timerId)
            replayDead.disabled = false
            difficultySelector.disabled = false   
        } else if (timeLeft < 10) {
            clock.style.backgroundColor = 'red'
            tiktok.play()
        }
    },1000)
}

//reset stuff for different screens. Its used to reset some of the UI when the game restarts

const reset = () => {
    clearInterval(timerId)
    timeLeft = 61
    timer()  
    //recalling all these functions make it so on click it clears all the old stuff off the map. the rendering order is different depending on difficulty

    if(difficultySelector.value === "easy") {
    createMobs()
    createPowerUps()
    darkness()
    createGoal()
    createHero()
    } else if (difficultySelector.value ==="medium") {
    createMobs()
    createPowerUps()
    darkness()
    createGoal()
    createHero()
    } else if (difficultySelector.value ==="hard") {
    createMobs()
    createPowerUps()
    createGoal()
    darkness()
    createHero()
    }

    resetAudio(themeMusic)
    resetAudio(escapeMusic)
    themeMusic.play()
    fadeOut(infoScreen)
    fadeOut(deathScreen)
    fadeOut(winScreen)
    difficultySelector.disabled = true
}

// buttons for title/win/lose screens

pButton.addEventListener('click', function(){
    escapeMusic.play()
    fadeIN(info)
    fadeOut(infoScreen)
    pButton.disabled = true
})

start.addEventListener("click", function(){
    fadeOut(info)
    start.disabled = true
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
    let prevX = hero.x
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

        // this function is needed to check to see for boundaries. Added a bolean to check for the battle slide so that you cant move if the slide is up
    if (isValidMove(newX, newY) && battleUP === false)  {
        hero.x = newX
        hero.y = newY
        ctx.fillStyle = "rgba(250, 250, 250, 0)"

        //this part renders objects based on difficulty setting
        if(difficultySelector.value === "medium") {
            ctx.fillStyle = 'black'
            ctx.fillRect(goal.x, goal.y, 20, 20)
        } else if (difficultySelector.value ==="hard") {
            darkness()
        }

        //renders the maze according to the hero X and Y 

        renderMaze(ctx, mazeArray, path, walls)

        //renders the hero based on direction 

        if (prevX < newX) {
        hero.render(ctx, heroIMG)
        } else if (prevX > newX) {
            hero.render(ctx, heroIMGLeft)
        } else {
            hero.render(ctx, heroIMGDown)
        }
        
        }

        // needed to repaint the goal since the map redraw drew over it
    if ((hero.x <= goal.x + 20 && hero.x >= goal.x -20) && (hero.y <= goal.y + 20 && hero.y >= goal.y - 20 )) {
        goal.render(ctx, goalIMG)
    }
    
    //  repaints the goal and power ups when the hero is within 1 block
    for (let i = 0 ; i < mobNames.length ; i++) {
        if ((hero.x <= mobNames[i].x + 20 && hero.x >= mobNames[i].x -20) && (hero.y <= mobNames[i].y + 20 && hero.y >= mobNames[i].y - 20 )) {
        mobNames[i].render(ctx, mobIMG)
        }
    }

    for (let i = 0 ; i < powerUps.length ; i++) {
        if ((hero.x <= powerUps[i].x + 20 && hero.x >= powerUps[i].x -20) && (hero.y <= powerUps[i].y + 20 && hero.y >= powerUps[i].y - 20 )) {
        powerUps[i].render(ctx, powerUpIMG)
        }
    }
        // checks to see if a power up and the hero are occupying the same space
    
    for (let i = 0 ; i < powerUps.length ; i++ ) {
        if(isColliding(hero, powerUps[i])) {
            clock.innerText = "+10 seconds"
            timeLeft += 10
            powerUps[i] = (10,10, 10,10, "black")
        }
    }

        // moved the collision detection in here. it makes it so that the user can't run past an object. For the hero coliding with the goal or another crawler I needed to add game functions and triggers here so that the settings of the game would function correctly based on the scenarios
    if (isColliding(hero, goal)) {
            resetAudio(themeMusic)
            surviveBattleSFX.play()
            escapeMusic.play()
            clearInterval(timerId)
            replayWin.disabled = false
            fadeIN(winScreen)
            clock.innerHTML = `Your score is ${timeLeft}`
            difficultySelector.disabled = false
         } else { for (let i = 0; i < mobNames.length; i++) {
                if (isColliding(hero, mobNames[i])) {
                    clearInterval(timerId)
                    clearBattle()
                    fadeIN(battle)
                    resetAudio(themeMusic)
                    minigameMusic.play()
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

const fadeIN = (slide) => {
    slide.style.zIndex = '3'
    slide.style.transition = "opacity 1s ease-in";
    slide.style.opacity = '1';

}

const fadeOut = (slide) => {
    slide.style.transition = "opacity 1s ease-out";
    slide.style.opacity = '0';
    setTimeout(() =>{ 
        slide.style.zIndex = '0'
    },1000)
    
}

const clearBattle = () => {
    battleUpdate.innerText = 'There is something in your way. What do you do?'
    battle.style.backgroundImage =  "url('https://i.imgur.com/KrcbJ3h.jpg')"
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
    resetAudio(minigameMusic)
    laughSFX.play()
    difficultySelector.disabled = false
    setTimeout(() =>{
        darkness()
        fadeOut(battle)
        themeMusic.play()
        fadeIN(deathScreen)
        clock.innerHTML = "You're dead"
        clearInterval(timerId)
        battleUP = false
        replayDead.disabled = false
    }, 4000)
}


const survived = () => { 
    resetAudio(minigameMusic)
    surviveBattleSFX.play()
    setTimeout(()=>{
        fadeOut(battle)
        themeMusic.play()
        timer()
        battleUP = false
        replayWin.disabled = true
    }, 4000)
}


// User selector options for the minigame

run.addEventListener('click', function() {
    disableButtons()
    battleUpdate.innerText = "You think you can out run it."
    setTimeout(() => {
    computerChoice = Math.floor(Math.random() * 3) 
    if(computerChoice === 0) {
        moveInterval(runCaught, runCaughtBG)
        yourDead()
        } else { 
            moveInterval(runEscape, runEscapeBG)
            survived() 
    }
}, 1500)
})

fight.addEventListener('click', function(){
    disableButtons()
    battleUpdate.innerText = "You're not scared, so you decide to fight."
    setTimeout(() => {
    computerChoice = Math.floor(Math.random() * 2) 
    if(computerChoice === 0) {
        moveInterval(fightLost, fightLostBG)
        yourDead()
    } else {
        moveInterval(fightWin, fightWinBG)
        timeLeft += 5
        survived()
    }
}, 1500)
})

hide.addEventListener('click', function(){
    disableButtons()
    battleUpdate.innerText = "You dont think you can defeat our outrun it, so you quickly hide."
    setTimeout(() => {
    computerChoice = Math.floor(Math.random() * 4) 
    if(computerChoice === 0) {
        moveInterval(hideFound, hideFoundBG)
        yourDead()
    } else {
        moveInterval(hideHidden, hideHiddenBG)
        timeLeft -= 5
        survived()
    }
}, 1500)
})