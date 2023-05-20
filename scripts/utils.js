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