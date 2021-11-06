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

    img = loadImage('images/moustache.png');
    img2 = loadImage('images/glasses.png');
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 0, 0, width, height);
    strokeWeight(2);


    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);
        const nose = pose.nose;

        image(img, nose.x - 50, nose.y, 100, 50);
        image(img2, pose.rightEye.x - 20, pose.rightEye.y - 15, 100, 50);

        fill(255, 182, 193); 
        const rightWrist = pose.rightWrist;
        ellipse(rightWrist.x, rightWrist.y, 30, 30);

        fill(255, 182, 193);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 30, 30);

    }
}