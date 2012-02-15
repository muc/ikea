$(document).ready(function(){

  $('ul.kwicks').stepnav({
    min: 65,
    max: 365,
    listWidth: 960
  });

  var video = $('video').get(0);

  $('header').click(function() {
    $('.kwicks > li[step="' + getNextStep() + '"]').trigger('click');
  });
   
  $('#player_control').click(function() {
   video.paused ? video.play() : video.pause();
  });

  // title = kwick.find('.step_descr').children('h1').html();

});