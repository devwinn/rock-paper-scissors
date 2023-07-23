// need to clean up game a bit.
// to do - add next round button. make front end nicer. 
// to do - change variable names for easier readability
// to do - check for bugs. clean up logging

const choices = [
    'ROCK',
    'PAPER',
    'SCISSORS'
];

const startButton = document.getElementsByClassName('game-start');
const endButton = document.getElementsByClassName('game-end');

const resultsContainer = document.getElementById('game-results');
const selectionContainer = document.getElementById('selection-container');
const resultsText = document.getElementsByClassName('results');
const rockSelect = document.getElementById('rock');
const paperSelect = document.getElementById('paper');
const scissorSelect = document.getElementById('scissors');
const selections = Array.from(document.querySelectorAll('.pick-selection'));

selections.forEach(selection => selection.addEventListener('click', userPick));

let isStarted = false;
let isEnded = true;

let computerWins = 0;
let playerWins = 0;

let choice = null;

// Start and end the game on click event
startButton[0].addEventListener('click', startGame);
endButton[0].addEventListener('click', endGame);

function startGame() {
    isStarted = true;
    console.log(`isStarted = ${isStarted}`)
    startButton[0].style.display = "none";
    endButton[0].style.display = "block";
    resultsText[0].style.display = "none";
    resultsText[1].style.display = "block";
}

// resets the game, colors schemes, win counts
function endGame() {
    isStarted = false;
    isEnded = true;
    console.log(`isEnded = ${isEnded}`)
    endButton[0].style.display = "none";
    startButton[0].style.display = "block";
    resultsText[0].style.display = "block";
    resultsText[1].style.display = "none";
    for (let i = 0; i < selections.length; i++) {
        selections[i].style.backgroundColor = 'aliceblue';
    }
    resultsContainer.removeChild(resultsContainer.lastElementChild);
    computerWins = 0;
    playerWins = 0;
}

// game function is run when user makes a selection
function userPick(e) {
    if (isStarted == true) {
        for (let i = 0; i < selections.length; i++) {
            if (selections[i].value == e.target.value) {
                e.target.style.backgroundColor = 'gold';
            } else {
                selections[i].style.backgroundColor = 'aliceblue';
            }
        }
        choice = e.target.value;
        console.log(choice);
        game();
    }
}


// getcomputerChoice() results in the random choice to be made by computer.
function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    console.log(`Computer choice: ${choices[randomIndex]}`);
    return choices[randomIndex];
}

//  getter for user choice
function getUserChoice() {
    console.log(`Player choice: ${choice}`);
    return choice;
}


// reworking will need to change some things with the html and make sure logic works
// if nesting game in userselection function
// playRound() executes one round of Rock, Paper, Scissors using the 
// User's and computer's choice.
// following execution the console will log the winner and 
// the selection of both user and computer. need to make logging more verbose
function playRound(playerSelection, computerSelection) {
    resultsText[1].style.display = "none";

    if (playerSelection == computerSelection) {
        let chooseHtml = document.createElement('h3');
        chooseHtml.innerHTML = 'Tie!';
        resultsContainer.appendChild(chooseHtml);
        console.log("Tie!");
    } else if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        let chooseHtml = document.createElement('h3');
        chooseHtml.innerHTML = `You win this round! ${playerSelection} beats ${computerSelection}`;
        resultsContainer.appendChild(chooseHtml);
        console.log(`You win this round! ${playerSelection} beats ${computerSelection}`);
        playerWins++;
    } else {
        let chooseHtml = document.createElement('h3');
        chooseHtml.innerHTML = `You lost this round :( ${computerSelection} beats ${playerSelection}`;
        resultsContainer.appendChild(chooseHtml);
        console.log(`You lost this round :( ${computerSelection} beats ${playerSelection}`);
        computerWins++;
    }
    // reset choice background
    for (let i = 0; i < selections.length; i++) {
        if (selections[i].value == playerSelection) {
            selections[i].style.boxShadow = '0 10px 10px rosybrown';
        }
    }
    choice = null;
}


// needs updating going to nest game in user selection
function game() {
    gameOver = false;
    console.log("Game starting...\n Best of 5");

    if (!gameOver) {
        if (computerWins == 3 || playerWins == 3) {
            gameOver = true;
            if (playerWins > computerWins) {
                alert("You won the game!")
                console.log("You won the game!");
                console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
            } else {
                alert("You lost the game!");
                console.log("You lost the game!");
                console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
            } if (playerWins > computerWins) {
                alert("You won the game!")
                console.log("You won the game!");
                console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
            } else {
                alert("You lost the game!");
                console.log("You lost the game!");
                console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
            }
        } else {
            console.log(`p wins ${playerWins} || cwins ${computerWins}`);
            let computer = getComputerChoice();
            let player = getUserChoice();
            playRound(player, computer);
        }
    }



}