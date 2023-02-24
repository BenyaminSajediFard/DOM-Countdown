"use strict";

class Timer {
  constructor(durationInput, startBtn, pauseBtn, callbacks) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.interval = null;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    // Event Listeners
    this.startBtn.addEventListener("click", this.start.bind(this));
    this.pauseBtn.addEventListener("click", this.pause.bind(this));
    this.durationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.start();
    });
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }

  start() {
    if (typeof this.timeRemaining === "number") {
      document.body.style.backgroundImage =
        "linear-gradient(to bottom right, #d183e0, #e4353b)";
      document.querySelector(".timer-svg").style.stroke = "#df3d42bd";
      if (this.startBtn.innerText.toLowerCase() === "resume")
        this.startBtn.innerText = "Start";
      this.onStart();
      this.tick();
      this.interval = setInterval(() => {
        this.tick();
      }, 10);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      if (this.timeRemaining !== 0) this.startBtn.innerText = "resume";
    }
  }

  #TODO;
  onDurationChange() {}

  tick() {
    let time = this.timeRemaining;
    if (time <= 0) {
      this.pause();
      this.onComplete();
      document.body.style.backgroundImage =
        "linear-gradient(to bottom right, #39b94a, #e1e435)";
      document.querySelector(".timer-svg").style.stroke = "#39b94a";
    } else {
      time -= 0.01;
      this.onTick();
    }
    if (time >= 0) this.timeRemaining = time.toFixed(2);
  }
}
