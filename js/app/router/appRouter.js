var app = app || {};

define(['backbone',
        'app/login/loginView',
        'app/todo/todoView',
        'app/autoLiginModel/autoLoginModel'],
    function(Backbone,
             LoginView,
             TodoView,
             AutoLoginModel){

        var Router = Backbone.Router.extend({
            routes: {
                "": "login",
                "todo": "todo"
            },

            initialize: function(options) {
                app.router = this;
                this.autoLoginModel = new AutoLoginModel();
                this.autoLoginModel.on('change:acces', function(){
                    app.router.navigate("todo", true);
                });
                this.autoLoginModel.fetch();
            },

            login: function() {
                new LoginView({router: this});
            },
            todo: function () {
                new TodoView({router: this});

            }
        });
        return Router;
    });