// Sprint 1 by Angela Kim 
// I attempt to draw a clown nose for this sprint 

let video;
let poseNet;
let poses = [];
let r, g, b;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  r = fill(255, 87, 51);
  g = fill(252, 51, 255);
  b = fill(255, 0, 0); 
}

function draw() {
  image(video, 0, 0, width, height);
  noStroke(); 

  if (poses.length > 0) {
    const pose = poses[0].pose;
    
    fill(r, g, b);
    const nose = pose.nose;
    ellipse(nose.x, nose.y, 75, 75);
  }
}