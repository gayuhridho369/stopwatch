const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const minuteText = document.getElementById('minute');
const secondText = document.getElementById('second');
const millisecondText = document.getElementById('millisecond');
const laps = document.getElementById('laps');

let isPlay = false;
let lapItem = 0;
let minute;
let second;
let millisecond;
let minuteCounter = 0;
let secondCounter = 0;
let millisecondCounter = 0;


const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        isPlay = true;

        minute = setInterval(() => {
            ++minuteCounter;
            formatMinuteCounter = minuteCounter;
            if (minuteCounter.toString().split('').length < 2) formatMinuteCounter = ('0' + minuteCounter).slice(-2);
            minuteText.innerText = formatMinuteCounter;
        }, 60 * 1000);

        second = setInterval(() => {
            if (secondCounter === 60) secondCounter = 0;
            ++secondCounter;
            secondText.innerText = ('0' + secondCounter).slice(-2);
        }, 1000);

        millisecond = setInterval(() => {
            if (millisecondCounter === 100) millisecondCounter = 0;
            ++millisecondCounter;
            millisecondText.innerText = ('0' + millisecondCounter).slice(-2);
        }, 10);


        resetButton.removeAttribute('disabled');
        lapButton.removeAttribute('disabled');
    }
    else {
        playButton.innerHTML = 'Play';
        isPlay = false;

        setClearInterval();

        lapButton.setAttribute('disabled', 'true');

    }

}

const reset = () => {
    playButton.innerHTML = 'Play';
    isPlay = false;

    setClearInterval();
    clearLap();

    minuteText.innerText = '00'
    secondText.innerText = '00';
    millisecondText.innerText = '00';

    minuteCounter = 0;
    secondCounter = 0;
    millisecondCounter = 0;

    resetButton.setAttribute('disabled', 'true');
    lapButton.setAttribute('disabled', 'true');
}

const lap = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timestamp = document.createElement('span');

    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'number');
    timestamp.setAttribute('class', 'timestamp');

    formatMinuteCounter = minuteCounter;
    if (minuteCounter.toString().split('').length < 2) formatMinuteCounter = ('0' + minuteCounter).slice(-2);

    number.innerText = `#${++lapItem} `;
    timestamp.innerText = `${formatMinuteCounter} : ${('0' + secondCounter).slice(-2)} : ${('0' + millisecondCounter).slice(-2)}`;

    li.append(number);
    li.append(timestamp);
    laps.append(li);

    laps.scrollTop = laps.scrollHeight;
}

const setClearInterval = () => {
    clearInterval(minute);
    clearInterval(second);
    clearInterval(millisecond);
}

const clearLap = () => {
    lapItem = 0;
    laps.innerHTML = '';
}

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
