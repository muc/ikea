 $(document).ready(function(){
   $('.ikeafont').click(function() {
     $('footer').toggle();
   });

   // video control
   var video = document.getElementsByTagName('video')[0];
   
   console.log(video);

   $('footer').click(function() {
    if (video.paused) {
      video.play();
      $('#play_pause').html('Pause');
    }
    else {
      video.pause();
      $('#play_pause').html('Play');
    }
   });
 });