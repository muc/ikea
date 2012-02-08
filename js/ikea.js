$(document).ready(function(){

  var video = $('video').get(0);

  $('header').click(function() {
    $('.kwicks > li#step_3').trigger('click');
  });
   
  $('#player_control').click(function() {
   video.paused ? video.play() : video.pause();
  });


  var isScrolling = false;
  var kwicks = $('ul.kwicks');
  var min = 65;
  var max = 365;
  var lis = kwicks.children('li');
  var steps = lis.size();
  var listwidth = max + (steps - 1) * min + steps;
  var listoff = listwidth - 960;


  // step scroller helper function
  function show_left_scroller(show) {
    if (show) {
      $('#scroll_left').fadeIn();
      $('#arrow_left').fadeIn();
    }
    else {
      $('#scroll_left').fadeOut();
      $('#arrow_left').fadeOut();
    }
  }

  function show_right_scroller(show) {
    if (show) {
      $('#scroll_right').fadeIn();
      $('#arrow_right').fadeIn();
    }
    else {
      $('#scroll_right').fadeOut();
      $('#arrow_right').fadeOut();
    }
  }

  if (listoff > 0) {
    show_right_scroller(true);
  }



  // accordion
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
      console.log(isScrolling);
      if (isScrolling) {
        isScrolling = false;
        return;
      }

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


  
  // step swiping
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
  });

  $('.kwicks').mousedown(function(ed) {
    var x = ed.clientX;
    
    $(this).bind('mousemove', function(e) {
      isScrolling = true;
      var left = parseInt($('.kwicks').css('left').replace(/px/, ''));
      var delta = e.clientX - x;
      var new_left = left + delta;
      $('.kwicks').css('left', new_left);

      if (listoff > 0) {
        show_left_scroller(new_left < 0);
        show_right_scroller(listoff + new_left > 0);
      }
      x = e.clientX;
    });
  });


  // step arrow clicking
  $('.arrow').click(function() {
    var left = parseInt($('.kwicks').css('left').replace(/px/, ''));
    var new_left = $(this).attr('id') == 'arrow_left' ? left + 66 : left - 66;

    new_left = new_left > 0 ? 0 : new_left;
    new_left = new_left < (0 - listoff) ? 0 - listoff : new_left;

    if (listoff > 0) {
      show_left_scroller(new_left < 0);
      show_right_scroller(listoff + new_left > 0);
    }
    $('.kwicks').animate({left: new_left}, 250);
  });



});