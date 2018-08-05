var Word = require("./word");
var Letter = require("./letter");
var inquirer = require("inquirer");
var figlet = require('figlet');
var chalk = require('chalk');



var movies = ["titanic", "Gone Girl", "Jigsaw", "What Happened to Monday",
"Shrek", "Iron Man", "Den of Thieves", "Red Sparrnpmow", "Spectre", "Phoenix Forgotten",
"Inside Out", "Get Out" ]
var chances;


var generateRandomMovie = function (){
    var movieName = movies[Math.floor(Math.random()*movies.length)].toLowerCase();
    // console.log(movieName);
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
            message: "Guess a Movie Letter.. : ",
            validate: function validletter(name){
                if(name.length > 1){
                    console.log(" \n \n Only one Letter Please :) \n");
                    return false;
                }
                return true;
            }
        }
    ]).then(function(answer){
        guessName.checkChar(answer.guessLetter);
         console.log(chalk.blue("\n ************************ \n "));
        console.log(guessName.getSentence());
         console.log(chalk.blue("\n ************************ \n "));

        if(movieName.includes(answer.guessLetter) != true && chances >= 1){
            console.log(chalk.red("Booo !! Wrong Guess"));
            chances--;
            console.log("\n You have " + chances + " chances remaining \n");
            if (chances === 0) {
                console.log(chalk.yellow("Name of Movie is : " + movieName));
                console.log(chalk.red("\n ------------------------ \n"));
                console.log(chalk.red("GAME OVER!!"));
                console.log(chalk.red("\n -------------------------\n "));

            }
            else{
                userInput(movieName, guessName);
            }
        }
        else if (guessName.getSentence().includes("_") != true){
            console.log(chalk.green("\n ------------------------ \n "));
            console.log(chalk.green(" \n Congrats!!! You are a Movie Ninja"));
            console.log(chalk.green("\n ------------------------- \n "));

            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Play Again ?",
                    default: true
                }
            ]).then(function(answer){
                if(answer.confirm) play();
                else{
                    console.log(chalk.yellow("\n Thank You for playing !!! \n "));
                }
            })
        }
        else{
            userInput(movieName, guessName);

        }
        
    })
}

var play = function(){
    chances = 9;
    figlet('Guess the Movie!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        var gameData = generateRandomMovie();
        var movieName = gameData[0];
        var guessName = gameData[1];
        guessName.checkChar(" ");
        console.log(chalk.blue("\n ************************ \n"));
        console.log(guessName.getSentence());
        console.log(chalk.blue("\n ************************ \n "));
        userInput(movieName, guessName);
    });   
}

play();
