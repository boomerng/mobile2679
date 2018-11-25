
var element = document.getElementById('element');
var introText = document.getElementById('intro');
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var colorIndex = 0;

var mc = new Hammer.Manager(element);
mc.add(new Hammer.Pan({threshold:80, pointers: 0}));
mc.add(new Hammer.Rotate());
mc.add(new Hammer.Tap({ taps: 2 }));

mc.on("panend", function(ev) {
  var fontColor = colors[(colorIndex + 3) % 7];
  var color1 = colors[colorIndex % 7];
  var color2 = colors[++colorIndex % 7];
  
  if(ev.direction === Hammer.DIRECTION_LEFT) 
  {
        introText.textContent = "Panning Left";
        introText.style.color = fontColor;
        element.style.backgroundImage = "linear-gradient(to left, " + color1 + ", " + color2 + ")";
  }
  else if(ev.direction === Hammer.DIRECTION_RIGHT) 
  {
        introText.textContent = "Panning Right";
        introText.style.color = fontColor;
        element.style.backgroundImage = "linear-gradient(to right, " + color1 + ", " + color2 + ")";
  }
  else if(ev.direction === Hammer.DIRECTION_UP) 
  {
        introText.textContent = "Panning Up";
        introText.style.color = fontColor;
        element.style.backgroundImage = "linear-gradient(to top, " + color1 + ", " + color2 + ")";
  }
  else if(ev.direction === Hammer.DIRECTION_DOWN) 
  {
        introText.textContent = "Panning Down";
        introText.style.color = fontColor;
        element.style.backgroundImage = "linear-gradient(to bottom, " + color1 + ", " + color2 + ")";
  }
});

mc.on("rotateend", function() {
   if (element.className.indexOf("transCircle") > -1) {
        element.classList.remove("transCircle");
   } else {
        element.classList.add("transCircle");
   }
});

mc.on("tap", function() {
    element.removeAttribute('style');
    element.removeAttribute('class');
    introText.textContent = "Pan Here";
    introText.style.color = null;
});
