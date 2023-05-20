import { renderLaps } from './utils.js'

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

let worker = new Worker('./scripts/worker.js');
let localStorageRender = JSON.parse(localStorage.getItem('seconds')) || false;
let allLaps = JSON.parse(localStorage.getItem('allLapsArr')) || [];

if(localStorageRender) {
    let data = {
        milliseconds: JSON.parse(localStorage.getItem('milliseconds')),
        seconds: JSON.parse(localStorage.getItem('seconds')),
        minutes: JSON.parse(localStorage.getItem('minutes')),
        hours: JSON.parse(localStorage.getItem('hours')),
        lapCount: JSON.parse(localStorage.getItem('lapCount')),
    }
    worker.postMessage({ name: 'render', value: data });
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
    timerCount.style.display = 'flex';
    playBtn.style.display = 'none';
    worker.postMessage({ name: 'start' });
    
    if(allLaps.length >= 1) {
        lapResultsBlock.style.display = 'block';
        allLaps.map(item => {
            let result = renderLaps(item);
            lapResultsList.insertAdjacentHTML('beforeend', result);
        })
    }
}

const start = () => {
    worker.postMessage({ name: 'start' });
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
    timerCount.style.display = 'flex';
    stopBtn.style.display = 'block';
    lapBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    playBtn.style.display = 'none';
    allLaps = [];
    localStorage.clear()
}

const stop = () => {
    worker.postMessage({ name: 'stop' });
    playBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
}

const reset = () => {
    worker.postMessage({ name: 'reset' });
    numberMilliseconds.innerHTML = '00';
    numberSeconds.innerHTML = '00';
    numberMinutes.innerHTML = '00';
    numberHours.innerHTML = '00';
    document.title = "Stopwatch";
    lapResultsList.replaceChildren();
    playBtn.style.display = 'flex';
    lapResultsBlock.style.display = 'none';
    stopBtn.style.display = 'none';
    lapBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    allLaps = [];
    localStorage.clear();
}

const lap = () => {
    worker.postMessage({ name: 'lap' });
    lapResultsBlock.style.display = 'block';
}

worker.onmessage = function(e) {
    const { millisecondsValue, secondsValue, minutesValue, hoursValue, lapCount, isLap } = e.data;

    if(isLap === true) {
        // if there are more than 100 or 1000 circles, then add a class so that the number of laps is displayed correctly
        if(lapCount === 100) {
            lapResultsList.classList.add("over-100");
        }
        if (lapCount === 1000) {
            lapResultsList.classList.add("over-1000");
            lapResultsList.classList.remove("over-100");
        }
        
        const valuesLap = {
            millisecondsValue,
            secondsValue,
            minutesValue,
            hoursValue,
            lapCount
        }

        let result = renderLaps(valuesLap);
        lapResultsList.insertAdjacentHTML('beforeend', result);

        allLaps.push(valuesLap);
        localStorage.setItem(`allLapsArr`, JSON.stringify(allLaps));
        localStorage.setItem('lapCount', JSON.stringify(lapCount));
    }
    localStorage.setItem('milliseconds', JSON.stringify(millisecondsValue));
    localStorage.setItem('seconds', JSON.stringify(secondsValue));
    localStorage.setItem('minutes', JSON.stringify(minutesValue));
    localStorage.setItem('hours', JSON.stringify(hoursValue));
    
    numberMilliseconds.innerHTML = millisecondsValue;
    numberSeconds.innerHTML = secondsValue;
    numberMinutes.innerHTML = minutesValue;
    numberHours.innerHTML = hoursValue;

    document.title = `Time: ${hoursValue} : ${minutesValue} : ${secondsValue}`;
};

timerBtn.addEventListener('click', start);
playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);