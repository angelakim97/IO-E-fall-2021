let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 5, 6, width, height);
    strokeWeight(2);

    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        // Create a red ellipse for the nose
        fill(255, 0, 0);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, 40, 40);

        // Create a orange ellipse for the right eye
        fill(255, 165, 0);
        const rightEye = pose.rightEye;
        rect(rightEye.x, rightEye.y, 20, 20);

        // Create a yellow ellipse for the left eye
        fill(255, 255, 0);
        const leftEye = pose.leftEye;
        rect(leftEye.x, leftEye.y, 40, 40);
        
        fill(0, 250, 0);
        const leftShoulder = pose.leftShoulder;
        ellipse(leftShoulder.x, leftShoulder.y, 40, 40);

        fill(0, 250, 0);
        const rightShoulder = pose.rightShoulder;
        ellipse(rightShoulder.x, rightShoulder.y, 40, 40);
        
        fill(150, 255, 0); 
        const leftWrist = pose.leftWrist; 
        ellipse(leftWrist.x, leftWrist.y, 40, 40); 
        
        fill(150, 255, 0); 
        const rightWrist = pose.rightWrist; 
        ellipse(rightWrist.x, rightWrist.y, 40, 40);     
        
        
    }
}