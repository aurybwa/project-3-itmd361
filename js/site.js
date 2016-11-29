// TODO: Use a function closure and release global $
$(document).ready(function() {
  /*
  $('#primary').append('<p>I am first</p>');
  $.get(
    'https://api.github.com/users/karlstolley',
    function(data) {
      $('#primary').append(
        '<p><a href="'+ data.html_url+'">'+data.login+'</a></p>'
      );
    });
  $('#primary').append('<p>I am third</p>');
  */
  $('#gh-form').on('submit', function(event) {
    var query = $('#gh-location').val();
    $.get(
      'https://api.github.com/users/' + query,
      function(data) {
        $('#primary').append(
          '<p><a href="'+ data.html_url+'">'+data.login+'</a></p>'
        );
      });
    event.preventDefault();
  });
});
