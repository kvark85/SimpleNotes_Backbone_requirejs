var app = app || {};

define(['backbone',
        'app/login/loginView',
        'app/todo/todoGeneralView',
        'app/autoLoginModel/autoLoginModel'],
    function (Backbone,
             LoginView,
             TodoGeneralView,
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
                new TodoGeneralView({router: this});
            }
        });
        return Router;
    });