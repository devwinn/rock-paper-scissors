const choices = [
    'ROCK',
    'PAPER',
    'SCISSORS'
];

let computerWins = 0;
let playerWins = 0;

//setTimeout(game, 10000);

//getcomputerChoice() results in the random choice to be made by computer.
function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    console.log(`Computer choice: ${choices[randomIndex]}`);
    return choices[randomIndex];
}


//userPlay() results in a prompt that asks for user's choice.
function getUserChoice() {

    let isValid = false;
    let userChoice;
    while (!isValid) {
        let input = prompt("Rock, Paper, or Scissors?").toUpperCase();
        if (input == 'ROCK' || input == 'PAPER' || input == 'SCISSORS') {
            isValid = true;
            userChoice = input;
        } else {
            alert("Invalid selection. Please try again.");
        }
    }
    console.log(`Player choice: ${userChoice}`);
    return userChoice;
}

// playRound() executes one round of Rock, Paper, Scissors using the User's and computer's choice.
// following execution the console will log the winner and the selection of both user and computer.
function playRound(playerSelection, computerSelection) {

    if (playerSelection == computerSelection) {
        alert("Tie!");
        console.log("Tie!");
    } else if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        alert(`You win this round! ${playerSelection} beats ${computerSelection}`);
        console.log(`You win this round! ${playerSelection} beats ${computerSelection}`);
        playerWins++;
    } else {
        alert(`You lost this round :( ${computerSelection} beats ${playerSelection}`);
        console.log(`You lost this round :( ${computerSelection} beats ${playerSelection}`);
        computerWins++;
    }
}

function game() {
    let gameOver = false;
    alert("Rock, Paper, Scissors.. let the games begin!");
    console.log("Game starting...\n Best of 5");

    while (!gameOver) {
        if (computerWins == 3 || playerWins == 3) {
            gameOver = true;
            break;
        } else {
            let player = getUserChoice();
            let computer = getComputerChoice();
            playRound(player, computer);
        }
    }
    if (playerWins > computerWins) {
        alert("You won the game!")
        console.log("You won the game!");
        console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
    } else {
        alert("You lost the game!");
        console.log("You lost the game!");
        console.log(`Player wins: ${playerWins} -- Computer wins: ${computerWins}`);
    }

    //reset wins to play again
    computerWins = 0;
    playerWins = 0;

}