(function(){
    if (typeof this.$ === 'undefined') {
      throw new Error('zepto.js required');
    } else {
      if (!$.fn.forEach) {
        $.fn.forEach = $.fn.each;
       }
    }
  

    PinchCard = function(){
      
      var touch = {};
      var _this = this;
      var selEl = null;      
      
      $('.stage').bind('touchstart', function(e){
        if ( e.touches.length == 2 ) {
          touch.x1 = e.touches[0].pageX;
          touch.y1 = e.touches[0].pageY;
          touch.x2 = e.touches[1].pageX;
          touch.y2 = e.touches[1].pageY;
          
          // This is a helper node to show what has been selected.
          var el = document.createElement('DIV');
          el.style.top = (((touch.y2 - touch.y1) / 2) + touch.y1);
          el.style.left = (((touch.x1 - touch.x2) / 2) + touch.x1);
          el.className = 'dot';
          $('BODY').append(el);
          
          touch.midY = (((touch.y2 - touch.y1) / 2) + touch.y1);
          touch.midX = (((touch.x1 - touch.x2) / 2) + touch.x1);

          $('.stage DIV').each(function(i){
            if ($(this).offset().top < touch.midY && $(this).offset().top + $(this).offset().height > touch.midY) {
              selEl = this;
            }
          });
          
          $(selEl).css({'backgroundColor':'green'})
          // console.log("Y Element under", touch.midY, touch.midX, el);
          
        }
      }).bind('touchmove',function(e){
    		if (e.touches.length == 2 ) {
    			touch.dx1 = e.touches[0].pageX - touch.x1;
    			touch.dy1 = e.touches[0].pageY - touch.y1;
    			touch.dx2 = e.touches[1].pageX - touch.x2;
    			touch.dy2 = e.touches[1].pageY - touch.y2;

          // console.log(touch.dy1, touch.dy2)
          $(selEl).css({'backgroundColor':'purple'})          
  			}
  			
        
      }).bind('touchend touchcancel', function (e) {
        $('.dot').remove();
        $(selEl).css({'backgroundColor':'#fff'});
        
      });
    }
      
}).call(this);