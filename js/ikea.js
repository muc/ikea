var curStep = 1;
var isFader = false;
$(document).ready(function(){

  $('ul.kwicks').stepnav({
    min: 65,
    max: 365,
    listWidth: 960
  });

  var video = $('video').get(0);

  playToggle = function() {
    $('#fader').fadeToggle();
    $('#pc_prev').fadeToggle();
    $('#pc_next').fadeToggle();
    $('#pc_play').fadeToggle();
    isFader = !isFader;
  }

  $('#pc_play').click(function() {
    playToggle();
    video.paused ? video.play() : video.pause();
  });

  $('#pc_next').click(function() {
    $('.kwicks > li[step="' + getNextStep() + '"]').trigger('click');
    // playToggle();
  });

  $('#pc_prev').click(function() {
    $('.kwicks > li[step="' + getPrevStep() + '"]').trigger('click');
    // playToggle();
  });


  $('#videocontainer').click(function() {
    if (curStep == 1) {
      $('.kwicks > li[step="' + getNextStep() + '"]').trigger('click');
      curStep++;
      $('#title_wrapper').show();
      $('#tooltip').show();
      $('#tool_btn').show();
      $('#logo_wrapper').show();
    }
    else {
      playToggle();
      video.paused ? video.play() : video.pause();
    }
  });

  $('#fader').click(function() {
    playToggle();
    video.paused ? video.play() : video.pause();
  });

  $('#title_wrapper').hide();
  $('#tooltip').hide();
  $('#tool_btn').hide();
  $('#logo_wrapper').hide();
  $('#pc_prev').hide();
  $('#pc_next').hide();
  $('#pc_play').hide();

  $('.tooltip_text').html($('#step_1').find('.step_tools').html());
  $('#tool_btn').click(function() {
    if ($('#tooltip').is(":visible")) {
      $('#tool_btn').css({
        'background-image': 'url(../img/toolicon.png)'
      });
    }
    else {
      $('#tool_btn').css({
        'background-image': 'url(../img/close_icon.png)'
      });
    }
    $('#tooltip').fadeToggle(500);
  });


  // title = kwick.find('.step_descr').children('h1').html();

});