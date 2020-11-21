//Sign In Parameter\
$('#sign-in-button').click(function () {
    Auth.formValidate('loginAuth');
    if (User.flag == true) {
        Auth.login();
    }
});
