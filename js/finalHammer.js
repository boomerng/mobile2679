
var element = document.getElementById('element2');
var action = false;

var mc = new Hammer.Manager(element);
mc.add(new Hammer.Pinch({pointers: 2}));
mc.add(new Hammer.Press({pointers: 1}));

mc.on("pinchin", function() {
      if (!action) {
            element.classList.add("pinchIn");
      }
      action = true;
});

mc.on("pinchout", function() {
      if (!action) {
            element.classList.add("pinchOut");
      }
      action = true;
});

mc.on("pinchend", function() {
      element.classList.remove("pinchIn");
      element.classList.remove("pinchOut");
      action = false;
});

mc.on("press", function() {
      if (element.className.indexOf("transCircle") > -1) {
            element.classList.remove("transCircle");
       } else {
            element.classList.add("transCircle");
       }
});