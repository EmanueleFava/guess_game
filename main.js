// ---------------------------------------------------------------------------------------
// CLASS

class GuessGame {
  constructor() {
    this.word = null; // parola aggiunta per cominciare il gioco
    this.splittedWord = null; // lettere splittate in un array
    this.letter = null; // lettera pensata dall'utente
    this.letterIndex = null; // nel caso si trovasse la lettera, index di splittedWord
    this.userWord = null; // parola che piano piano si compone in base ai guess
    this.userLetters = [];
    this.attempts = 5; // tentativi
  }

  startGame(word) {
    this.word = word.toLowerCase();
    console.log(this.userWord);
    this.splittedWord = this.word.split("");
    this.userWord = this.splittedWord.map((element) => {
      if (element) {
        return "-";
      }
    });

    console.log(this.word);
    console.log(this.splittedWord);
    console.log(this.userWord);
  }

  resetAttempts() {
    let restart = null;
    if (this.attempts === 0) {
      console.log("Tentativi Finiti! Hai perso!");
      alert(`Tentativi Finiti! Hai perso!`);
      console.log("Vuoi ricominciare?");
      if (restart === "yes") {
        this.attempts = 5;
      } else {
        console.log("Game over");
      }
    }
  }
  resetGame() {
    this.word = null;
    this.splittedWord = null;
    this.letter = null;
    this.letterIndex = null;
    this.userWord = null;
    this.userLetters = [];
    this.attempts = 5;
  }

  guessLetter(letter) {
    let alreadyGuessed = this.userLetters.find((element) => {
      if (element === letter) {
        console.log(`Lettera ${element} già cercata!`);
        this.attempts--;
        console.log(`Tentativi rimasti: ${this.attempts}`);
        alert(`Lettera già cercata, tentativi rimasti: ${this.attempts}`);
        this.resetAttempts();
        return true;
      }
    });

    // Trova tutti gli indici della lettera se esiste
    let letterIndices = [];
    this.splittedWord.forEach((element, index) => {
      if (element === letter) {
        letterIndices.push(index);
      }
    });

    if (letterIndices.length > 0) {
      // Se la lettera esiste, aggiungila alla lista delle lettere trovate
      this.userLetters.push(letter);
      console.log("Le lettere trovate sono: ", this.userLetters);

      // Aggiorna userWord con la lettera trovata in tutti i suoi indici
      this.userWord = this.userWord.map((element, index) => {
        if (letterIndices.includes(index)) {
          return letter;
        } else {
          return element;
        }
      });

      console.log(this.userWord);
    } else {
      console.log("letter not found");
      this.attempts--;
      alert(`Lettera non trovata, tentativi rimasti: ${this.attempts}`);
      console.log(`Tentativi rimasti: ${this.attempts}`);
      this.resetAttempts();
    }
  }

  guessWord(word) {
    if (this.word === word) {
      console.log("complimenti hai vinto!");
      alert("complimenti hai vinto!");
    } else {
      console.log("Parola sbagliata! Ritenta");
      alert("Parola sbagliata! Ritenta");
      this.attempts = 0;
      console.log(`tentativi rimasti: ${this.attempts}`);
      alert(`tentativi rimasti: ${this.attempts}`);
      this.resetAttempts();
    }
  }
}

// ---------------------------------------------------------------------------------------
// DOM

const displayWord = document.getElementById("display-word");
const newGameBtn = document.getElementById("new-game"); // bottone per inserire nuvoa parola
const resetBtn = document.getElementById("reset");
const gameWord = document.getElementById("game-word");
const startGameBtn = document.getElementById("start-game"); // bottone per far partire il gioco
const letterBtn = document.getElementById("insert-letter"); // bottone per inserire lettera
const wordBtn = document.getElementById("insert-word");

const game = new GuessGame();

newGameBtn.addEventListener("click", () => {
  console.log("Inizializzazione gioco, inserire la parola da aggiungere");
  gameWord.classList.remove("hidden");
  startGameBtn.classList.remove("hidden");
});

startGameBtn.addEventListener("click", () => {
  game.resetGame();
  console.log("Game Started!");
  gameWord.classList.add("hidden");
  startGameBtn.classList.add("hidden");
  console.log(gameWord.value);
  game.startGame(gameWord.value);
  game.attempts = 5;

  let displayUserWord = game.userWord.join("");
  displayWord.innerText = displayUserWord;
});

letterBtn.addEventListener("click", () => {
  game.guessLetter(document.getElementById("guess-letter").value.toLowerCase());
  let displayUserWord = game.userWord.join("");
  displayWord.innerText = displayUserWord;
});

resetBtn.addEventListener("click", () => {
  console.log("Game Restarted");
  alert("Game Restarted");
  displayWord.innerText = "Insert Word";
  gameWord.classList.add("hidden");
  startGameBtn.classList.add("hidden");
  game.resetGame();
});

wordBtn.addEventListener("click", () => {
  game.guessWord(document.getElementById("guess-word").value.toLowerCase());
  displayWord.innerText = game.word;
});
