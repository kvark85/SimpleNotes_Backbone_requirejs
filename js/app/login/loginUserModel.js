define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        defaults: {
            login: "www",
            password: "123",
            needForgot: false
        },
        url: '/api2/login.php',
        validate: function(attrs) {
            if( attrs.login === "" && attrs.password === "" ) {
                return "Вы забыли ввести и логин, и пароль."
            };
            if( attrs.login == "" ) {
                return "Вы забыли ввести логин."
            };
            if( attrs.password == "" ) {
                return "Вы забыли ввести пароль."
            };
        }
    });
    return Model;
});