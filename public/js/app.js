$(document).ready(function() {
console.log("Don't Panic");

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });


// initilizes SoundCloud
SC.initialize({
  client_id: '340f063c670272fac27cfa67bffcafc4',
  redirect_uri: 'http://external.codecademy.com/soundcloud.html'
});

// lists genres
  // SC.get('/tracks', { genres: 'jazz	' }, function(tracks) {
  //   $(tracks).each(function(index, track) {
  //     $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
  //   });
  // });



// Pops up soundcloud login page
  $('a.connect').click(function(e) {
    e.preventDefault();
   SC.connect(function() {
      SC.get('/me', function(me) {
        $('#username').html(me.username);
      });
    });
  });

 SC.get('/tracks/293', function(track) {
  SC.oEmbed(track.permalink_url, document.getElementById('player'));
});


});//ends document.ready

