/*global define */
define([], function () {
    'use strict';

  	/********** VARS **********/ 

    var docElem = document.documentElement,
    header = $('.cbp-af-header'),
    didScroll = false,
    changeHeaderOn = 300;

     var scrollPage = function() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            //classie.add( header, 'cbp-af-header-shrink' );
            header.addClass('cbp-af-header-shrink')
        }
        else {
            //classie.remove( header, 'cbp-af-header-shrink' );
             header.removeClass('cbp-af-header-shrink')
        }
        didScroll = false;
    };

    /********** FUNCTIONS **********/ 
	 
    var scrollY = function() {
        return window.pageYOffset || docElem.scrollTop;
    };

    var init = function() {
    	window.addEventListener( 'scroll', function( event ) {
	            if( !didScroll ) {
	                didScroll = true;
	                setTimeout( scrollPage, 250 );
	            }
	        }, false );
    	activateLinks();
    };


    /** Scroll for links in the menu **/
    var activateLinks = function() {
    	$("header a").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height();
         }else{
              dest=$(this.hash).offset().top;
         }
         //go to destination
         $('html,body').animate({scrollTop:dest}, 400,'swing');
     });
    }

    console.log ('Function: Header')

    return {
	    init: init
	}
});
    