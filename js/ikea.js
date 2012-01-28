 $(document).ready(function(){

  $('.kwicks').kwicks({
    min : 65,
    spacing : 1,
    sticky : true,
    event : 'click'
  });

   var video = $('video').get(0);

   $('header').click(function() {
     $('.kwicks > li#step_3').trigger('click');
   });
   
   $('video').click(function() {
    video.paused ? video.play() : video.pause();
   });
 });