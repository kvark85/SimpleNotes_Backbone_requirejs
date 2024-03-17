define(['backbone',
        'app/login/loginFieldView',
        'app/todo/todoFieldView',
        'app/registration/registrationFeildView',
        'app/settings/settingsFieldView',
        'app/restorePass/restorePassFieldView'],
    function (Backbone,
              LoginView,
              todoFieldView,
              registrationFeildView,
              settingsFieldView,
              restorePassFieldView) {
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
                new todoFieldView();
            },

            registration: function (id, regNum) {
                new registrationFeildView({postData: {id: id, regNum: regNum}});
            },

            settings: function (id, emailNum) {
                new settingsFieldView({postData: {id: id, emailNum: emailNum}});
            },

            restorePass: function (id, restorePassNum) {
                new restorePassFieldView({postData: {id: id, restorePassNum: restorePassNum}});
            }
        });
        return Router;
    });
