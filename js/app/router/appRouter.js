var app = app || {};

define(['backbone',
        'app/login/loginView',
        'app/todo/todoGeneralView',
        'app/registration/registrationGeneralView',
        'app/autoLoginModel/autoLoginModel'],
    function (Backbone,
              LoginView,
              TodoGeneralView,
              RegistrationGeneralView,
              AutoLoginModel) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes: {
                "": "login",
                "!/todo": "todo",
                "!/registration": "registration",
                "!/registration/:id/:reqNum": "registration"
            },

            initialize: function () {
                app.router = this;
                this.autoLoginModel = new AutoLoginModel();
                this.listenTo(this.autoLoginModel, 'change:acces', function() {
                    app.router.navigate("#!/todo", true);
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
            }
        });
        return Router;
    });