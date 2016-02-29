var onBeforeActions = {
    loginRequired: function() {
        var currentUser = Meteor.userId();
        if (currentUser) {
            this.next();
        } else {
            this.layout('blankLayout');
            this.render('login');
        }
    },
    alreadyLoggedIn: function () {
        var currentUser = Meteor.userId();
        if (currentUser) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
};

// Routes
Router.configure({
    layoutTemplate: 'layout'
});
Router.route('home', {
    path: '/',
    action: function() {
        var currentUser = Meteor.userId(),
            redirectTo = (currentUser)? 'dashboard' : 'login';
        Router.go(redirectTo);
    }
});
Router.route('/login', {
    layoutTemplate: 'blankLayout',
    onBeforeAction: onBeforeActions.alreadyLoggedIn
});
/*Router.route('/join', {
    layoutTemplate: 'auth-layout',
    onBeforeAction: onBeforeActions.alreadyLoggedIn
});
Router.route('/olvide-password', {
    name: 'forgotPassword',
    template: 'forgotPassword',
    layoutTemplate: 'auth-layout',
    onBeforeAction: onBeforeActions.alreadyLoggedIn
});
Router.route('/reset-password/:token', {
    name: 'resetPassword',
    template: 'resetPassword',
    title: 'Reset Password',
    layoutTemplate: 'auth-layout',
    onBeforeAction: onBeforeActions.alreadyLoggedIn,
    data: function() {
        Session.set('resetPassword', this.params.token);
        return;
    }
});*/
Router.route('/dashboard', {
    title: 'Dashboard',
    onBeforeAction: onBeforeActions.loginRequired,
    waitOn: function() {
        return;
    }
});
