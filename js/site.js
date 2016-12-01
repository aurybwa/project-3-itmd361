// TODO: Use a function closure and release global $
$(document).ready(function() {

    $('#gh-form').on('submit', function(event) {
        event.preventDefault();
        let place = document.getElementById('gh-location').value;
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': place
        }, function(results, status) {
            initMap(results);
        });
        countryInfo(place);
    });

    function countryInfo(location) {
        $.get(
            'https://restcountries.eu/rest/v1/name/' + location,
            function(data) {
                console.log(data[0]);
                var name = data[0].name;
                var capital = data[0].capital;
                var twoLetterCountryCode = data[0].alpha2Code;
                var threeLetterCountryCode = data[0].alpha3Code;
                var callingCode = data[0].callingCodes[0];
                var region = data[0].region;
                var subregion = data[0].subregion;

                var list = '<ul id="country-details">' +
                    '<li id="country-name"> Country: ' + name + '</li>' +
                    '<li id="country-capital"> Capital: ' + capital + '</li>' +
                    '<li id="two-letter-country-code">  Two-letter Country Code: ' + twoLetterCountryCode + '</li>' +
                    '<li id="three-letter-country-code"> Three-letter Country Code: ' + threeLetterCountryCode + '</li>' +
                    '<li id="calling-code"> Country calling code: ' + callingCode + '</li>' +
                    '<li id="country-region"> Country region: ' + region + '</li>' +
                    '<li id="subregion"> Country subregion: ' + subregion + '</li>' +
                    '</ul>';

                $('#primary').append(list);
            });
        event.preventDefault();
    }

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
