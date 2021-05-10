const inquirer = require("inquirer");
const Game = require("./Game");

const init = async () => {
  const questions = [
    {
      type: "input",
      message: "Please enter your name:",
      name: "playerName",
      default: "Player 1",
    },
  ];

  const { playerName } = await inquirer.prompt(questions);

  const game = new Game(playerName);

  game.start();
};

init();
