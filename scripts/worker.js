let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 0;
let isLap = false;
let interval;

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

const tick = () => {
    milliseconds++;

    if(milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }

    if(seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    if(minutes >= 60) {
        minutes = 0;
        hours++;
    }

    let values = currentlyValues(hours,minutes,seconds,milliseconds);
    
    this.postMessage(values);
}

const startTimer = () => {
    clearInterval(interval);
    interval = setInterval(tick, 10);
}

const stopTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;
    isLap = false;
}

const lapTimer = () => {
    let values = currentlyValues(hours,minutes,seconds,milliseconds);
    lapCount++;
    isLap = true;
    values.lapCount = lapCount;
    values.isLap= isLap;
    this.postMessage(values);
    isLap = false;
}

this.addEventListener('message', function(event) {
    switch(event.data) {
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
    }
});