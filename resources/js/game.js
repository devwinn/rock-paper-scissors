// need to clean up game a bit.
// to do - change variable names for easier readability
// to do - check for bugs. clean up logging
// to do - remove all console logging

const choices = [
    'ROCK',
    'PAPER',
    'SCISSORS'
];

const startButton = document.getElementsByClassName('game-start');
const endButton = document.getElementsByClassName('game-end');
const roundButton = document.getElementById('round');
const score = document.getElementsByClassName('score');

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
let isPaused = false;

let computerWins = 0;
let playerWins = 0;

let choice = null;

// Start and end the game on click event
startButton[0].addEventListener('click', startGame);
endButton[0].addEventListener('click', endGame);
roundButton.addEventListener('click', nextRound)

function startGame() {
    isStarted = true;
    isPaused = false;
    console.log(`isStarted = ${isStarted}`)
    startButton[0].style.display = "none";
    endButton[0].style.display = "block";
    resultsText[0].style.display = "none";
    resultsText[1].style.display = "block";
    score[0].style.display = "block";
    score[1].style.display = "block";
}

// resets the game, colors schemes, win counts

//!!!!need to rework for additional elements when next round not selected
function endGame() {
    isStarted = false;
    isEnded = true;
    console.log(`isEnded = ${isEnded}`)
    endButton[0].style.display = "none";
    startButton[0].style.display = "block";
    roundButton.style.display = "none";
    resultsText[0].style.display = "block";
    resultsText[1].style.display = "none";
    score[0].style.display = "none";
    score[1].style.display = "none";
    for (let i = 0; i < selections.length; i++) {
        selections[i].style.backgroundColor = 'aliceblue';
    }
    if (resultsContainer.lastElementChild.innerHTML != 'Make a selection') {
        resultsContainer.removeChild(resultsContainer.lastElementChild);
    }
    if (score[0].children.length > 0) {
        score[0].removeChild(score[0].children[0]);
    }
    if (score[1].children.length > 0) {
        score[1].removeChild(score[1].children[0]);
    }
    document.body.style.backgroundColor = "lightslategrey";
    computerWins = 0;
    playerWins = 0;
}

function nextRound() {
    function checkWins() {
        if (computerWins == 3 || playerWins == 3) {
            return true;
        } else {
            return false;
        }
    }

    if (!checkWins()) {
        //!!remove console
        console.log("nextRound starting");
        isPaused = false;

        // reset selection background
        for (let i = 0; i < selections.length; i++) {
            selections[i].style.backgroundColor = 'aliceblue';
        }
        // reset displayed text to indicate next round
        if (resultsContainer.lastElementChild.innerHTML != 'Make a selection') {
            resultsContainer.removeChild(resultsContainer.lastElementChild);
        }

        roundButton.style.display = "none";

        startGame();
        
    } else {
        //!!remove console
        console.log("nextRound aborted game over");
        document.body.style.backgroundColor = "green";
        for (let i = 0; i < selections.length; i++) {
            selections[i].style.backgroundColor = 'gold';
        }
        let insert = document.createElement('h3');
        insert.innerHTML = "Game Over";
        resultsContainer.removeChild(resultsContainer.lastElementChild);
        resultsContainer.appendChild(insert);
        roundButton.style.display = "none";

    }

}

// game function is run when user makes a selection
function userPick(e) {
    if (isStarted == true && isPaused == false) {
        for (let i = 0; i < selections.length; i++) {
            if (selections[i].value == e.target.value) {
                e.target.style.backgroundColor = 'gold';
            } else {
                selections[i].style.backgroundColor = 'aliceblue';
            }
        }
        choice = e.target.value;
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

function addCompScore(wins) {
    let insert = document.createElement('h1');
    if (score[1].children.length > 0) {
        score[1].removeChild(score[1].children[0]);
        insert.innerHTML = `${wins}`;
        score[1].appendChild(insert);
    } else {
        insert.innerHTML = `${wins}`;
        score[1].appendChild(insert);
    }
}

function addPlayerScore(wins) {
    let insert = document.createElement('h1');
    if (score[0].children.length > 0) {
        score[0].removeChild(score[0].children[0]);
        insert.innerHTML = `${wins}`;
        score[0].appendChild(insert);
    } else {
        insert.innerHTML = `${wins}`;
        score[0].appendChild(insert);
    }
}


// playRound() executes one round of Rock, Paper, Scissors using the 
// User's and computer's choice.
// following execution the console will log the winner and 
// the selection of both user and computer.
function playRound(playerSelection, computerSelection) {
    resultsText[1].style.display = "none";

    if (playerSelection == computerSelection) {
        let insert = document.createElement('h3');
        insert.innerHTML = 'Tie!';
        resultsContainer.appendChild(insert);
        console.log("Tie!");
    } else if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        let insert = document.createElement('h3');
        insert.innerHTML = `You win this round! ${playerSelection} beats ${computerSelection}`;
        resultsContainer.appendChild(insert);
        console.log(`You win this round! Your ${playerSelection} beats computer's ${computerSelection}`);
        playerWins++;
        addPlayerScore(playerWins);
    } else {
        let insert = document.createElement('h3');
        insert.innerHTML = `You lost this round :( Computer's ${computerSelection} beats ${playerSelection}`;
        resultsContainer.appendChild(insert);
        console.log(`You lost this round :( ${computerSelection} beats your${playerSelection}`);
        computerWins++;
        addCompScore(computerWins);
    }
    // reset selection shadow
    for (let i = 0; i < selections.length; i++) {
        if (selections[i].value == playerSelection) {
            selections[i].style.boxShadow = '0 10px 10px rosybrown';
        }
    }
    roundButton.style.display = "block";
    isPaused = true;
    choice = null;
}


// needs updating going to nest game in user selection
function game() {
    gameOver = false;

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