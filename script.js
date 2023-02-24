"use strict";

const duration = document.querySelector(".duration");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const circleTimer = document.querySelector(".timer-svg");
const ctArea = parseFloat(window.getComputedStyle(circleTimer).strokeDasharray);
const circleTimerStyle = circleTimer.style;
let tickRate;

const timer = new Timer(duration, start, pause, {
  onStart() {
    if (!tickRate) tickRate = ctArea / parseFloat(duration.value) / 100;
  },
  onTick() {
    circleTimerStyle.strokeDashoffset -= tickRate;
  },
  onComplete() {
    circleTimerStyle.strokeDashoffset = 0;
    tickRate = 0;
  },
});
