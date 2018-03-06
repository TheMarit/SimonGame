var colors = document.getElementsByClassName("color");
var start = document.getElementById("start");
var count = document.getElementById("count");
var checkbox = document.getElementById("checkbox");
var strict = document.getElementById("strict");

var game = {
	colors: ["green", "red", "yellow", "blue"],
	sound: {green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", red:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" },
	computerStreak: [],
	playerStreak: [],
	playersTurn: false,
	count: 0,
	on: false,
	strict: false,
	reset: function(){
		this.computerStreak = [];
		this.playerStreak = [];
		this.playersTurn = false;
		this.count = 0;
		count.innerHTML = (("0" + this.count).slice(-2));
	},
	wrongAnswer: function(){
		clearTimeout(game.timer);
		new Audio("http://soundbible.com/mp3/Buzz-SoundBible.com-1790490578.mp3").play();
	},
	switchStrict: function (){
		this.strict = !this.strict;
		strict.classList.toggle("on");
	},
	timeIsUp: function(){
		new Audio("http://soundbible.com/mp3/Beep-SoundBible.com-923660219.mp3").play();
		if(game.strict){
			game.reset()
			setTimeout(function(){ computersTurn(); }, 2000);
		} else{
			game.playerStreak = [];
			displayComputerStreak();
		}
	}
}

checkbox.addEventListener( 'change', function() {
	if(checkbox.checked){
		game.on = true;
		count.style.color = "#DE393A"
	} else{
		clearTimeout(game.timer);
		game.on = false;
		game.reset();
		game.strict = false;
		strict.classList.remove("on");
		count.style.color = "#420811";
		count.innerHTML = ("--");
	}
});

strict.addEventListener( "click", function() {
	if(game.on){
		game.switchStrict();
	}
});

start.addEventListener("click", function() {
	if(game.on){	
		computersTurn();
	}
});

for(var i=0; i< colors.length; i++){
	colors[i].addEventListener("click", checkForStreakMatch )
}

function lightUp(color){
	currentColor = document.getElementById(color);
	currentColor.className += " blink";
	new Audio(game.sound[color]).play();
	setTimeout(function(){ 
		var elems = document.getElementsByClassName("blink");
		[].forEach.call(elems, function(el) {
			el.classList.remove("blink");
		})
 
	}, 500);
}

function pickColor() {
	return game.colors[Math.floor((Math.random() * game.colors.length))];
}

function checkForStreakMatch(){
	clearTimeout(game.timer);
	if(game.on && game.playersTurn){
		game.timer = setTimeout(game.timeIsUp, 5000);
		currentButton = this;
		game.playerStreak.push(currentButton.id);
		lightUp(currentButton.id);
		for(var i=0; i<game.playerStreak.length; i++){
			if(game.playerStreak[i] !== game.computerStreak[i]){
				game.wrongAnswer()
				game.playersTurn = false;
				if(game.strict){
					game.reset()
					setTimeout(function(){ computersTurn(); }, 2000);
				} else{
					game.playerStreak = [];
					setTimeout(function(){ displayComputerStreak(); }, 2000);
				}
				return;
			}
		}
		if(game.computerStreak.length === game.playerStreak.length){
			game.playerStreak = [];
			game.playersTurn = false;
			setTimeout(function(){ computersTurn(); }, 1000);
		} 
	}
}

function addToComputerStreak(){
	var color = pickColor();
	game.computerStreak.push(color);
	game.count++
	count.innerHTML = (("0" + game.count).slice(-2));
}

function displayComputerStreak(){
	var p = Promise.resolve()
	for(let i=0; i<game.computerStreak.length; i++){
		p = p.then(_ => new Promise(resolve =>
	        setTimeout(function () {
	            lightUp(game.computerStreak[i]);
	            resolve();
	            if(game.computerStreak.length == i+1){
	        		game.playersTurn = true;
	        		game.timer = setTimeout(game.timeIsUp, 5000);
	        	}
	        }, 750)
	    ));
	}
}

function computersTurn(){
	if(game.count === 20){
		new Audio("http://soundbible.com/mp3/Ta Da-SoundBible.com-1884170640.mp3").play();
		setTimeout(function(){ 
			game.reset();
			computersTurn();
		}, 2000);
		return
	}
	clearTimeout(game.timer);
	addToComputerStreak();
	displayComputerStreak();
}
