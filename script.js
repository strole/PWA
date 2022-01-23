const httpsLocalhost = require("https-localhost")();
// const app = ...
// const port = 443
const certs = await httpsLocalhost.getCerts();
const server = https.createServer(certs, app).listen(port);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

const checkBox = document.getElementById("myCheck");
const rollingDices = document.getElementById("rollingDices");
const rollingDice = document.getElementById("rollingDice");
const dice2 = document.getElementById("dice2");
const dice = document.getElementById("dice");
const rezultat = document.getElementById("result");
const button = document.querySelector("button");
const konzola = document.getElementById("console");
const notifyButton = document.getElementById("notifyButton");
const batteryLevel = document.getElementById("batteryLevel");

if (
  "getBattery" in navigator ||
  ("battery" in navigator && "Promise" in window)
) {
  var batteryPromise;

  if ("getBattery" in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }
  console.log(batteryPromise);
  batteryPromise.then(function (battery) {
    batteryLevel.innerHTML = battery.level * 100 + "%";
  });
}

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
      rezultat.innerHTML = "Your result is: " + (randomNumber + randomNumber2);
    } else {
      rollingDice.style.display = "none";
      dice2.style.display = "none";
      dice.style.display = "block";
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      dice.src = "/dices/dice" + randomNumber + ".svg";
      rezultat.innerHTML = "Your result is: " + randomNumber;
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
    konzola.innerHTML = "Permission to use accelerometer sensor is denied.";
    return;
  } else {
    konzola.innerHTML = "Granted!";
    let acl = new Accelerometer({ frequency: 30 });
    let max_magnitude = 0;
    acl.addEventListener(
      "activate",
      () => (konzola.innerHTML = "Shake to roll!")
    );
    acl.addEventListener("reading", () => {
      let magnitude = Math.hypot(acl.x, acl.y, acl.z);
      if (magnitude > 50) {
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
            rezultat.innerHTML =
              "Your result is: " + (randomNumber + randomNumber2);
          } else {
            rollingDice.style.display = "none";
            dice2.style.display = "none";
            dice.style.display = "block";
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            dice.src = "/dices/dice" + randomNumber + ".svg";
            rezultat.innerHTML = "Your result is: " + randomNumber;
          }
          button.disabled = false;
        }, 1000);
        button.disabled = true;
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
    });
    acl.start();
  }
});

notifyButton.addEventListener("click", () => {
  navigator.serviceWorker.getRegistration().then((response) => {
    return response.pushManager.getSubscription().then(function (subscription) {
      return response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey(),
      });
    });
  });
  Notification.requestPermission((permission) => {
    if (permission === "granted") {
      registerBackgroundSync();
    } else console.error("Permission was not granted.");
  });
});

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error("Service Worker not supported");
  }

  navigator.serviceWorker.ready
    .then((registration) => registration.sync.register("syncAttendees"))
    .then(() => console.log("Registered background sync"))
    .catch((err) => console.error("Error registering background sync", err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function determineAppServerKey() {
  var vapidPublicKey =
    "BJuxA8VJtvf0CVN__kvn2mNZijU2l3rh6qMcxTRFR25LsfWO7CmUqXBuEF3TjC6yu-VFaXUKSZo2cRfq5j7tVWs";
  return urlBase64ToUint8Array(vapidPublicKey);
}
