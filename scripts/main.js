const timerBtn = document.querySelector('.timer'); // timer start button
const playBtn = document.querySelector('.play'); // play button
const stopBtn = document.querySelector('.stop'); // stop button
const resetBtn = document.querySelector('.reset'); // reset start button
const lapBtn = document.querySelector('.lap'); // lap button
const timerCount = document.querySelector('.timer-count'); // time is displayed here
let numberStart = 0; //the number from which the timer starts


// adding 1 second
const tick = () => {
    numberStart++;
    
    if(numberStart < 10) {
        timerCount.innerHTML = `00 : 00 : 0${numberStart}`;
    } else {
        timerCount.innerHTML = `00 : 00 : ${numberStart}`;
    }
}

const intervalId = startTimer();
console.log(intervalId);
// start timer function
function startTimer() {
    return setInterval(tick, 1000);
}

// stop timer function
const stop = () => {
    clearInterval(intervalId);
    console.log(intervalId);
}

// start timer on button click
// timerBtn.addEventListener('click', startTimer, { once:true });
stopBtn.addEventListener('click', stop);