 $(document).ready(function(){

  $('.kwicks').kwicks({
    min : 65,
    spacing : 1,
    sticky : true,
    event : 'click',
    defaultKwick: 2,
  });

   var video = $('video').get(0);

   $('header').click(function() {
     $('.kwicks > li#step_3').trigger('click');
   });
   
   $('#player_control').click(function() {
    video.paused ? video.play() : video.pause();
   });
 });