define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            login: '',
            password: '',
            needForgot: '0'
        },
        url: '/api2/login.php',
        validate: function (attrs) {
            if (attrs.login === "" && attrs.password === "") {
                return "Вы забыли ввести и логин, и пароль.";
            }
            if (attrs.login === '') {
                return "Вы забыли ввести логин.";
            }
            if (attrs.password === '') {
                return "Вы забыли ввести пароль.";
            }
        }
    });
    return Model;
});