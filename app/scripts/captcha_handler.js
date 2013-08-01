/*global define */
define([], function () {
	var CAPTCHA_VERIFY_URL = "scripts/verify.php";

    'use strict';
    var verifyCaptcha = function(){
	    var postData = {
	        "recaptcha_challenge_field": Recaptcha.get_challenge(),
	        "recaptcha_response_field": Recaptcha.get_response()
	    }

	    var jqxhr = $.ajax({
	        url: CAPTCHA_VERIFY_URL,
	        type: 'post',
	        contentType: "application/x-www-form-urlencoded",
	        data: postData
	    });
	    jqxhr.done(function(data) {
	        var json = JSON.parse(data);
	        if (json.result === "ok"){
	            Recaptcha.destroy();
	            $('#captchaContainer').remove();
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
	}

	return {
		verifyCaptcha: verifyCaptcha
	}
});