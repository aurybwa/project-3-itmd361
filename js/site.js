// TODO: Use a function closure and release global $
$(document).ready(function() {

    $('#gh-form').on('submit', function(event) {
        event.preventDefault();

        //this checks to see if a previous country's information is already displayed.
        //if some information is displayed, it clears it out the element for the next search
        if (!$('#primary').is(':empty')) {
            $('#primary').empty();
        }

        // get the value of the string entered by user into variable called "place"
        let place = document.getElementById('gh-location').value;

        //get the geocoded value of place and use it to make a map with initMap function
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': place
        }, function(results, status) {
            initMap(results);
        });
        countryInfo(place);
    });

    //get country information from RESTcountries API.
    function countryInfo(location) {
        $.get(
            'https://restcountries.eu/rest/v1/name/' + location,
            function(data) {
                var c = data[0];
                var name = c.name;
                var capital = c.capital;
                var twoLetterCountryCode = c.alpha2Code;
                var threeLetterCountryCode = c.alpha3Code;
                var callingCode = c.callingCodes[0];
                var region = c.region;
                var subregion = c.subregion;

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
                    '<li class="info">' + region + '</li>' +
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
