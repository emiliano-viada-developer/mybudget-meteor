/*** METEOR ACCOUNTS ***/
if (Accounts.emailTemplates) {
    Accounts.emailTemplates.siteName = 'My Budget';
    Accounts.emailTemplates.from = 'My Budget <no-reply@mybudget.com>';
    Accounts.emailTemplates.resetPassword.subject = function(user, url) {
        return 'Recupera tu contraseña';
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url) {
        url = url.replace('#/', '')

        var body = 'Hola ' + user.getFullName() + ', \n\r\n\r';
        body += 'Para recuperar tu contraseña, simplemente haz click en el link de abajo.\n\r\n\r';
        body += url + '\n\r\n\r';
        body += 'Gracias.'

        return body;
    };
}
