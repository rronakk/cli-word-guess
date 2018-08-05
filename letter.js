var Letter = function(char){
    this.char = char;
    this.isGuess = false;
    this.showChar = function(){
        if (this.isGuess === true){
            return this.char;
        }
        // else if (this.char = " "){
        //     console.log(this.char);
        //     return " ";
        // }
        else{
            return "_";
        }
    };

    this.evaluateChar = function(char){
        if (char === this.char){
            this.isGuess = true;
        }
    }
}

var one = new Letter("a");
// console.log(one.char);
one.evaluateChar("a");
one.showChar();

module.exports = Letter;