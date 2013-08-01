require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);

    var cbpAnimatedHeader = (function() {
     
        var docElem = document.documentElement,
            //header = document.querySelector( '.cbp-af-header' ),
            header = $('.cbp-af-header'),
            didScroll = false,
            changeHeaderOn = 300;
     
        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }
     
        function scrollPage() {
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
        }
     
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
     
        init();
     
    })();

    /**
     * cbpScroller.js v1.0.0
     * http://www.codrops.com
     *
     * Licensed under the MIT license.
     * http://www.opensource.org/licenses/mit-license.php
     * 
     * Copyright 2013, Codrops
     * http://www.codrops.com
     */
    ( function( window ) {
         
        'use strict';
     
        var docElem = window.document.documentElement;
     
        function getViewportH() {
            var client = docElem['clientHeight'],
                inner = window['innerHeight'];
             
            if( client < inner )
                return inner;
            else
                return client;
        }
     
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
     
        // http://stackoverflow.com/a/5598797/989439
        function getOffset( el ) {
            var offsetTop = 0, offsetLeft = 0;
            do {
                if ( !isNaN( el.offsetTop ) ) {
                    offsetTop += el.offsetTop;
                }
                if ( !isNaN( el.offsetLeft ) ) {
                    offsetLeft += el.offsetLeft;
                }
            } while( el = el.offsetParent )
     
            return {
                top : offsetTop,
                left : offsetLeft
            }
        }
     
        function inViewport( el, h ) {
            var elH = el.offsetHeight,
                scrolled = scrollY(),
                viewed = scrolled + getViewportH(),
                elTop = getOffset(el).top,
                elBottom = elTop + elH,
                // if 0, the element is considered in the viewport as soon as it enters.
                // if 1, the element is considered in the viewport only when it's fully inside
                // value in percentage (1 >= h >= 0)
                h = h || 0;
     
            return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
        }
     
        function extend( a, b ) {
            for( var key in b ) { 
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        }
     
        function cbpScroller( el, options ) {   
            this.el = el;
            this.options = extend( this.defaults, options );
            this._init();
        }
     
        cbpScroller.prototype = {
            defaults : {
                // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
                // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
                // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
                viewportFactor : 0.2
            },
            _init : function() {
                if( Modernizr.touch ) return;
                this.sections = Array.prototype.slice.call( this.el.querySelectorAll( '.cbp-so-section' ) );
                this.didScroll = false;
     
                var self = this;
                // the sections already shown...
                this.sections.forEach( function( el, i ) {
                    if( !inViewport( el ) ) {
                        $(el).addClass('cpb-so-init');
                        //classie.add( el, 'cbp-so-init' );
                    }
                } );
     
                var scrollHandler = function() {
                        if( !self.didScroll ) {
                            self.didScroll = true;
                            setTimeout( function() { self._scrollPage(); }, 60 );
                        }
                    },
                    resizeHandler = function() {
                        function delayed() {
                            self._scrollPage();
                            self.resizeTimeout = null;
                        }
                        if ( self.resizeTimeout ) {
                            clearTimeout( self.resizeTimeout );
                        }
                        self.resizeTimeout = setTimeout( delayed, 200 );
                    };
     
                window.addEventListener( 'scroll', scrollHandler, false );
                window.addEventListener( 'resize', resizeHandler, false );
            },
            _scrollPage : function() {
                var self = this;
     
                this.sections.forEach( function( el, i ) {
                    if( inViewport( el, self.options.viewportFactor ) ) {
                        //classie.add( el, 'cbp-so-animate' );
                        $(el).addClass('cbp-so-animate');
                    }
                    else {
                        // this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scroll
                       // classie.add( el, 'cbp-so-init' );
                        $(el).addClass('cbp-so-init');
                         
                        //classie.remove( el, 'cbp-so-animate' );
                        $(el).removeClass('cbp-so-animate');
                    }
                });
                this.didScroll = false;
            }
        }
     
        // add to global namespace
        window.cbpScroller = cbpScroller;
     
    } )( window );

    new cbpScroller( document.getElementById( 'cbp-so-scroller' ) );

    /** Scroll for links in the menu **/
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
});
