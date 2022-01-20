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

navigator.permissions.query({ name: "accelerometer" }).then((result) => {
  if (result.state === "denied") {
    result.innerHTML = "Permission to use accelerometer sensor is denied.";
    return;
  } else {
    result.innerHTML = "Permission granted";
  }

  let acl = new Accelerometer({ frequency: 30 });
  let max_magnitude = 0;
  acl.addEventListener(
    "activate",
    () => (result.innerHTML = "Ready to measure.")
  );
  acl.addEventListener(
    "error",
    (error) => (result.innerHTML = `Error: ${error.name}`)
  );
  acl.addEventListener("reading", () => {
    let magnitude = Math.hypot(acl.x, acl.y, acl.z);
    if (magnitude > max_magnitude) {
      max_magnitude = magnitude;
      result.innerHTML = `Max magnitude: ${max_magnitude} m/s2`;
    }
  });
  acl.start();
});
