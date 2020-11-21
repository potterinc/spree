


// Password Reset Asychronous Request 
$('#ResetPassword').click(function () {
    validateInput('validatePassword');

    //Sending asynchronous request
    if (User.flag == true) {
        $('#ResetPassword').html('<img src="./images/dual-ring-loader.gif" width="32" />');

        if (User.confirmNewPassword.val() == User.Password.val()) {

            $.ajax({
                url: '../config/auth.php',
                dataType: User.returnType,
                type: User.requestType[0],
                data: {
                    password: User.Password.val(),
                    userId: User.verifiedUserId.val()
                },
                success: function (asyncRequest) {
                    User.Password.val(null);
                    User.confirmNewPassword.val(null);

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

var Auth = {
    // Form Validation
    formValidate: (inputArgs) => {
        let validInput = $('[' + inputArgs + ']');
        for (let formInput = 0; formInput < validInput.length; formInput++) {
            if (validInput.get(formInput).value == null || validInput.get(formInput).value == '') {
                validInput[formInput].placeholder = 'This field is required';
                return false;
            }
        }
        User.flag = true;
    },

    // Login Algorithm
    login: () => {
        $.ajax({
            url: '../config/auth.php',
            type: User.XHR.POST,
            dataType: User.JSONtype,
            beforeSend: () => { $('#sign-in-button').html('Signing in...') },
            data: {
                email: User.email.loginEmail.val(),
                password: User.password.loginPassword.val(),
            },
            success: function (asyncRequest) {
                User.email.loginEmail.val(null);
                User.password.loginPassword.val(null);
                $('#login-status').html(asyncRequest);

                setTimeout(() => {
                    $('#loginStatus').fadeOut(1000);
                }, 5000);

                $('#loginStatus').val(null).show();
            }
        })
    },

    // Sign Up
    signUp: () => {
        if (User.password.signUpConfirmPassword === User.password.signUpPassword) {
            $.ajax({
                url: '../config/auth.php',
                type: User.XHR.POST,
                dataType: User.JSONtype,
                beforeSend: () => { $(this).html('Please wait...') },
                data: {
                    fullName: User.fullName.val(),
                    email: User.email.signUpEmail.val(),
                    telephone: User.telephone.val(),
                    securityQuestion: User.question.signUpQuestion.val(),
                    answer: User.answer.signUpAnswer.val(),
                    password: User.password.signUpPassword.val(),
                    dateOfRegistration: User.getToday()
                },
                success: (asyncRequest) => {
                    User.fullName.val(null);
                    User.email.signUpEmail.val(null);
                    User.telephone.val(null);
                    User.question.signUpQuestion.val(null);
                    User.answer.signUpAnswer.val(null);
                    User.password.signUpPassword.val(null);
                    $('#SignUpNotification').html(asyncRequest);
                    setTimeout(() => {
                        $('#notification').fadeOut(1000);
                        $('#notification').val(null).show();
                    }, 5000)
                }
            })
        }
        else {
            setTimeout(() => {
                $('#notification').html('Password Does not match: Try again')
                $('#notification').fadeOut(1000)
                $('#notification').val(null).show();
                return false;
            }, 5000)
        }
    },

    // Password verification
    verifyPassword: () => {
        $.ajax({
            url: '../config/auth.php',
            dataType: User.JSONtype,
            type: User.XHR.POST,
            data: {
                email: User.email.resetEmail.val(),
                answer: User.answer.resetAnswer.val(),
                securityQuestion: User.question.resetQuestion.val()
            },
            beforeSend: () => {
                $('#verify').html('Please wait...')
            },
            success: function (asyncRequest) {
                User.email.resetEmail.val(null);
                User.answer.resetAnswer.val(null);
                User.question.resetQuestion.val(null);

                if (asyncRequest.status == true) {
                    $('#small-dialog2').html(User.ChangePassword.html());
                    User.verifiedUserId.val(authResponse.userId);
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
    }
}



var User = {
    flag: false,
    fullName: $('#sign-up-fullname'),
    email: {
        signUpEmail: $('#sign-up-email'),
        loginEmail: $('#login-email'),
        resetEmail: $('#reset-email'),
    },
    password: {
        passwordResetSection: '',
        signUpPassword: $('#sign-up-password'),
        loginPassword: $('#login-password'),
        resetPassword: $('#reset-password'),
        signUpConfirmPassword: $('#sign-up-confirm-password'),
        resetConfirmPassword: $('#reset-confirm-password')
    },
    telephone: $('#sign-up-telephone'),
    country: $('#country'),
    JSONtype: 'JSON',
    XHR: {
        GET: 'GET',
        POST: 'POST'
    },
    question: {
        resetQuestion: $('#login-security'),
        signUpQuestion: $('#sign-up-question'),
    },
    answer: {
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
