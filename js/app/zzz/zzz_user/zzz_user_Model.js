define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        defaults: {
            login: "",
            password: ""
        },
        url: '/api/login.php',
        validate: function(attrs) {
            if( attrs.login === "" && attrs.password === "" ) {
                return "Вы забыли ввести и логин, и пароль."
            };
            if( attrs.login == "" ) {
                return "Вы забыли логин."
            };
            if( attrs.password == "" ) {
                return "Вы забыли пароль."
            };
        }
    });
    return Model;
});