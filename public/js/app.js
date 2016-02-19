$(document).ready(function() {
console.log("Don't Panic");

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });

SC.initialize({
  client_id: '340f063c670272fac27cfa67bffcafc4',
  redirect_uri: 'http://external.codecademy.com/soundcloud.html'
});


  SC.get('/tracks', { genres: 'rap' }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
    });
  });




  $('a.connect').click(function(e) {
    e.preventDefault();
   SC.connect(function() {
      SC.get('/me', function(me) {
        $('#username').html(me.username);
      });
    });
  });
});