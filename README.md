# Maize Runner
------------------------------------------------------------------------
## WHERE AM I??? 

It was a crazy night. You had way too much to drink. You wake not knowing where you are. All you know is that this place is dark and all you have is a note. You read the note and it says. 

"Welcome to my game. Its a game of life or death. If you win, you live.  If you lose, you die. All you have to do to win is find the exit. Be careful... I left you some surprises. Hurry now, the clock is ticking."

------------------------------------------------------------------------
## Synopsis

Maize Runner is a thrilling game where your mission is to locate the exit before time runs out. Just beat the clock and find your way to freedom. But watch out—there are traps scattered throughout. Accidentally triggering a trap will cost you precious time, and if the clock hits zero, it's game over. So, stay sharp and make every second count!

## Wireframe

![Imgur](https://i.imgur.com/k9IzCpR.png)

------------------------------------------------------------------------
## Tech Requirments

* JS Canvas
* DOM Manipulation
------------------------------------------------------------------------
## MVP

* Create a start screen with content text and instructions on how to play
* Add a start button to the start screen that loads the map
* Use a 2d array to create a maze in canvas
* Create a player block that can move freely within the maze
* Add a winning tile where the user wins when they reach the tile
* Add a timer with functionality to end the game
* Add a screen for game over with play again button
* Add a screen for completing the challeng with a play again button

-------------------------------------------------------------------------
## Stretch Goals

* Make it so the user can only see the tiles surrounding the user (darkness)
* Add traps to deduct time
* Add imagages so the player and map are not boxes 

## Super Stretch Goals

* Make traps into monsters and add a rock paper scissors game
* Add health to player and monsters

--------------------------------------------------------------------------
## Potential roadblocks

* Learning how to make a maze with a 2D array
* learning how to load the map when the player presses start

--------------------------------------------------------------------------
## Approach

The approach taken was to use a combination of HTML DOM manipulation and Canvas. 

- Map rendering was done with a nested for loop using a 2D array
- An Object prototype used to create crawler objects was created
- Movement was done with event listeners that listened for key presses
- And minigame was done with simple HTML z-indexs which sent screens infront of or behind the canvas
- Most of the logic centered around Keypress's instead of an ingame loop. This is because instead of checking for states every loop, the nessesary checks were done according to keypresses

---------------------------------------------------------------------------
## Post Project Thoughts

* Some things I thought would be hard were actuiallt pretty simple. While others were very hard because there were no examples that were easily found on the web
* Once the major pieces and functions were done the rest of the bells and whistles were quick and easy.
* Next time its probably best to start in this order bones > creation hard functions that are nessesary components > bells and whistles.
* One thing i'll have to really look at next time is the issue with objects psawning on top of each other. But its not a issue for now.

---------------------------------------------------------------------------
## Citations

* The basic parts of the movement function "handleKeyPressEvent(e)" came from General Assembly SEI instructor Weston Bailey in a lesson he gave on canvas.
* The object prototype for "Crawlers" also game from General Assembly SEI instructor Weston Bailey in a lesson he gave on canvas.
* The idea for the loops used to create the map came from this article https://bytefish.medium.com/how-to-render-a-maze-in-canvas-9aeb0fdc0514, author named as bytefish 
* music and sfx came from tunetank.com and freesound.com




