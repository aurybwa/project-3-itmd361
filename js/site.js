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
                    '<li class="info-label" id="country-name">Country</li>' +
                    '<li class="info">' + name + '</li>' +
                    '<li class="info-label" id="country-capital">Capital</li>' +
                    '<li class="info">' + capital + '</li>' +
                    '<li class="info-label" id="two-letter-country-code">Two-letter country code</li>' +
                    '<li class="info">' + twoLetterCountryCode + '</li>' +
                    '<li class="info-label" id="three-letter-country-code">Three-letter country code</li>' +
                    '<li class="info">' + threeLetterCountryCode + '</li>' +
                    '<li class="info-label" id="calling-code">Calling code</li>' +
                    '<li class="info">' + callingCode + '</li>' +
                    '<li class="info-label" id="country-region">Region</li>' +
                    '<li class="info">' + region  + '</li>' +
                    '<li class="info-label" id="subregion">Subregion</li>' +
                    '<li class="info">' + subregion + '</li>' +
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
