var letter = require('./letter.js');

var words = function(word, userInput) {
    this.word = word;
    this.letters = [];
    this.splitWord = word.split('');
    this.userInput = userInput;
    this.newQuestion = function() {
        for (var i = 0; i < this.word.length; i++) {
            var newLetters = new letter(this.word[i]);
            if (this.word[i].valueOf() !== " ") {
                this.letters.push(newLetters.blank());
            } else {
                this.letters.push(newLetters.space());
            }
        }
    };
    this.userGuess = function(guessedLetter) {
        var upperCase = guessedLetter.toUpperCase();
        for (var i = 0; i < this.letters.length; i++) {
            if (this.word[i].valueOf() === upperCase) {
                this.letters[i] = this.word[i].valueOf();
            }
        }
        var j = (this.word.indexOf(upperCase));
        if (j === -1) {
            tries--;
        }
    };
    this.correctGuess = function() {
        if (this.letters.join('') === this.word) {
            correctAnswer = true;
        }
    };
    this.render = function() {
        return this.letters.join(' ');
    };
};

module.exports = words;