$(document).ready(function() {
    if (Modernizr.progressbar && Modernizr.meter) {
        $('#progressContainer').append('<br/><progress id="progressBar" max="6"></progress><br/><meter id="meterBar" max="6"></meter>');
      } else {
        $('#progressContainer').append('<label>not support progress or meter');
      }

      $('input').off('change').on('change', function(e) {
        var progress = getProgress();
        $('#progressBar').val(progress);
        $('#meterBar').val(progress);
      });

      var getProgress = function() {
          return 4;
      }

    var getLocation = function() {
        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $('#geoLocation').text('geo location not supported');
        }
    }

    var showPosition = function(position) {
        $('#geoLocation').text("Your current location: Latitude: " + position.coords.latitude + "   Longitude: " + position.coords.longitude); 
    }

    $('#getGeoLocation').click(function() {
        getLocation();
    });
});