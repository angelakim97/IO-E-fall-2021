// Angela Kim Sprint 2 
// This sprint uses the mousePressed function to activate the sound and the shapes are added for extra exploration  

let song;

function setup() { 
    song = loadSound('assets/music.mp3');
    createCanvas(700, 400);
	background = (236, 138, 203); 
	
} 

function draw() { 
  if (mouseIsPressed) {
      fill(236, 138, 203); 
  }   else {
      fill(165, 138, 236); 
  }
    ellipse(mouseX, 50, 70, 70); 
    rect(50, mouseY, 100, 100); 
//    ellipse(50, 70, 100, mouseX); 
    rect(50, 150, mouseX, 100); 
    ellipse(mouseX, 150, 100, 150); 
    rect(mouseY, 200, 100, 80); 
    
  }

function mousePressed() {

    if (song.isPlaying()){
        song.stop();
        
    }
    else{
        song.play();
      
    }
	
}
