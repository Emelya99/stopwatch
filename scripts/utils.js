// function to render html for laps
export const renderLaps = ({millisecondsValue, secondsValue, minutesValue, hoursValue, lapCount}) => {
    let htmlContent = `<li class="results-item timer-count">
        <p class="lap-count">lap <span>${lapCount}</span></p>
        <span class="number-hours">${hoursValue}</span><span>:</span>
        <span class="number-minutes">${minutesValue}</span><span>:</span>
        <span class="number-seconds">${secondsValue}</span><span>:</span>
        <span class="number-milliseconds">${millisecondsValue}</span>
    </li>`;

    return htmlContent;
}

// adding a flex property to an element
export const addStyleFlex = (...arr) => {
    arr.map(item => {
        item.style.display = 'flex';
    })
}

// adding a none property to an element
export const addStyleDisplayNone = (...arr) => {
    arr.map(item => {
        item.style.display = 'none';
    })
}

// adding a block property to an element
export const addStyleDisplayBlock= (...arr) => {
    arr.map(item => {
        item.style.display = 'block';
    })
}