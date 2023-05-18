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

const start = () => {
    worker.postMessage('start');
    timerBtn.remove();
    helpersBtns.style.display = 'flex';
    timerCount.style.display = 'flex';
    stopBtn.style.display = 'block';
    lapBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    playBtn.style.display = 'none';
}

const stop = () => {
    worker.postMessage('stop');
    playBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
}

const reset = () => {
    worker.postMessage('reset');
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
}

const lap = () => {
    worker.postMessage('lap');
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

        let htmlContent = `<li class="results-item timer-count">
                                        <p class="lap-count">lap <span>${lapCount}</span></p>
                                        <span class="number-hours">${hoursValue}</span><span>:</span>
                                        <span class="number-minutes">${minutesValue}</span><span>:</span>
                                        <span class="number-seconds">${secondsValue}</span><span>:</span>
                                        <span class="number-milliseconds">${millisecondsValue}</span>
                                    </li>`;

        lapResultsList.insertAdjacentHTML('beforeend', htmlContent);
    }
    
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