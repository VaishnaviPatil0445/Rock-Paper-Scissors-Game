var userScore=0;
var compScore=0;
const maxScore = 10; // Set the maximum score to win the game (first to reach this wins)

let msg = document.querySelector("#msg");

let UScore= document.querySelector("#user-score");
let CScore= document.querySelector("#comp-score");


const choices=document.querySelectorAll(".ch");

 //generate comp choice
const genCompChoice=() => {
    const arr=["rock" , "paper" , "scissors"];
    const r = Math.floor(Math.random()*arr.length);
    return arr[r];
};

const drawGame=() => {
    console.log("Game was Draw");
    msg.innerHTML="Game was Draw. Play Again.";
    
};

const showWinner = (userWin,userCh,compCh) => {
    if(userWin == true) {
        console.log("You Win!");
        userScore++;
        UScore.innerHTML = userScore;
        msg.innerHTML=`You Win! Your ${userCh} beats ${compCh}`;
        msg.style.backgroundColor="Green";
    } else  {
        console.log("You Lose.");
        compScore++;
        CScore.innerHTML = compScore;
        msg.innerHTML=`You Lose. Computer ${compCh} beats ${userCh}`;
        msg.style.backgroundColor="Red";
    }

    // Check if maximum score reached
    if (userScore >= maxScore || compScore >= maxScore) {
        setTimeout(() => {
            if (userScore > compScore) {
                msg.innerHTML = `Game Over! You won with a score of ${userScore}-${compScore}. Click any choice to play again.`;
                msg.style.backgroundColor = "blue";
            } else if (compScore > userScore) {
                msg.innerHTML = `Game Over! Computer won with a score of ${compScore}-${userScore}. Click any choice to play again.`;
                msg.style.backgroundColor = "blue";
            } else {
                msg.innerHTML = `Game Over! It's a tie with a score of ${userScore}-${compScore}. Click any choice to play again.`;
                msg.style.backgroundColor = "blue";
            }
        }, 100); // Small delay to ensure the last result is shown
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    UScore.innerHTML = userScore;
    CScore.innerHTML = compScore;
    msg.innerHTML = "Play Your Move";
    msg.style.backgroundColor = "#333";
};

const playGame= (userCh) => {
    // Check if game is over and needs to be reset
    const currentMsg = msg.innerHTML;
    if (currentMsg.includes("Game Over!")) {
        resetGame();
        // Still allow the current move to be played
    }

    console.log("Choice was clicked",userCh);
    const compCh= genCompChoice();
    console.log("Choice was clicked",compCh);

    if(userCh == compCh) {
        drawGame();
    } else {
      let userWin=true;
    if(userCh == "rock") {
        //paper scissor
        userWin=(compCh == "paper") ? false : true;
    }
    else if(userCh == "paper") {
        //rock scissor
        userWin=(compCh == "scissors") ? false : true;
    }
    else {
        //rock paper
        userWin=(compCh == "rock") ? false : true;
    }
    showWinner(userWin,userCh,compCh);
}
};

choices.forEach((ch) =>  {
    ch.addEventListener("click",() =>{
        const userCh=ch.getAttribute("id");
        playGame(userCh);
    })
})