const timerBtn = document.querySelector('.timer-btn'); // timer start button
const numberHours = document.querySelector('.number-hours'); // number that shows how many hours
const numberMinutes = document.querySelector('.number-minutes'); // number that shows how many minutes
const numberSeconds = document.querySelector('.number-seconds'); // number that shows how many seconds
const numberMilliseconds = document.querySelector('.number-milliseconds'); // number that shows how many milliseconds
const helpersBtns = document.querySelector('.help-btns'); // helper buttons block
const lapResults = document.querySelector('.results-list'); // lap results block
const playBtn = document.querySelector('.play'); // play button
const stopBtn = document.querySelector('.stop'); // stop button
const resetBtn = document.querySelector('.reset'); // reset start button
const lapBtn = document.querySelector('.lap'); // lap button
const timerCount = document.querySelector('.timer-count'); // time is displayed here

// storage
let interval;
let lapCount = 0;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;


const currentlyValues = () => {
    // implementation of displaying the stopwatch in the title on the page
    let millisecondsValue = milliseconds > 9 ? milliseconds : '0' + milliseconds;
    let secondsValue = seconds > 9 ? seconds : '0' + seconds;
    let minutessValue = minutes > 9 ? minutes : '0' + minutes;
    let hoursValue = hours > 9 ? hours : '0' + hours;
    let values = {
        hours: hoursValue,
        minutes: minutessValue,
        seconds: secondsValue,
        milliseconds: millisecondsValue,
    }
    return values;
}


// adding 1 second
const tick = () => {
    milliseconds++;

    let values = currentlyValues();
    document.title = `Time: ${values.hours} : ${values.minutes} : ${values.seconds}`;
    
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

// Function start stopwatch
const start = () => {
    clearInterval(interval);
    interval = setInterval(tick, 10);
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
}

// Function stop stopwatch
const stop = () => {
    clearInterval(interval);
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
    lapResults.replaceChildren();
    document.title = "Stopwatch";
}

// Function lap stopwatch
const lap = () => {
    lapCount++;

    let values = currentlyValues();

    let htmlContent = `<li class="results-item timer-count">
                            <p class="lap-count">lap <span>${lapCount}</span></p>
                            <span class="number-hours">${values.hours}</span><span>:</span>
                            <span class="number-minutes">${values.minutes}</span><span>:</span>
                            <span class="number-seconds">${values.seconds}</span><span>:</span>
                            <span class="number-milliseconds">${values.milliseconds}</span>
                        </li>`;
    
    lapResults.insertAdjacentHTML('beforeend', htmlContent);
}

// start timer on button click
timerBtn.addEventListener('click', start);
playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);