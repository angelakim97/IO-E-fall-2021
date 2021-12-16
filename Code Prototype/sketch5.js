let video; 
let pose; 
let audio; 
//var bgImg; 
let size = 30; 
let r, g, b; 


// tried to get a background image to work but wasn't working so commented it out 

//function preload() {
//    bgImg = loadImage('images/playground.png'); 
//}

function setup() {
    createCanvas(1420, 900); 
    video = createCapture(VIDEO); 
    video.hide(); 
    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses); 
    audio = createAudio('assets/music.mp3'); 
//    img = loadImage('images/playground.png'); 
}

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!"); 
}; 

function gotPoses(poses) {
    console.log(poses); 
    if (poses.length > 0) {
        pose = poses[0].pose; 
    }
}

function draw() {
    image(video, 0, 0, width, height); 
    strokeWeight(3); 
    rect(500, 100, 550, 50, 300); 
    textSize(20);
    strokeWeight(1); 
    text('Tilt your head sideways to the left to play music!', 550, 80); 

    if (pose) {
        fill(r, g, b);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, size);

        if (pose.rightWrist.x < 100) { 
            audio.play();
            r = 255;
            g = 0;
            b = 0;
        } else {
            audio.stop(); 
        }
    }
}


