
// Login Asychronous Request
$('#SignIn').click(function () {
    validateInput('validateLogin') // Form Validation

    //Sending asynchronous request
    if (authenticate.flag == true) {
        $('#SignIn').html('<img src="./images/dual-ring-loader.gif" width="32" />');

        setTimeout(function () {
            $.ajax({
                url: '/config/auth.php',
                type: authenticate.requestType[0],
                dataType: authenticate.dataType,
                data: {
                    email: authenticate.Email.val(),
                    password: authenticate.Password.val(),
                },
                success: function (asyncRequest) {
                    authenticate.Email.val(null);
                    authenticate.Password.val(null);
                    $('#loginStatus').html(asyncRequest);

                    setTimeout(function () {
                        $('#loginStatus').fadeOut(1000);
                    }, 5000);

                    $('#loginStatus').val(null).show();
                }
            })
        }, 3000);
    }
});



// Password Verification Asychronous Request 
$('#VerifyAccount').click(function () {
    validateInput('validateAccount');

    //Sending asynchronous request
    if (authenticate.flag == true) {
        $('#VerifyAccount').html('<img src="./images/dual-ring-loader.gif" width="32" />');
        setTimeout(function () {
            $.ajax({
                url: '../config/auth.php',
                dataType: authenticate.returnType,
                type: authenticate.requestType[0],
                data: {
                    email: authenticate.Email.val(),
                    answer: authenticate.Answer.val(),
                    securityQuestion: authenticate.Question.val()
                },
                success: function (asyncRequest) {
                    authenticate.Email.val(null);
                    authenticate.Answer.val(null);
                    authenticate.securityQuestion.val(null);

                    if (asyncRequest.status == true) {
                        $('#small-dialog2').html(authenticate.ChangePassword.html());
                        authenticate.verifiedUserId.val(authResponse.userId);
                    }
                    else {

                        $('#AccountVerificationStatus').html(authResponse.error);
                        setTimeout(function () {
                            $('#AccountVerificationStatus').fadeOut(1000);
                        }, 5000);
                        $("#AccountVerificationStatus").val(null).show();
                    }
                }
            })
        }, 3000);
    }
});


// Password Reset Asychronous Request 
$('#ResetPassword').click(function () {
    validateInput('validatePassword');

    //Sending asynchronous request
    if (authenticate.flag == true) {
        $('#ResetPassword').html('<img src="./images/dual-ring-loader.gif" width="32" />');

        if (authenticate.confirmNewPassword.val() == authenticate.Password.val()) {

            setTimeout(function () {
                $.ajax({
                    url: '../config/auth.php',
                    dataType: authenticate.returnType,
                    type: authenticate.requestType[0],
                    data: {
                        password: authenticate.Password.val(),
                        userId: authenticate.verifiedUserId.val()
                    },
                    success: function (asyncRequest) {
                        authenticate.Password.val(null);
                        authenticate.confirmNewPassword.val(null);

                        if (asyncRequest.Status == true) {
                            $('#PasswordResetStatus').html(asyncRequest.Message);
                            setTimeout(function () {
                                $('#PasswordResetStatus').fadeOut(1000);
                                $('#PasswordResetStatus').val('Redirecting...').show();
                                location.href = '../index.html';
                            }, 5000)
                        }
                    }
                })
            }, 3000)
        }
        else {
            $('#PasswordResetStatus').html('<span class="w3-animate-top w3-red w3-padding-8 w3-center">Password Does not match\nTry Agian.</span>')
            setTimeout(function () {
                $('#PasswordResetStatus').fadeOut(1000);
                $('#PasswordResetStatus').val(null).show()
            }, 3000)
        }
    }

});

// New User Registration
$('#SignUp').click(function () {
    validateInput('validateUser');
    //Sending asynchronous request
    if (authenticate.flag == true) {
        $('#SignUp').html('<img src="./images/dual-ring-loader.gif" width="32" />');

        setTimeout(function () {
            $.ajax({
                url: '../config/auth.php',
                type: authenticate.requestType[0],
                dataType: authenticate.returnType,
                data: {
                    fullName: authenticate.fullName.val(),
                    email: authenticate.Email.val(),
                    telephone: authenticate.telephone.val(),
                    securityQuestion: authenticate.Question.val(),
                    answer: authenticate.Answer.val(),
                    password: authenticate.Password.val(),
                    dateOfRegistration: authenticate.getToday()
                },
                success: function (asyncRequest) {
                    authenticate.fullName.val(null);
                    authenticate.Email.val(null);
                    authenticate.telephone.val(null);
                    authenticate.Question.val(null);
                    authenticate.Answer.val(null);
                    authenticate.Password.val(null);
                    $('#SignUpNotification').html(asyncRequest);
                    setTimeout(function () {
                        $('#SignUpNotification').fadeOut(1000);
                        $('#SignUpNotificatioin').val(null).show();
                    }, 5000)
                }
            })
        }, 3000)
    }
})

/**
 * 
 * @param { This function validates form controls when called.
  Each group of controls should have a unique username.
  * 
  EXAMPLE:
  *
  <input type='text' name="Username" required="true" validate />
* 
* <script>
* 
*  validateInput('validate);
* </script>
* } inputArgs 
 */

var
function validateInput(inputArgs) {
    let validInput = $('[' + inputArgs + ']');
    for (let formInput = 0; formInput < validInput.length; formInput++) {
        if (validInput.get(formInput).value == null || validInput.get(formInput).value == '') {
            validInput[formInput].placeholder = 'This field is required';
            return false;
        }
    }
    authenticate.flag = true;
}

var User = {
    flag: false,
    email: {
        signUpEmail: $('#sign-up-email'),
        loginEmail: $('#login-email'),
    },
    password: {
        passwordResetSection: '',
        signUpPassword: $('#sign-up-password'),
        loginPassword: $('#login-password'),
        resetPassword: $('#reset-password'),
        signUpConfirmPassword: $('#sign-up-confirm-password'),
        resetConfirmPassword: $('#reset-confirm-password')
    },
    dataType: 'JSON',
    XHRType: {
        GET: 'GET',
        POST: 'POST'
    },
    Question: {
        resetQuestion: $('#login-security'),
        signUpQuestion: $('#sign-up-question'),
    },
    Answer: {
        signUpAnswer: $('#sign-up-answer'),
        resetAnswer: $('#sign-up-answer')
    },
    getToday: () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let dateObj = new Date();
        let month = monthNames[dateObj.getMonth()];
        let day = String(dateObj.getDate()).padStart(2, '0');
        let year = dateObj.getFullYear();
        let output = year + "-" + month + "-" + day;
        return output;
    }
}
