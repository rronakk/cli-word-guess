var Letter = require("./letter");

var Word = function(){
    this.sentence = new Array(Letter);
    this.getSentence  = function (){
        var sentence = ""
        for (var eachChar in this.sentence) {
            // console.log(eachChar);
            sentence += " " + this.sentence[eachChar].showChar();
        }
        return sentence;
    }

    this.checkChar = function(char){
        for (var eachChar in this.sentence){
            this.sentence[eachChar].evaluateChar(char);
        }
    }
}

var two = new Word();
// two.sentence = ["h", "l", "m"];
two.sentence = [new Letter("a"), new Letter("b"), new Letter("c")];
// console.log(typeof two.sentence);
// console.log(two.sentence);
// two.checkChar("c");
// console.log(two.getSentence());

module.exports = Word;