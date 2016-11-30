// TODO: Use a function closure and release global $
$(document).ready(function() {

    $('#gh-form').on('submit', function(event) {
        event.preventDefault();
        let place = document.getElementById('gh-location').value;
          // sorry I was using jquery syntax here--- should be value
          // for vanilla js and val() for jquery
          console.log(place);
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': place}, function(results, status) {
          initMap(results);
        });
    });

      function initMap(place) {

        // place to lat, long object

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: place[0].geometry.location
          });

          var marker = new google.maps.Marker({
            position: place[0].geometry.location,
            map: map
          });
      }

});
