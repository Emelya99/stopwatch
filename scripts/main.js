import { renderLaps, addStyleFlex, addStyleDisplayNone, addStyleDisplayBlock } from './utils.js'

const timerContainer = document.querySelector('.timer'); // timer section
/* Main start button */
const timerBtn = timerContainer.querySelector('.timer-btn'); // timer start button

/* Time Variables */
const numberHours = timerContainer.querySelector('.number-hours'); // number that shows how many hours
const numberMinutes = timerContainer.querySelector('.number-minutes'); // number that shows how many minutes
const numberSeconds = timerContainer.querySelector('.number-seconds'); // number that shows how many seconds
const numberMilliseconds = timerContainer.querySelector('.number-milliseconds'); // number that shows how many milliseconds

/* All auxiliary blocks and buttons */
const timerCount = timerContainer.querySelector('.currently-timer'); // time is displayed here
const helpersBtns = timerContainer.querySelector('.help-btns'); // helper buttons block
const lapResultsBlock = timerContainer.querySelector('.lap-results'); // lap results block
const lapResultsList = timerContainer.querySelector('.results-list'); // lap results list
const playBtn = timerContainer.querySelector('.play'); // play button
const stopBtn = timerContainer.querySelector('.stop'); // stop button
const resetBtn = timerContainer.querySelector('.reset'); // reset start button
const lapBtn = timerContainer.querySelector('.lap'); // lap button

/* Popup Elements */
const popupContainer = document.querySelector('.popup'); // popup global element
const popupOverlay = popupContainer.querySelector('.overlay'); // popup overlay
const popupClose = popupContainer.querySelector('.close'); // close btn for popup
const popupYes = popupContainer.querySelector('.popup-yes'); // btn with "Yes"
const popupNo = popupContainer.querySelector('.popup-no'); // btn with "No"

/* Variables that are associated with localStorage */
let localStorageRender = JSON.parse(localStorage.getItem('seconds')) || false; // checking if there is anything at all in localStorage
let allLaps = JSON.parse(localStorage.getItem('allLapsArr')) || []; // if there is, we get an array of laps

/* ==================== End variables ==================== */

/* Start the worker */
let worker = new Worker('./scripts/worker.js');

// Logic for popup closing
const closePopup = () => {
    addStyleDisplayNone(popupContainer);
}

// Continues the stopwatch and closes the popup
const popupClickYes = () => {
    start();
    closePopup();
}

// Resets the popup and closes the popup
const popupClickNo = () => {
    reset();
    closePopup();
}

// If localStorage is not empty, then we proceed further, otherwise we display the main button
if (localStorageRender) {
    // Get data from localStorage and send to worker
    let data = {
        milliseconds: JSON.parse(localStorage.getItem('milliseconds')),
        seconds: JSON.parse(localStorage.getItem('seconds')),
        minutes: JSON.parse(localStorage.getItem('minutes')),
        hours: JSON.parse(localStorage.getItem('hours')),
        lapCount: JSON.parse(localStorage.getItem('lapCount')),
    }
    worker.postMessage({ name: 'render', value: data });

    // Add event handlers for the popup
    popupOverlay.addEventListener('click', closePopup, { once: true });
    popupClose.addEventListener('click', closePopup, { once: true });
    popupYes.addEventListener('click', popupClickYes, { once: true });
    popupNo.addEventListener('click', popupClickNo, { once: true });

    // Show/hide elements
    addStyleFlex(popupContainer, helpersBtns, timerCount, playBtn);
    addStyleDisplayNone(stopBtn, timerBtn, lapBtn);

    // Display current stopwatch values
    numberMilliseconds.innerHTML = data.milliseconds;
    numberSeconds.innerHTML = data.seconds;
    numberMinutes.innerHTML = data.minutes;
    numberHours.innerHTML = data.hours;
    
    // If we have laps in localStorage render them
    if (allLaps.length >= 1) {
        addStyleDisplayBlock(lapResultsBlock);

        allLaps.map(item => {
            let result = renderLaps(item);
            lapResultsList.insertAdjacentHTML('beforeend', result);
        })
    }
} else {
    timerBtn.style.display = "inline-block";
}

// Stopwatch start logic
const start = () => {
    worker.postMessage({ name: 'start' });

    // Show/hide elements
    addStyleFlex(helpersBtns,timerCount);
    addStyleDisplayNone(playBtn, timerBtn);
    addStyleDisplayBlock(stopBtn, lapBtn, resetBtn);
}

// Stopwatch stop logic
const stop = () => {
    worker.postMessage({ name: 'stop' });

    // Show/hide elements
    addStyleFlex(playBtn);
    addStyleDisplayNone(stopBtn, lapBtn);
}

// Stopwatch reset logic
const reset = () => {
    worker.postMessage({ name: 'reset' });

    // Reset all elements to default settings
    numberMilliseconds.innerHTML = '00';
    numberSeconds.innerHTML = '00';
    numberMinutes.innerHTML = '00';
    numberHours.innerHTML = '00';
    document.title = "Stopwatch";
    lapResultsList.replaceChildren();

    // Show/hide elements
    addStyleFlex(playBtn);
    addStyleDisplayNone(lapResultsBlock, stopBtn, lapBtn, resetBtn);

    // Clear the array with laps and localStorage
    allLaps = [];
    localStorage.clear();
}

// Lap adding logic
const lap = () => {
    worker.postMessage({ name: 'lap' });
    
    // Show/hide elements
    addStyleDisplayBlock(lapResultsBlock);
}

// Processing the response from the worker
worker.onmessage = function(e) {
    // Get variables from the worker
    const { millisecondsValue, secondsValue, minutesValue, hoursValue, lapCount, isLap } = e.data;

    // If there are laps in the answer
    if (isLap === true) {
        // if there are more than 100 or 1000 circles, then add a class so that the number of laps is displayed correctly
        if (lapCount === 100) {
            lapResultsList.classList.add("over-100");
        }
        if (lapCount === 1000) {
            lapResultsList.classList.add("over-1000");
            lapResultsList.classList.remove("over-100");
        }
        
        // Collecting all the necessary data to render the circle
        const valuesLap = { millisecondsValue, secondsValue, minutesValue, hoursValue, lapCount}
        // Get html markup via renderLaps()
        let result = renderLaps(valuesLap);
        // Render a lap on the page
        lapResultsList.insertAdjacentHTML('beforeend', result);
        // Write the lap to an array with laps
        allLaps.push(valuesLap);

        // Write values to localStorage
        localStorage.setItem('allLapsArr', JSON.stringify(allLaps));
        localStorage.setItem('lapCount', JSON.stringify(lapCount));
    }

    // Write values to localStorage
    localStorage.setItem('milliseconds', JSON.stringify(millisecondsValue));
    localStorage.setItem('seconds', JSON.stringify(secondsValue));
    localStorage.setItem('minutes', JSON.stringify(minutesValue));
    localStorage.setItem('hours', JSON.stringify(hoursValue));
    
    // Display actual values
    numberMilliseconds.innerHTML = millisecondsValue;
    numberSeconds.innerHTML = secondsValue;
    numberMinutes.innerHTML = minutesValue;
    numberHours.innerHTML = hoursValue;
    document.title = `Time: ${hoursValue} : ${minutesValue} : ${secondsValue}`;
};

// Event handlers for buttons (helpersBtns)
timerBtn.addEventListener('click', start);
playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);