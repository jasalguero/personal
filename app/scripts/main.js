require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        header: {
            deps: ['jquery'],
            exports: 'header'
        }
    }
});

require(['app', 'jquery', 'scroller', 'header'], function (app, $, scroller, header) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);


    /*** INIT STUFF ***/
    header.init();

    new cbpScroller( document.getElementById( 'cbp-so-scroller' ) );

    /** Scroll for links in the menu **/
    
});
