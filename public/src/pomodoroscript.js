// Clock function


window.onload = () => {
    startTime();
    day();
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    if (document.getElementById('24-hours').checked) {
        h = today.getHours('en-US',{hour12:false});
        document.getElementById('current-time').innerHTML = h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
    } else {
        document.getElementById('current-time').innerHTML =  h + ":" + m + ":" + s + " " + ampm;
        setTimeout(startTime, 1000);
    }
}

  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function day(){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    document.getElementById('current-date').innerHTML = dayName;
}

// Pomodoro logic

// let workTittle = document.getElementById('work');
// let breakTittle = document.getElementById('break');
// let workTime = 1;
// let breakTime = 1;

// let seconds = "00"

// // display
// window.onload = () => {
//     document.getElementById('minutes').innerHTML = workTime;
//     document.getElementById('seconds').innerHTML = seconds;

//     workTittle.classList.add('active');
//     startTime();
//     day();
// }

// // start timer
// function start() {
//     // change button
//     document.getElementById('start').style.display = "none";
//     document.getElementById('reset').style.display = "block";

//     // change the time
//     seconds = 59;

//     let workMinutes = workTime - 1;
//     let breakMinutes = breakTime - 1;

//     breakCount = 0;

//     // countdown
//     let timerFunction = () => {

//             //change the display
//             document.getElementById('minutes').innerHTML = workMinutes;
//             document.getElementById('seconds').innerHTML = seconds;

//             // start
//             seconds = seconds - 1;

//             if(seconds === 0) {
//                 workMinutes = workMinutes - 1;
//                 if(workMinutes === -1 ){
//                     if(breakCount % 2 === 0) {
//                         // start break
//                         workMinutes = breakMinutes;
//                         breakCount++

//                         // change the painel
//                         workTittle.classList.remove('active');
//                         breakTittle.classList.add('active');
//                     }else {
//                         // continue work
//                         workMinutes = workTime;
//                         breakCount++

//                         // change the painel
//                         breakTittle.classList.remove('active');
//                         workTittle.classList.add('active');
//                     }
//                 }
//                 seconds = 59;
//             }
//     }

//     // start countdown
//     setInterval(timerFunction, 1000); // 1000 = 1s
// }

const timer = {
    pomodoro: 25,
    shortBreak: 5,
    sessions: 0,
  };
  
  let interval;
  let workTittle = document.getElementById('work');
  let breakTittle = document.getElementById('break');
  
  const buttonSound = new Audio('/public/sounds/button-sound.mp3');
  const mainButton = document.getElementById('start');
  mainButton.addEventListener('click', () => {
    buttonSound.play();
    const { action } = mainButton.dataset;
    if (action === 'start') {
      startTimer();
    } else {
      stopTimer();
    }
  });

  
  const modeButtons = document.querySelector('#js-mode-buttons');
  modeButtons.addEventListener('click', handleMode);
  
  function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
  }
  
  function startTimer() {
    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "inline-block";
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;
  
    if (timer.mode === 'pomodoro') timer.sessions++;
  
    mainButton.dataset.action = 'stop';
    mainButton.classList.add('active');
  
    interval = setInterval(function() {
      timer.remainingTime = getRemainingTime(endTime);
      updateClock();
  
      total = timer.remainingTime.total;
      if (total <= 0) {
        clearInterval(interval);
  
        switch (timer.mode) {
          case 'pomodoro':
            switchMode('shortBreak');
            break;
          default:
            switchMode('pomodoro');
        }
  
        if (Notification.permission === 'granted') {
          const text =
            timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
          new Notification(text);
        }
  
        document.querySelector(`[data-sound="${timer.mode}"]`).play();
  
        startTimer();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(interval);
    mainButton.dataset.action = 'start';
    mainButton.classList.remove('active');
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('stop').style.display = "none";
    buttonSound.play();
  }
  
  function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('minutes');
    const sec = document.getElementById('seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
  
    const text =
      timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
    const { action } = mainButton.dataset;
    if (action === 'start') {
        document.title = "Daily Tools - My Pomodoro Timer";
    } else {
        document.title = `${minutes}:${seconds} — ${text}`;
    }
  
    // const progress = document.getElementById('js-progress');
    // progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
  }
  
  function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundColor = `var(--${mode})`;
    // document
    //   .getElementById('js-progress')
    //   .setAttribute('max', timer.remainingTime.total);
  
    updateClock();
  }
  
  function handleMode(event) {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    switchMode(mode);
    stopTimer();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window) {
      if (
        Notification.permission !== 'granted' &&
        Notification.permission !== 'denied'
      ) {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            new Notification(
              'Awesome! You will be notified at the start of each session'
            );
          }
        });
      }
    }
  
    switchMode('pomodoro');
  });