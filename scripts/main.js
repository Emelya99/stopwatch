const timerBtn = document.querySelector('.timer-btn'); // timer start button
const numberHours = document.querySelector('.number-hours'); // number that shows how many hours
const numberMinutes = document.querySelector('.number-minutes'); // number that shows how many minutes
const numberSeconds = document.querySelector('.number-seconds'); // number that shows how many seconds
const numberMilliseconds = document.querySelector('.number-milliseconds'); // number that shows how many milliseconds
const helpersBtns = document.querySelector('.help-btns'); // helper buttons block
const playBtn = document.querySelector('.play'); // play button
const stopBtn = document.querySelector('.stop'); // stop button
const resetBtn = document.querySelector('.reset'); // reset start button
const lapBtn = document.querySelector('.lap'); // lap button
const timerCount = document.querySelector('.timer-count'); // time is displayed here

let interval;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;


// adding 1 second
const tick = () => {
    milliseconds++;
    numberMilliseconds.innerHTML = `0${milliseconds}`;

    if(milliseconds > 9) {
        numberMilliseconds.innerHTML = milliseconds;
    }
    
    if(milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    if(seconds > 9) {
        numberSeconds.innerHTML = seconds;
    } else {
        numberSeconds.innerHTML = `0${seconds}`;
    }

    if(seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if(minutes > 9) {
        numberMinutes.innerHTML = minutes;
    } else {
        numberMinutes.innerHTML = `0${minutes}`;
    }

    if(minutes === 60) {
        minutes = 0;
        hours++;
    }

    if(hours > 9) {
        numberHours.innerHTML = hours;
    } else {
        numberHours.innerHTML = `0${hours}`;
    }

}

const start = () => {
    clearInterval(interval);
    interval = setInterval(tick, 10);
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
}

const stop = () => {
    clearInterval(interval);
}

const reset = () => {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    numberMilliseconds.innerHTML = '00';
    numberSeconds.innerHTML = '00';
    numberMinutes.innerHTML = '00';
    numberHours.innerHTML = '00';
}

// start timer on button click
timerBtn.addEventListener('click', start);
playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);