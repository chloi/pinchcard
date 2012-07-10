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

      this.fireAction = null;

      $('.stage').bind('touchstart', function(e){
        if ( e.touches.length == 2 ) {
          e.preventDefault();
          
          touch.x1 = e.touches[0].pageX;
          touch.y1 = e.touches[0].pageY;
          touch.x2 = e.touches[1].pageX;
          touch.y2 = e.touches[1].pageY;
                    
          var midY = (((touch.y2 - touch.y1) / 2) + touch.y1);
          var midX = (((touch.x1 - touch.x2) / 2) + touch.x1);

          // Find the element between the touches.
          $('.stage DIV').each(function(i){
            if ($(this).offset().top < midY && $(this).offset().top + $(this).offset().height > midY) {
              selEl = this;
            }
          });

          // $(selEl).css({'border-bottom':'5px solid #000'});
        }
      }).bind('touchmove',function(e){
    		if (e.touches.length == 2 ) {
    		  e.preventDefault();

    			touch.dx1 = e.touches[0].pageX - touch.x1;
    			touch.dy1 = e.touches[0].pageY - touch.y1;
    			touch.dx2 = e.touches[1].pageX - touch.x2;
    			touch.dy2 = e.touches[1].pageY - touch.y2;

          // Normalize the top / bottom movement
          var normDelta = ((touch.dy1 + touch.dy2) / 6);
          
          // Some threshold amount to trigger the move
          if (Math.abs(normDelta) >= 1 && this.fireAction === null) {
            if (normDelta < 0) {
              this.fireAction = 1; // open
              $(selEl).trigger('openPanel');
            } else {
              this.fireAction = 2; // close
              $(selEl).trigger('closePanel');
            }
          }
  			}
      }).bind('touchend touchcancel', function (e) {
        this.fireAction = null;
        // $(selEl).removeClass('drag');
        // $(selEl).css({'border-bottom':'1px solid #000'})
      });

    }
      
}).call(this);