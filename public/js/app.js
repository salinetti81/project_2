$(document).ready(function() {
console.log("Don't Panic");

$("#start").click(function() {
  $("main").slideUp("slow", function() {
    // Animation complete.
  });
 // console.log("clicks");
});

$("#top").click(function() {
  $("main").slideDown("slow", function() {
    // Animation complete.
  });
 // console.log("top clicks");
});


// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });

// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// // });
// $( "#submit_button" ).click(function() {
//  console.log('submit button was clicked');
 
//  // $('.info_container').hide();
//  // $( ".new_info" ).append("<li> <%=user.instruments%> </li>");
// });

// initilizes SoundCloud on pop up window
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

//links to sound cloud content to be displayed in window
 SC.get('/tracks/293', function(track) {
  SC.oEmbed(track.permalink_url, document.getElementById('player'));
});


});//ends document.ready

