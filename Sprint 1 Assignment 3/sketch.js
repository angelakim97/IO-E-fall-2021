// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
var speechRec; // speech recognition object (will prompt for mic access)
let song;
let playing = false;

function setup() {
    createCanvas(innerWidth, innerHeight);
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
    let lang = navigator.language || 'en-US'
    speechRec = new p5.SpeechRec('lang', gotSpeech);
    speechRec.continuous = true;
    speechRec.start();

    song = createAudio('assets/assets_sounds_bubbles.mp3');
    song.stop;

}

function modelReady() {
    select('#status').html('Model Loaded');
}

function gotSpeech() {
    console.log("I got result, the result is");
    console.log(speechRec.resultString);
    console.log("----------------------------")
}

function draw() {
    //image(video, 0, 0, width, height);
    strokeWeight(2);
    let r = random(100, 1000);
    let r2 = random(100, 1000);

    //speechSynthesis.speak(new SpeechSynthesisUtterance('Hey'));

    if (speechRec.resultString == "hello") {
        text("hi", 100, 100);
    }
    if (speechRec.resultString == "blue") {
        background("blue");
        fill(255, 255, 255);
        text("blue?", 100, 100);
        song.loop();
    }
}

function drawWord() {
    if (speechRec.hasOwnProperty("resultString")) {
        text(speechRec.resultString, r, r2);
    }
}
