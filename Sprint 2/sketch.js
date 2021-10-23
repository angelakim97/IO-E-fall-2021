
let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let class1 = 0,
    class2 = 0,
    class3 = 0;

let osc1, osc2, osc3, fft;

let song, song2; 
let num, num2, num3; 

function setup() {

    createCanvas(windowWidth, windowHeight); 
    

    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();
    console.log("serial.list()   ", serial.list());

    /////////////////////////////////////////////////////////////////////////////
    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/cu.usbmodem14401/");
    ////////////////////////////////////////////////////////////////////////////
    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);

    song = createAudio('assets/assets_sounds_suspension.mp3');
    song2 = createAudio('assets/assets_sounds_wipe.mp3');

}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////



// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// Uh oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    class1 = splitter[0]; //put the first sensor's data into a variable
    class2 = splitter[1];
    class3 = splitter[2];
}

// We got raw data from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

// function draw() {
//     stroke('white'); 
//     strokeWeight(10); 
//     Text(latestData, 10, 10); 

// }


function draw() {
    if (class2 > 1) {
        background(80, 120, value1);
    }
    if (class3 < 1) {
        background(255, 253, 208); 
        playPinwheel(); 
    }

function playPinwheel() {
    song2.loop(); 
    fill(255, 105, 97); 
    ellipse(130, 350, mouseX, mouseY); 
    ellipse(240, 240, mouseX, mouseY);
    rect(300, 200, mouseX, mouseY); 
}
    

    
    



    


    




}






    // //text(latestData, 10, 10);
    // textSize(14);
    // text("click mouse first to activate sound!", windowWidth / 2 - 75, 10);
    // playConfetti();

// function playConfetti() {
//     if (class1 == 1) {
//         song.loop();
//         // drawBoom();
//     }
//     if (class1 == 0) {
//         song.stop();
//     }
// };

// function playClay() {
//     song2.loop();
//     fill(120);
//     textSize(40);
//     textAlign(CENTER);
//     ellipse:
//     text("Tap here to play", windowWidth / 2, windowHeight / 2);
// };

// function drawBoom() {
//     for (let i = 0; i < 10; i++) {
//         num = Math.floor(Math.random() * windowWidth + 50);
//         num2 = Math.floor(Math.random() * windowHeight) + 50;
//         num3 = Math.floor(Math.random() * 100) + 10;
//         fill(100, 100 + num2, 100 + num);
//         noStroke();
//         circle(num, num2, num3);
//     }
// };
