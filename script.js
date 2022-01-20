if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

const checkBox = document.getElementById("myCheck");
const rollingDices = document.getElementById("rollingDices");
const rollingDice = document.getElementById("rollingDice");
const dice2 = document.getElementById("dice2");
const dice = document.getElementById("dice");
const result = document.getElementById("result");
const button = document.querySelector("button");

document.getElementById("button").onclick = function () {
  setTimeout(function () {
    if (checkBox.checked == true) {
      rollingDices.style.display = "none";
      dice2.style.display = "block";
      dice.style.display = "block";
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      dice.src = "/dices/dice" + randomNumber + ".svg";
      let randomNumber2 = Math.floor(Math.random() * 6 + 1);
      dice2.src = "/dices/dice" + randomNumber2 + ".svg";
      result.innerHTML = "Your result is: " + (randomNumber + randomNumber2);
    } else {
      rollingDice.style.display = "none";
      dice2.style.display = "none";
      dice.style.display = "block";
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      dice.src = "/dices/dice" + randomNumber + ".svg";
      result.innerHTML = "Your result is: " + randomNumber;
    }
    button.disabled = false;
  }, 1000);
  button.disabled = true;
  navigator.vibrate(1000);
  if (checkBox.checked == true) {
    rollingDices.style.display = "block";
    dice2.style.display = "none";
    dice.style.display = "none";
  } else {
    rollingDice.style.display = "block";
    dice2.style.display = "none";
    dice.style.display = "none";
  }
};

if ("LinearAccelerationSensor" in window && "Gyroscope" in window) {
  let lastReadingTimestamp;
  let accelerometer = new LinearAccelerationSensor();
  accelerometer.addEventListener("reading", (e) => {
    if (lastReadingTimestamp) {
      intervalHandler(
        Math.round(accelerometer.timestamp - lastReadingTimestamp)
      );
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, "moAccel");
  });
  accelerometer.start();
} else if ("DeviceMotionEvent" in window) {
  var onDeviceMotion = function (eventData) {
    let acc =
      Math.abs(eventData.acceleration.x) +
      Math.abs(eventData.acceleration.y) +
      Math.abs(eventData.acceleration.z);
    result.innerHTML = acc;
    if (acc > 15) {
      navigator.vibrate(1000);
      setTimeout(function () {
        if (checkBox.checked == true) {
          rollingDices.style.display = "none";
          dice2.style.display = "block";
          dice.style.display = "block";
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          dice.src = "/dices/dice" + randomNumber + ".svg";
          let randomNumber2 = Math.floor(Math.random() * 6 + 1);
          dice2.src = "/dices/dice" + randomNumber2 + ".svg";
          result.innerHTML =
            "Your result is: " + (randomNumber + randomNumber2);
        } else {
          rollingDice.style.display = "none";
          dice2.style.display = "none";
          dice.style.display = "block";
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          dice.src = "/dices/dice" + randomNumber + ".svg";
          result.innerHTML = "Your result is: " + randomNumber;
        }
      }, 1000);
      if (checkBox.checked == true) {
        rollingDices.style.display = "block";
        dice2.style.display = "none";
        dice.style.display = "none";
      } else {
        rollingDice.style.display = "block";
        dice2.style.display = "none";
        dice.style.display = "none";
      }
    }
  };

  window.addEventListener("devicemotion", onDeviceMotion, false);
}
