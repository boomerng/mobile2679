var eElement = document.getElementById('error');
const video = document.querySelector('video');
let localMediaStream;

var vibrateClick = function() {
    if (!navigator.vibrate) {
        eElement.textContent = "Your device doesn't vibrate.";
    }
    navigator.vibrate([1000, 500, 2000, 5000, 5000]);
};

var batteryClick = function() {
    navigator.getBattery().then(function(battery) {
        var lvl = document.getElementById('level');
        lvl.textContent = battery.level * 100 + '%';
    }).catch(e => eElement.textContent = "Your device doesn't have a battery.");
};

var videoClick = function() {
    if (!hasGetUserMedia()) {
        eElement.textContent = "Your device doesn't support media.";
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        localMediaStream = stream;
        video.srcObject = stream;
    }).catch(e=> eElement.textContent = "You have denied video streaming");
};

var stopClick = function() {
    video.pause();
    localMediaStream.stop();
};

function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  