var app = app || {};

define(['backbone',
        'app/login/loginView',
        'app/todo/generalView',
        'app/autoLoginModel/autoLoginModel'],
    function (Backbone,
             LoginView,
             GeneralView,
             AutoLoginModel) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes: {
                "": "login",
                "#": "todo",
                "todo": "todo"
            },

            initialize: function () {
                app.router = this;
                this.autoLoginModel = new AutoLoginModel();
                this.listenTo(this.autoLoginModel, 'change:acces', function() {
                    app.router.navigate("todo", true);
                });
                this.autoLoginModel.fetch();
            },

            login: function () {
                new LoginView({router: this});
            },
            todo: function () {
                new GeneralView({router: this});
            }
        });
        return Router;
    });