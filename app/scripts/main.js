require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        'recaptcha': 'http://www.google.com/recaptcha/api/js/recaptcha_ajax'
    },
    waitSeconds: 40,
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

require(['app', 'jquery', 'scroller', 'header', 'recaptcha', 'captcha_handler'], function (app, $, scroller, header, recaptcha, captcha_handler) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);

    /*** INIT STUFF ***/
    header.init();

    new cbpScroller(document.getElementById('cbp-so-scroller'));

    Recaptcha.create('6LdKl-QSAAAAANEmWQCYY9qUFQTOZjXBVaNfFTYu',
        'recaptcha', {
            theme: 'clean'
        }
    );

    

    $('#captchaSubmit').on('click', captcha_handler.verifyCaptcha);
});