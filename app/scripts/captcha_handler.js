/*global define */
define([], function () {
    'use strict';

	var CAPTCHA_VERIFY_URL = 'http://jasalguero.com/scripts/verify.php';
	var MAIL_SERVER_URL =  'http://jasalguero.com/scripts/sendMail.php';


	/*********************************
     *      FUNCTION DECLARATIONS
     *********************************/

    var verifyCaptcha = function(){
	    var postData = {
	        'recaptcha_challenge_field': Recaptcha.get_challenge(),
	        'recaptcha_response_field': Recaptcha.get_response()
	    };

	    var jqxhr = $.ajax({
	        url: CAPTCHA_VERIFY_URL,
	        type: 'post',
	        contentType: 'application/x-www-form-urlencoded',
	        data: postData
	    });

	    jqxhr.done(function(data) {
	        var json = JSON.parse(data);
	        if (json.result === 'ok'){
	            
	            $('#captcha-container').hide(300, function(){
	            	Recaptcha.destroy();
	            });
	            enableSubmitButton();
	        }else{
	            handleCaptchaFail(data);
	        }

	    });
	    jqxhr.fail(handleCaptchaFail);
	};

	var handleCaptchaFail = function(data){
	    Recaptcha.reload();
	    $('#captchaSubmit').html('mmm, please try again!');
	};

    var sendMail = function(){
        var postData = {
            "posName": $('#contactName').val(),
            "posText": $('#contactComment').val(),
            "posEmail": $('#contactEmail').val()
        };
        var jqxhr = $.ajax({
            url: MAIL_SERVER_URL,
            type: 'post',
            contentType: "application/x-www-form-urlencoded",
            data: postData
        });
        jqxhr.done(function() { alert("Message sent! Thanks for contacting, I'll try to come back to you as soon as possible!"); })
        jqxhr.fail(function() { alert("Ouch, there was an error sending the message, please try again or later :("); })
    };

	var enableSubmitButton = function(){
	    var submitButton = $('#formSubmit');
	    submitButton.removeClass('disabled');
	    submitButton.removeAttr('disabled');
	    submitButton.toggle();
	    submitButton.on('click', function(event){
	        sendMail();
	        event.preventDefault();
	        document.getElementById("contactform").reset();
	    });
	}

	return {
		verifyCaptcha: verifyCaptcha
	}
});