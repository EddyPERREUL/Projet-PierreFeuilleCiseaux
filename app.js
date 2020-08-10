const game = () => {
  let pScore = 0;
  let cScore = 0;
  const upsound = document.getElementById("upsound")
  const downsound = document.getElementById("downsound")
 

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["pierre", "feuille", "ciseaux"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    //le premier arrivé à 3 gagne
    if (pScore === 3 && cScore < pScore ) 
      {        
       return (upsound.play(), 
        alert ("Victoire du joueur!"),
        location.reload(true))          
        }else if(cScore === 3 && cScore > pScore )      
      {
        
        return (downsound.play(),
          alert ("victoire de l'ordi!"),
          location.reload(true))
      }
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Egalité";
      return;
    }
    //Check for Rock
    if (playerChoice === "pierre") {
      if (computerChoice === "ciseaux") {
        winner.textContent = "Joueur gagne";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Ordi gagne";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "feuille") {
      if (computerChoice === "ciseaux") {
        winner.textContent = "Ordi gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Joueur gagne";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "ciseaux") {
      if (computerChoice === "pierre") {
        winner.textContent = "Ordi gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Joueur gagne";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
