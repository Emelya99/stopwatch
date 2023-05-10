import { currentlyValues, moreNineTimes, equalsSixty } from './utils.js';

const timerBtn = document.querySelector('.timer-btn'); // timer start button

const numberHours = document.querySelector('.number-hours'); // number that shows how many hours
const numberMinutes = document.querySelector('.number-minutes'); // number that shows how many minutes
const numberSeconds = document.querySelector('.number-seconds'); // number that shows how many seconds
const numberMilliseconds = document.querySelector('.number-milliseconds'); // number that shows how many milliseconds

const helpersBtns = document.querySelector('.help-btns'); // helper buttons block
const lapResultsBlock = document.querySelector('.lap-results'); // lap results block
const lapResultsList = document.querySelector('.results-list'); // lap results list
const playBtn = document.querySelector('.play'); // play button
const stopBtn = document.querySelector('.stop'); // stop button
const resetBtn = document.querySelector('.reset'); // reset start button
const lapBtn = document.querySelector('.lap'); // lap button

const timerCount = document.querySelector('.currently-timer'); // time is displayed here

// storage
let isTimer = false;
let interval;
let lapCount = 0;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

// adding 1 second
const tick = () => {
    milliseconds++;

    let values = currentlyValues(hours,minutes,seconds,milliseconds);
    document.title = `Time: ${values.hoursValue} : ${values.minutesValue} : ${values.secondsValue}`;
    
    /* logic to convert milliseconds */
    moreNineTimes(milliseconds,numberMilliseconds);
    if(milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    /* logic to convert seconds */
    moreNineTimes(seconds,numberSeconds);
    if(seconds === 60) {
        seconds = 0;
        minutes++;
    }

    /* logic to convert minutes */
    moreNineTimes(minutes,numberMinutes);
    if(minutes === 60) {
        minutes = 0;
        hours++;
    }

    /* logic to convert hours */
    moreNineTimes(hours,numberHours);
}

// Function start stopwatch
const start = () => {
    clearInterval(interval);
    interval = setInterval(tick, 10);
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
    timerCount.style.display = 'flex';
    playBtn.style.display = 'none';
    stopBtn.style.display = 'block';
}

// Function stop stopwatch
const stop = () => {
    clearInterval(interval);
    playBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
}

// Function reset stopwatch
const reset = () => {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;
    numberMilliseconds.innerHTML = '00';
    numberSeconds.innerHTML = '00';
    numberMinutes.innerHTML = '00';
    numberHours.innerHTML = '00';
    lapResultsList.replaceChildren();
    document.title = "Stopwatch";
    lapResultsBlock.style.display = 'none';
    playBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
}

// Function lap stopwatch
const lap = () => {
    lapCount++;

    lapResultsBlock.style.display = 'block';

    let values = currentlyValues(hours,minutes,seconds,milliseconds);

    let htmlContent = `<li class="results-item timer-count">
                            <p class="lap-count">lap <span>${lapCount}</span></p>
                            <span class="number-hours">${values.hoursValue}</span><span>:</span>
                            <span class="number-minutes">${values.minutesValue}</span><span>:</span>
                            <span class="number-seconds">${values.secondsValue}</span><span>:</span>
                            <span class="number-milliseconds">${values.millisecondsValue}</span>
                        </li>`;
    
    lapResultsList.insertAdjacentHTML('beforeend', htmlContent);
}

// start timer on button click
timerBtn.addEventListener('click', start);
playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);