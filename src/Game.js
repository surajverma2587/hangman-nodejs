const inquirer = require("inquirer");

const words = require("./words");

class Game {
  constructor(playerName) {
    this.playerName = playerName;
  }

  start() {
    const word = this.getRandomWord();
    const currentState = this.constructBlanks(word);

    this.wordToGuess = word;
    this.guessesRemaining = 10;
    this.currentState = currentState;

    this.display();
    this.inPlay();
  }

  end() {
    console.log(
      `===========\nGAME OVER\n===========\nWord: ${this.wordToGuess}\n`
    );
  }

  win() {
    const message = `YOU WIN ${this.playerName.toUpperCase()}`;
    const equal = "=";
    console.log(
      `${equal.repeat(message.length)}\n${message}\n${equal.repeat(
        message.length
      )}\nGuesses Remaining: ${this.guessesRemaining}\n`
    );
  }

  display() {
    console.log(
      `===========\nGUESSES: ${this.guessesRemaining}\n===========\nWord: ${this.currentState}\n`
    );
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  constructBlanks(word) {
    // 'The Green Mile'
    const arr = [...word];

    const callback = (each) => {
      const regex = new RegExp(/^[A-Za-z0-9.\s_-]+$/g);

      if (regex.test(each) && each !== " ") {
        return "_";
      }

      return each;
    };

    return arr.map(callback).join("");
  }

  async inPlay() {
    if (this.guessesRemaining !== 0) {
      if (this.currentState === this.wordToGuess) {
        this.win();
      } else {
        await this.askQuestion();
      }
    } else {
      this.end();
    }
  }

  confirmGuess(character) {
    if (this.wordToGuess.toLowerCase().includes(character.toLowerCase())) {
      const wordsArray = [...this.wordToGuess];
      const currentStateArray = [...this.currentState];

      const callback = (each, index) => {
        if (each.toLowerCase() === character.toLowerCase()) {
          currentStateArray[index] = each;
        }
      };

      wordsArray.forEach(callback);

      this.currentState = currentStateArray.join("");
    } else {
      console.log(`${character} is not found in word`);
      this.guessesRemaining -= 1;
    }

    this.display();

    this.inPlay();
  }

  async askQuestion() {
    const questions = [
      {
        type: "input",
        message: "Guess the letter in the word:",
        name: "character",
        validate: (character) => {
          if (character.length === 1) {
            return true;
          } else {
            return "Please enter a single character";
          }
        },
      },
    ];

    const { character } = await inquirer.prompt(questions);

    this.confirmGuess(character);
  }
}

module.exports = Game;
