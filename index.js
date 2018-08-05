var Word = require("./word");
var Letter = require("./letter");
var inquirer = require("inquirer");


var movies = ["titanic", "Gone Girl", "Jigsaw", "What Happened to Monday",
"Shrek", "Iron Man", "Den of Thieves", "Red Sparrow", "Spectre", "Phoenix Forgotten",
"Inside Out", "Get Out" ]
var chances = 9


var generateRandomMovie = function (){
    var movieName = movies[Math.floor(Math.random()*movies.length)].toLowerCase();
    console.log(movieName);
    var guessName = new Word;
    guessName.sentence = [];
    for (var i in movieName){
        guessName.sentence.push(new Letter(movieName[i]));
    }
    
    return [movieName, guessName];
}

var userInput = function(movieName, guessName){
    inquirer.prompt([
        {
            name: "guessLetter",
            message: "Please enter a letter, to guess the Movie Name : "
        }
    ]).then(function(answer){
        console.log(answer.guessLetter);
        guessName.checkChar(answer.guessLetter);
        console.log(guessName.getSentence());
        if(movieName.includes(answer.guessLetter) != true && chances >= 1){
            console.log("incorrect entry");
            chances--;
            console.log("You have " + chances + " remaining \n");
            if (chances === 0) {
                console.log("Game Over!!");
            }
            else{
                userInput(movieName, guessName);
            }

        }
        else if (guessName.getSentence().includes("_") != true){
            console.log(" \n Congrats!!!");
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Do you want to play again ? ",
                    default: true
                }
            ]).then(function(answer){
                if(answer.confirm) play();
                else{
                    console.log("\n please come back !!!!");
                }
            })
        }
        else{
            userInput(movieName, guessName);

        }
        
    })
}

var play = function(){
    var gameData = generateRandomMovie();
    var movieName = gameData[0];
    var guessName = gameData[1];
    guessName.checkChar(" ");
    console.log(guessName.getSentence());
    userInput(movieName, guessName);
}
play();
