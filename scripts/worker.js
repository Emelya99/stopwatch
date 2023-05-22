// Global variables for stopwatch
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 0; // Shows how many laps
let isLap = false; // Shows whether the lap is sent in the response
let interval; // Variable to enable/disable setInterval

// The function leads to the desired form and returns the object
const currentlyValues = (hours,minutes,seconds,milliseconds) => {
    let millisecondsValue = milliseconds > 9 ? milliseconds : '0' + milliseconds;
    let secondsValue = seconds > 9 ? seconds : '0' + seconds;
    let minutesValue = minutes > 9 ? minutes : '0' + minutes;
    let hoursValue = hours > 9 ? hours : '0' + hours;
    let values = {
        hoursValue,
        minutesValue,
        secondsValue,
        millisecondsValue,
    }
    return values;
}

// Stopwatch logic and sending a response from the worker
const tick = () => {
    milliseconds++;

    // Conversion to seconds
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }

    // Conversion to minutes
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Conversion to hours
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }

    // Variable with actual time format
    let values = currentlyValues(hours,minutes,seconds,milliseconds);
    
    // Sending data to main.js
    this.postMessage(values);
}

// Starts the stopwatch
const startTimer = () => {
    clearInterval(interval);
    interval = setInterval(tick, 10);
}

// Stopwatch stop logic
const stopTimer = () => {
    clearInterval(interval);
}

// Stopwatch reset logic
const resetTimer = () => {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;
    isLap = false;
}

// The logic of adding a circle and sending the data to main.js
const lapTimer = () => {
    // Variable with actual time format
    let values = currentlyValues(hours,minutes,seconds,milliseconds);
    // Add the number of circles by 1
    lapCount++;
    // The variable indicates that there is a new circle in the message and needs to be processed
    isLap = true;
    // Adding new data to the object
    values.lapCount = lapCount;
    values.isLap = isLap;
    // Sending the data to main.js
    this.postMessage(values);
    // Turn off the flag with the presence of circles in the data
    isLap = false;
}

// If there is data in localStorage when loading the page, we enter it into our global variables
const render = (data) => {
    milliseconds = Number(data.milliseconds);
    seconds = Number(data.seconds);
    minutes = Number(data.minutes);
    hours = Number(data.hours);
    lapCount = Number(data.lapCount);
}

// Processes the message and call the desired function
this.addEventListener('message', function(e) {
    switch(e.data.name) {
        case "start":
            startTimer();
            break;
        case "stop":
            stopTimer();
            break;
        case "reset":
            resetTimer();
            break;
        case "lap":
            lapTimer();
            break;
        case "render":
            render(e.data.value);
            break;
    }
});