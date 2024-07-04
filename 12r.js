let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;//here we declared this variavle outside the scope so that it doesnt resets every time as a new variable whenever we run the function ,and the setInterval remains saved

//const autoPlay = () => {

//};
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);//stops an interval
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {//if we had written directly the function playgame  that would have runned the function which gave undefined, and in return the eventlistener would be getting that undefined, so thats why we need to create a fn to run this func.
        playGame('scissors');
    });
let timer;//we needed to declare this timer outside since the timeout timer is already running so it should be updates outside the scope, so when we click the button , we can clear the timer .
document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        clearTimeout(timer);
        let resetButton =  document.querySelector('.reset-confirmation')
        resetButton.innerHTML = `<span>Are you sure you want to reset the score?</span>
        <button class= "yes-button">Yes</button><button class = "no-button">No</button>
        `;      
        resetButton.classList.add('reset-css');
        const yes = document.querySelector('.yes-button');
        yes.addEventListener('click', () => {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
            resetButton.innerHTML = '';
            resetButton.classList.remove('reset-css');
        });
        const no = document.querySelector('.no-button');
        no.addEventListener('click', () => {
            resetButton.innerHTML = '';
            resetButton.classList.remove('reset-css');
        });
        timer = setTimeout(() => {
            resetButton.innerHTML = '';      
            resetButton.classList.remove('reset-css');
        }, 5000);
    })

document.querySelector('.auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    })

document.body.addEventListener('keydown', (event) => {//since we wont we using keyboard to anything specific
    //in onkeydown it provides the object event (which means which key was pressed) , whereas , here the event is provided through parameter in function 
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}