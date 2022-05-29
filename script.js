const el = document.querySelector('.clock');
const bell = document.querySelector('audio');

const minDiv = document.querySelector('.min');
const secDiv = document.querySelector('.secs');

const startBtn = document.querySelector('.start');
localStorage.setItem('btn', 'focus');

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener('click', () => {
    let btn = localStorage.getItem('btn');

    if (btn === 'focus') {
        mins = +localStorage.getItem('focusTime');
    } else {
        mins = +localStorage.getItem('breakTime');
    }

    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

function decremenT() {
    minDiv.textContent = Math.floor(seconds / 60);
    secDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
    } else {
        mins = 0;
        seconds = 0;
        bell.play();
        let btn = localStorage.getItem('btn');
    }
}