//Sign In Parameter
$('#sign-in-button').click(() => {
    Auth.formValidate('loginAuth');
    if (User.flag == true)
        Auth.login();
});

// Password Reset Parameter
$('#verify-button').click(() => {
    Auth.formValidate('resetAuth');
    if (User.flag == true)
        Auth.verifyPassword();
})

// Sign Up Parameter
$('#sign-up-button').click(() => {
    Auth.formValidate('signUpAuth');
    if (User.flag == true)
        Auth.signUp();
})


/**
 * TABS AND UI/UX CONTROLS
 */

//  Sign Up Link
$('#sign-up').click(() => { $('#page-session').load('../pages/signup.html'); })

// Password Rest Link
$('#password-reset').click(() => { $('#page-session').load('../pages/reset.html'); })

// Login Link
$('#login-link').click(() => { $('#page-session').load('../pages/reset.html'); })
