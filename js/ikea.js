$(document).ready(function(){

  // $('.kwicks').kwicks({
  //   min : 65,
  //   // max: 90,
  //   spacing : 1,
  //   sticky : true,
  //   event : 'click'
  //   // defaultKwick: 2,
  // });

  var video = $('video').get(0);

  $('header').click(function() {
    $('.kwicks > li#step_3').trigger('click');
  });
   
  $('#player_control').click(function() {
   video.paused ? video.play() : video.pause();
  });

  // pseudo kwicks
  var kwicks = $('ul.kwicks');
  var min = 65;
  var max = 365;
  var lis = kwicks.children('li');
  var steps = lis.size();
  lis.each(function(idx, val) {
    var kwick = $(this);
    kwick.css({
      margin: 0,
      position: 'absolute'
    });

    // first element
    if (idx == 0) {
      kwick.css({
        left: 0,
        width: max
      });      
      kwick.addClass('active');
    }
    else {
      kwick.css({
        left: max + (idx - 1) * min + idx * 1,
        width: min
      });
    }

    kwick.click(function() {
      if (!kwick.hasClass('active')) {
        var ai = 0;
        lis.each(function(i) {
          if ($(this).hasClass('active')) {
            ai = i;
          }
        });
        var active = kwicks.find('.active');
        lis.removeClass('active');
        kwick.addClass('active');

        var from = ai < idx ? ai : idx;
        var to = ai > idx ? ai : idx;

        active.animate({
          width: min,
          left: ai == to ? max + (ai - 1) * min + ai * 1 : ai * min + ai
        });

        kwick.animate({
          width: max,
          left: idx * min + idx
        });

        for (i = from + 1; i < to; i++) {
          var left = 0;
          if (ai == to) {
            left = max + (i - 1) * min + i * 1
          }
          else {
            left = i * min + i;
          }
          lis.eq(i).animate({
            left: left
          });
        }

      }
    });
  });


  var listwidth = max + (steps - 1) * min + steps;
  var listoff = listwidth - 960;
  console.log(listoff);

  $('body').mouseup(function() {
    kwicks.unbind('mousemove');
    if (parseInt(kwicks.css('left').replace(/px/, '')) > 0) {
      kwicks.animate({
        left: 0
      }, 100);
    }
    if (parseInt(kwicks.css('left').replace(/px/, '')) < (0 - listoff)) {
      kwicks.animate({
        left: 0 - listoff
      }, 100);
    }
    return false;
  });

  
  $('.kwicks').mousedown(function(ed) {
    var x = ed.clientX;
    
    $(this).bind('mousemove', function(e) {
      var left = parseInt($('.kwicks').css('left').replace(/px/, ''));
      var delta = e.clientX - x;
      var new_left = left + delta;
      $('.kwicks').css('left', new_left);
      x = e.clientX;
    });
  });



});