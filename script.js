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

JavaScript;
if ("LinearAccelerationSensor" in window && "Gyroscope" in window) {
  document.getElementById("moApi").innerHTML = "Generic Sensor API";

  let lastReadingTimestamp;
  let accelerometer = new LinearAccelerationSensor();
  accelerometer.addEventListener("reading", (e) => {
    if (lastReadingTimestamp) {
      intervalHandler(
        Math.round(accelerometer.timestamp - lastReadingTimestamp)
      );
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, "result");
  });
  accelerometer.start();

  if ("GravitySensor" in window) {
    let gravity = new GravitySensor();
    gravity.addEventListener("reading", (e) =>
      accelerationHandler(gravity, "moAccelGrav")
    );
    gravity.start();
  }

  let gyroscope = new Gyroscope();
  gyroscope.addEventListener("reading", (e) =>
    rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z,
    })
  );
  gyroscope.start();
} else if ("DeviceMotionEvent" in window) {
  document.getElementById("moApi").innerHTML = "Device Motion API";

  var onDeviceMotion = function (eventData) {
    accelerationHandler(eventData.acceleration, "result");
    accelerationHandler(eventData.accelerationIncludingGravity, "moAccelGrav");
    rotationHandler(eventData.rotationRate);
    intervalHandler(eventData.interval);
  };

  window.addEventListener("devicemotion", onDeviceMotion, false);
} else {
  document.getElementById("moApi").innerHTML =
    "No Accelerometer & Gyroscope API available";
}

function accelerationHandler(acceleration, targetId) {
  var info,
    xyz = "[X, Y, Z]";

  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
  var info,
    xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.getElementById("moInterval").innerHTML = interval;
}
