export const currentlyValues = (hours,minutes,seconds,milliseconds) => {
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

export const moreNineTimes = (timeType,block) => {
    if(timeType > 9) {
        block.innerHTML = timeType;
    } else {
        block.innerHTML = `0${timeType}`;
    }
}

export const equalsSixty = (timeType, timeTypeNext) => {
    if(timeType === 60) {
        timeType = 0;
        timeTypeNext++;
    }
}