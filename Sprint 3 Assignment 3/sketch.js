// Angela Kim Sprint 3 
// This sketch uses the speechrec function to display the color that the user says. 

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var myVoice = new p5.Speech(); // new P5.Speech object


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(245, 215, 225);
	fill(100,149,237);
	textSize(40);
	textAlign(CENTER);
    textStyle(BOLD); 
	text('What is your favourite colour?', width / 2, height / 2);
	myRec.onResult = showResult;
	myRec.start();
  
  //myVoice.speak("say something");

}

function draw() {
	// why draw when you can talk?
}

function showResult() {
	if (myRec.resultValue === true) {
		background(0, 0, 255);
		text(myRec.resultString, width / 2, height / 2);
   
	}
}