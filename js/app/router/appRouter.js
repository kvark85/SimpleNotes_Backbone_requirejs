define(['backbone',
        'app/login/loginGeneralView',
        'app/todo/todoGeneralView',
        'app/registration/registrationGeneralView',
        'app/settings/settingsGeneralView'],
    function (Backbone,
              LoginView,
              TodoGeneralView,
              RegistrationGeneralView,
              SettingsGeneralView) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes: {
                '': 'login',
                '!/todo': 'todo',
                '!/registration': 'registration',
                '!/registration/:id/:reqNum': 'registration',
                '!/settings': 'settings',
                '!/settings/:id/:reqNum': 'settings'
            },

            login: function () {
                new LoginView();
            },

            todo: function () {
                new TodoGeneralView();
            },

            registration: function (id, regNum) {
                new RegistrationGeneralView({postData: {id: id, regNum: regNum}});
            },

            settings: function (id, emailNum) {
                new SettingsGeneralView({postData: {id: id, emailNum: emailNum}});
            }
        });
        return Router;
    });