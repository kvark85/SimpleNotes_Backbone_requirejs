define(['backbone',
        'app/login/loginGeneralView',
        'app/todo/todoGeneralView',
        'app/registration/registrationGeneralView',
        'app/settings/settingsGeneralView',
        'app/autoLoginModel/autoLoginModel'],
    function (Backbone,
              LoginView,
              TodoGeneralView,
              RegistrationGeneralView,
              SettingsGeneralView,
              AutoLoginModel) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes: {
                '': 'login',
                '!/todo': 'todo',
                '!/registration': 'registration',
                '!/registration/:id/:reqNum': 'registration',
                '!/settings': 'settings'
            },

            initialize: function () {
                this.autoLoginModel = new AutoLoginModel();
                this.listenTo(this.autoLoginModel, 'change:acces', function () {
                    location.href = '#!/todo';
                });
                this.autoLoginModel.fetch();
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

            settings: function () {
                new SettingsGeneralView();
            }
        });
        return Router;
    });