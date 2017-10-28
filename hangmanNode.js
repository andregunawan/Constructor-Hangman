var words = require('./word.js');
var inquirer = require('inquirer');

var questions = ["STAR WARS", "STAR TREK", "INDIANA JONES", "ROCKY", "BACK TO THE FUTURE", "INCEPTION", "THE DARK KNIGHT", "THE GODFATHER", "MR NOBODY", "HARRY POTTER", "THE LORD OF THE RING", "MISSION IMPOSSIBLE", "THE MATRIX", "ALIEN VS PREDATOR", "THOR RAGNAROK"];

var randomizeWord = function(wordSelect) {
    this.wordSelect = questions[Math.floor(Math.random() * questions.length)];
};

var startGame = function() {
    gameover = false;
    correctAnswer = false;
    guesses = [];
    tries = 12;
    var title = new randomizeWord();
    randomQuestion = title.wordSelect;
    console.log("============================");
    console.log("Guess the Movie title !!!");
    console.log("============================");
    console.log("\nRemaining guesses:", tries);
    currentTitle = new words(randomQuestion);
    currentTitle.newQuestion();
    console.log("\n" + currentTitle.render() + "\n");
    userPrompt();
};

var userPrompt = function() {
    currentTitle.correctGuess();
    if (tries < 1 || correctAnswer === true) {
        gameover = true;
        playAgain();
    } else {
        inquirer.prompt([{
            name: "guess",
            message: "Type a letter to guess the title."
        }]).then(function(answers) {
                guesses.push(answers.guess.toUpperCase());
                console.log("\nGuessed letters: " + guesses);
                currentTitle.userGuess(answers.guess);
                console.log("\nRemaining guesses:", tries);
                console.log("\n" + currentTitle.render() + "\n");
                userPrompt();
        });
    }
};

var playAgain = function() {
    if (gameover == true) {
        if (tries < 1) {
            console.log("\nYOU LOSE, Better luck next time !!!\n");
        } else {
            console.log("\nCongratulatons! YOU WON.\n");
        }
        inquirer.prompt([{
            type: "confirm",
            name: "again",
            message: "Play again?"
        }]).then(function(restart) {
            if (restart.again) {
                startGame();
            } else {
                console.log("\nGOOD BYE.\n");
            }
        });
    }
};

startGame();