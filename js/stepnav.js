(function($){
  $.fn.stepnav = function(options) {
    
    var defaults = {
      min: 50,
      max: 350,
      defaultStep: 1,
      listWidth: 550,

    };

    var o = $.extend(defaults, options);
    var container = this;

    return this.each(function() {
      var isScrolling = false;
      var currentStep = o.defaultStep;
      var steps = container.children('li');
      var stepCount = steps.size();
      var listOff = o.max + (stepCount - 1) * o.min + stepCount - o.listWidth;

      playToggle = function() {
        $('#fader').fadeToggle();
        $('#pc_prev').fadeToggle();
        $('#pc_next').fadeToggle();
        $('#pc_play').fadeToggle();
        $('#pc_seek').fadeToggle();
        isFader = !isFader;
      }

      createSeek = function() {
        var video = $('video').get(0);
        if(video.readyState) {
          var video_duration = video.duration;
          $('#pc_seek').slider({
            value: 0,
            step: 0.01,
            orientation: "horizontal",
            range: "min",
            max: video_duration,
            animate: true,          
            slide: function(e, ui){              
              seeksliding = true;
              if (ui.value < video_duration) {
                $('#pc_descr').fadeOut();
              }
            },
            stop:function(e,ui){
              seeksliding = false;  
              video.currentTime = ui.value;
            }
          });
        } else {
          setTimeout(createSeek, 150);
        }
      };

      getNextStep = function() {
        return currentStep == stepCount ? currentStep : currentStep + 1;
      }

      getPrevStep = function() {
        return currentStep == 1 ? 1 : currentStep -1;
      }

      getOffset = function() {
        return parseInt(container.css('left').replace(/px/, ''));
      }

      showLeftScroller = function(show) {
        if (show) {
          $('#scroll_left').fadeIn();
          $('#arrow_left').fadeIn();
        }
        else {
          $('#scroll_left').fadeOut();
          $('#arrow_left').fadeOut();
        }
      }

      showRightScroller = function(show) {
        if (show) {
          $('#scroll_right').fadeIn();
          $('#arrow_right').fadeIn();
        }
        else {
          $('#scroll_right').fadeOut();
          $('#arrow_right').fadeOut();
        }
      }

      moveScroller = function(direction, nr) {
        var nr = nr || 1;
        var left = getOffset();
        var newLeft = direction == 'left' ? left + (o.min + 1) * nr : left - (o.min + 1) * nr;
        newLeft = newLeft > 0 ? 0 : newLeft;
        newLeft = newLeft < (0 - listOff) ? 0 - listOff : newLeft;

        if (listOff > 0) {
          showLeftScroller(newLeft < 0);
          showRightScroller(listOff + newLeft > 0);
        }
        container.animate({left: newLeft}, 250);
      }

      // step swiping
      $('body').bind('mouseup touchend', function() {
        container.unbind('mousemove touchmove');
        if (getOffset() > 0) {
          container.animate({
            left: 0
          }, 100);
        }
        if (getOffset() < (0 - listOff)) {
          container.animate({
            left: 0 - listOff
          }, 100);
        }
      });

      // kwicks.mousedown(function(ed) {
      container.bind('touchstart mousedown', function(ed) {
        var x = ed.clientX;
        
        $(this).bind('touchmove mousemove', function(e) {
          isScrolling = true;
          var left = getOffset();
          var delta = e.clientX - x;
          var newLeft = left + delta;
          container.css('left', newLeft);

          if (listOff > 0) {
            showLeftScroller(newLeft < 0);
            showRightScroller(listOff + newLeft > 0);
          }
          x = e.clientX;
        });
      });

      // step arrow clicking
      $('.arrow').click(function() {
        var direction = $(this).attr('id') == 'arrow_left' ? 'left' : 'right';
        moveScroller(direction);
      });

      if (listOff > 0) {
        showRightScroller(true);
      }

      steps.each(function(idx, val) {

        var step = $(this);
        step.css({
          margin: 0,
          position: 'absolute'
        });

        if (idx == 0) {
          step.css({
            left: 0,
            width: o.max
          });
          step.addClass('active');
        }
        else {
          step.css({
            left: o.max + (idx - 1) * o.min + idx,
            width: o.min
          });
        }

        step.click(function() {
          if (isScrolling) {
            isScrolling = false;
            return;
          }
          if (step.hasClass('active')) {
            return;
          }

          var ai = 0;
          steps.each(function(i) {
            if ($(this).hasClass('active')) {
              ai = i;
            }
          });

          var active = container.find('.active');
          steps.removeClass('active');
          step.addClass('active');
          var prevStep = currentStep;
          currentStep = parseInt(step.attr('step'));
          curStep = currentStep;

          // stopp anny running animations
          $('#title_wrapper').stop(true, true);

          // Load Video
          $('video').attr('poster', 'data/step' + step.attr('step') + '.png');
          
          if (currentStep == 1) {
            $('video').get(0).pause();
            $('video').attr('src', '');
            $('video').attr('poster', 'data/step1.png');

            $('#title_wrapper').hide();
            $('#tooltip').hide();
            $('#tool_btn').hide();
            $('#logo_wrapper').hide();
            if (isFader) {
              playToggle();
            }
          }
          else {
            $('video').attr('src', 'data/step' + step.attr('step') + '.mp4');
            createSeek();
            // Set Step Tools
            $('.tooltip_text').html(step.find('.step_tools').html());
            $('#tooltip').fadeIn();
            $('#tool_btn').css({
              'background-image': 'url("img/close_icon.png")'
            });
            // Set Step Title
            $('.step_title').html('Schritt ' + step.attr('step') + ': ' + step.find('.step_descr').children('h1').html());
            $('#title_wrapper').fadeIn().delay(5000).fadeOut(1000);

            if (isFader) {
              playToggle();
            }

            $('video').get(0).play();
          }

          if (prevStep == 1) {
            $('#title_wrapper').show();
            $('#tooltip').show();
            $('#tool_btn').show();
            $('#logo_wrapper').show();
          }



          if (currentStep + getOffset() / (o.min + 1) < 4) {
            var nr = (4 - (currentStep + getOffset() / (o.min + 1)));
            moveScroller('left', nr);
          }
          if (10 + getOffset() / 66 - currentStep < 3) {
            var nr = (3 - (10 + getOffset() / (o.min + 1) - currentStep));
            moveScroller('right', nr);
          }

          var from = ai < idx ? ai : idx;
          var to = ai > idx ? ai : idx;

          active.animate({
            width: o.min,
            left: ai == to ? o.max + (ai - 1) * o.min + ai : ai * o.min + ai
          });

          $(this).animate({
            width: o.max,
            left: idx * o.min + idx
          });

          for (i = from + 1; i < to; i++) {
            steps.eq(i).animate({
              left: ai == to ? left = o.max + (i - 1) * o.min + i : left = i * o.min + i
            });
          }

        }); // end bind click

      }); // each li

    }); // return this;
  };
})(jQuery);