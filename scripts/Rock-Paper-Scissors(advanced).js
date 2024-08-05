let result = ''
let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins : 0,
  tie : 0,
  lose: 0
};

  updateScore();

function pickCompMove(){
  const randomNumber = Math.random();
  let compMove = '';

  if(randomNumber < 1/3){
  compMove = 'rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3){
    compMove = 'paper';
  }
  else{compMove = 'scissors';}
  return compMove;
}

function displayResult(playerMove){
  let compMove = pickCompMove();
  if(playerMove === 'scissors'){
    if(compMove === 'rock'){
    result = 'You lose.';
    }
    else if(compMove === 'paper'){
      result = 'You won!';
    }
    else{ result = 'Tie.'}
  }

  else if(playerMove === 'rock'){
    if(compMove === 'rock'){
    result = 'Tie.';
    }
    else if(compMove === 'paper'){
      result = 'You lose.';
    }
    else{ result = 'You won!'}
  }

  else{
    if(compMove === 'rock'){
    result = 'You won!';
    }
    else if(compMove === 'paper'){
      result = 'Tie.';
    }
    else{ result = 'You lose.'}
  }
  // updating the score
  if(result === 'You won!'){
    score.wins += 1;
  }
  else if(result ==='Tie.'){
    score.tie += 1;
  }
  else score.lose += 1;

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();
  document.querySelector('.js-result')
    .innerHTML = result;
  document.querySelector('.js-moves')
    .innerHTML = `    You
<img src="./Images/${playerMove}-emoji.png" alt="">
<img src="./Images/${compMove}-emoji.png" alt="">
Computer`;

}
function updateScore(){
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins} loses: ${score.lose} tie: ${score.tie}`;   
}

let isAutoPlaying = false;
let setIntervalID;
// const autoPlay = () =>{

// }
function autoPlay(){
  const autoPlayText = document.querySelector('.js-auto-play-button');
  if(!isAutoPlaying){
    setIntervalID = setInterval(()=>{
      const playerMove = pickCompMove();
      displayResult(playerMove);
    }, 1000)
    autoPlayText.innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  }
  else{  
    autoPlayText.innerHTML = 'Auto Play';
    clearInterval(setIntervalID);
    isAutoPlaying = false;
  }
}

function resetScore(){
  score.wins = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScore();
}

function resetScoreConfirmation(){
  let confirmationMessage = document.querySelector('.js-reset-score-confirmation-message');
  confirmationMessage.innerHTML = `Are you sure you want to reset the score?
  <button class = "js-reset-score-confirmation-yes reset-score-confirmation-yes">Yes</button>
  <button class = "js-reset-score-confirmation-no
  reset-score-confirmation-no">No</button>
  `
  document.querySelector('.js-reset-score-confirmation-yes').addEventListener('click', ()=>{
    confirmationMessage.innerHTML = '';
    resetScore()
  }
  );

  document.querySelector('.js-reset-score-confirmation-no').addEventListener('click', ()=>confirmationMessage.innerHTML = '');
}

document.querySelector('.js-rock-button').addEventListener('click', ()=> displayResult('rock'));

document.querySelector('.js-paper-button').addEventListener('click', ()=> displayResult('paper'));

document.querySelector('.js-scissors-button').addEventListener('click', ()=> displayResult('scissors'));

document.querySelector('.js-auto-play-button').addEventListener('click', ()=>autoPlay());

document.querySelector('.js-reset-score-button').addEventListener('click', ()=>{
  resetScoreConfirmation();
});

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    displayResult('rock');
  }
  else if(event.key === 's'){
    displayResult('scissors');
  }
  else if(event.key === 'p'){
    displayResult('paper');
  }
  else if(event.key === 'a'){
    autoPlay();
  }
  else if(event.key === 'Backspace'){
    resetScoreConfirmation();
  }
});

