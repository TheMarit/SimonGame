var colors = document.getElementsByClassName("color");
var start = document.getElementById("start");
var count = document.getElementById("count");

var game = {
	colors: ["green", "red", "yellow", "blue"],
	sound: {green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", red:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" },
	computerStreak: [],
	playerStreak: [],
	playersTurn: false,
	count: 0
}

start.addEventListener("click", startGame);

for(var i=0; i< colors.length; i++){
	colors[i].addEventListener("click", checkForStreakMatch )
}
function wrong(){
	new Audio("http://soundbible.com/mp3/Buzz-SoundBible.com-1790490578.mp3").play();
}

function checkForStreakMatch(){
	currentButton = this;
	game.playerStreak.push(currentButton.id);
	lightUp(currentButton.id);

	for(var i=0; i<game.playerStreak.length; i++){
		if(game.playerStreak[i] !== game.computerStreak[i]){
			wrong()
			game.playerStreak = [];
			displayComputerStreak();
			return;
		}
	}

	if(game.computerStreak.length === game.playerStreak.length){
		game.playerStreak = [];
		computersTurn();
	} 
}

function playersTurnMove(){
	currentButton = this;
	lightUp(currentButton.id);
	game.playerStreak.push(currentButton.id);
}

function lightUp(color){
	currentColor = document.getElementById(color);
	currentColor.className += " blink";
	new Audio(game.sound[color]).play();
	setTimeout(function(){ 
		currentColor.classList.remove("blink"); 
	}, 500);
}

function pickColor() {
	return game.colors[Math.floor((Math.random() * game.colors.length))];
}

function startGame(){
	computersTurn();

}

function computersTurn(){
	addToComputerStreak();
	displayComputerStreak();
}

function displayComputerStreak(){
	for(let i=0, p = Promise.resolve(); i<game.computerStreak.length; i++){
			p = p.then(_ => new Promise(resolve =>
	        setTimeout(function () {
	            lightUp(game.computerStreak[i]);
	            resolve();
	        }, 1000)
	    ));
	}
}


function addToComputerStreak(){
	var color = pickColor();
	game.computerStreak.push(color);
	game.count++
	count.innerHTML = (("0" + game.count).slice(-2));
}
