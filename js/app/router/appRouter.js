define(['backbone',
        'app/login/loginGeneralView',
        'app/todo/todoGeneralView',
        'app/registration/registrationGeneralView',
        'app/settings/settingsGeneralView',
        'app/restorePass/restorePassGeneralView'],
    function (Backbone,
              LoginView,
              TodoGeneralView,
              RegistrationGeneralView,
              SettingsGeneralView,
              RestorePassGeneralView) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes: {
                '': 'login',
                '!/todo': 'todo',
                '!/registration': 'registration',
                '!/registration/:id/:reqNum': 'registration',
                '!/settings': 'settings',
                '!/settings/:id/:reqNum': 'settings',
                '!/restorePass': 'restorePass',
                '!/restorePass/:id/:restorePassNum': 'restorePass'
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
            },

            restorePass: function (id, restorePassNum) {
                new RestorePassGeneralView({postData: {id: id, restorePassNum: restorePassNum}});
            }
        });
        return Router;
    });