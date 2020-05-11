# Tic - Tak - Toe

Tic-Tak-Toe-Inception web game
Tic Tac Toe is traditionally played on a 3 × 3 grid. Players take turns placing a mark in one of the cells of the grid. The goal of the game is for players to position their marks so that they make a continuous line of three cells vertically, horizontally, or diagonally.
Basically this game two players game, player 1 against another player or computer.
# Demo 
A live demo version can be found [here](https://abdullahalharun-code.github.io/Interactive-frontend-development/)
![alt text](https://i.ibb.co/j58Ry0t/multi-device-image.png "Demo")



## UX
Simplicity is often referred to as one of the fundamental principles of UX design. I try to make this website as clear as possible to the user can easily understand to use it. Although it is a game site, be simple layout with the main focus on this. to understand simple game rule instruction can easily play the game.

## User stories
#### Playing a Single Player Game Against a Random Computer
* Given I start the game
* And I am prompted with a move
* When I select a move
* Then it will place my marker (X) on the board
---

* Given I have made a move
* When my turn is over
* Then the computer will have a random move placed on the board with its marker (O)
---
* Given a player makes a move
* And the move results in three consecutive spaces
* Then the game is over
---
* Given a player makes a move
* And the move is the last empty spot on the board
* Then the game is over
---
* Each game if the player 1 play first and computer was second, next game computer will be play first and player will be second

#### Playing a Two Player Game

* Given I start the game
* And I am prompted with a move
* When I select a move
* Then it will place my marker (X) on the board
---
* Given I have made a move
* When the second player is prompted for a move
* Then she will select a move
* And her marker (O) will be placed on the board
---
* Given a player makes a move
* And the move results in three consecutive spaces
* Then the game is over
---
* Given a player makes a move
* And the move is the last empty spot on the board
* Then the game is over
---
* Each game if the player 1 play first and player 2 was second, next game player 2 will be play first and player 1 will be second

## Strategy
If you know what you are doing, you can't lose at Tic-Tac-Toe. If your opponent knows what they are doing, you can't win at Tic-Tac-Toe. The game is a zero sum game. If both players are playing with an optimal strategy, every game will end in a tie.

####  Players
There are four player types in Tic-Tac-Toe.
* The Novice player makes random moves
* The Intermediate player will blocks their opponent from winning
* The Experienced player knows that playing in certain first squares will lose the game
* The Expert player will never lose

## Scope
This is a single-player or tow player strategy game on the web browser. The player will
progress through levels which require precise manipulation of the environment, though the game
Encourages creativity and daring via branching pathways. The episodic structure of the game
facilitates the pace of the story. I demonstrate the action flow between inputs, script, display
(output).


## Structure
The project planning stage requires several inputs, including conceptual proposals, project schedules. The development of this
project is not successfully done without proper planning and scheduling. Project planning and
scheduling is very important stage for us.

## Rules

* The game is played on a grid that's 3 squares by 3 squares.
* You are X, your friend (or the computer in this case) is O.
* The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.
* When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
* To win you must get 3 squares in a row on the big board


## WIN, LOSE & TIE

Before any player wins.

* If the player fulfils the winning condition then it wins the game.
* If any player fulfils the winning condition then it ties the game.
* Win and Lose is indicated by numbers at the bottom area.


## Mockups

I have used Figma Mockups to visualize images I can work from.
* [Desktop Home](https://i.ibb.co/KFzfYgx/figma.png)  - [Tablet Home](https://i.ibb.co/KFzfYgx/figma.png) - [Mobile Home](https://i.ibb.co/KFzfYgx/figma.png)

## Technologies
* Html
* Css
* Bootstrap
* Javascript
* Jquery
## Features

* Single Player
* Two Player
* Background Music

## Testing
This site was tested across multiple screen sizes on Chrome, Safari and Internet Explorer. To ensure compatibility and responsiveness it's also tested on any browser. When the webpage is visited on larger screens the controll or player mode, reset and music controll will be shown on the top area with button, but game information/rule top right corner of the site. Each game result and game state information will be shown on the bottom. Samething happen on samller screren as well but all element are flow left respectively.

* The responsive is run and tested at:
- [http://ami.responsivedesign.is/#](http://ami.responsivedesign.is/#)
* The HTML code is run and tested at:
- [https://validator.w3.org/#validate_by_input](https://validator.w3.org/#validate_by_input)
* The CSS code is run and tested at:
- [https://jigsaw.w3.org/css-validator/#validate_by_input](https://jigsaw.w3.org/css-validator/#validate_by_input)
* The JavaScript is run and tested at:
- [https://jshint.com/](https://jshint.com/)

## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. For the site to deploy correctly on GitHub pages, the landing page must be named index.html.

To run locally, you can clone this repository directly into the editor of your choice by entering git clone [https://github.com/AbdullahAlHarun-code/Interactive-frontend-development.git](https://github.com/AbdullahAlHarun-code/Interactive-frontend-development.git) into your terminal. To cut ties with this GitHub repository, type git remote rm origin into the terminal.

When the code is downloaded as a .zip it can be unzipped and runned by opening the unzipped folder and then execute index.html The code will be executed in the browser that is set as main browser, this can be Chrome or one of the other available browsers. When executed the main screen will be shown and the options can be chosen.


## Credits
Media
* The photos used in this site were obtained from:
- [https://imgbb.com/](https://imgbb.com/)
Acknowledgements
* Inspiration for this project was obtained from:
- [https://www.exploratorium.edu/brain_explorer/tictactoe.html](https://www.exploratorium.edu/brain_explorer/tictactoe.html)


## Its fun to play it!