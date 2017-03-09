var welcome;
var gameHTML;
var counter = 30;
var questionArray = ["St. Patrick was originally from...", "The Shamrock was used as a teaching tool to represent...", "Prior to the late 18th century, St Patrick's Day was associated with the color...", "St. Patrick's Day was first celebrated in America in..."];
var answerArray = [["Wales", "England", "Ireland", "Scotland"], ["Sun, Moon, Stars","The Holy Trinity in Christianity (Father, Son, Holy Spirit)","Air, Water, Fire","Wood, Metal, Earth"], ["Purple", "Green", "Blue", "Red"], [,"Philadelphia, Pennsylvania","Chicago, Illinois","Boston, Massachusetts","Beverly Hills, California"] ];
var correctAnswers = ["A. Wales", "B. The Holy Trinity", "C. Blue", "C. Boston, MA"];
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function() {

function initialScreen() {
	welcome = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>St. Patrick's Day is March 17.  Begin!</a></p>";
	$(".mainArea").html(welcome);
}

initialScreen();


$("body").on("click", ".start-button", function(event){
	
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 5) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Your Results" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}


