define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            login: '',
            name: '',
            step: 1,
            email: '',
            password: '',
            repetPassword: ''
        },
        url: '/api/registration.php',
        validate: function (attrs) {
            if (attrs.login === "") {
                return "Вы забыли ввести и логин.";
            }
            if (attrs.email === '') {
                return "Вы забыли ввести электронную почту.";
            }
            if (attrs.step === 3 && attrs.password === '') {
                return "Вы забыли ввести пароль.";
            }
            if (attrs.step === 3 && attrs.repetPassword === '') {
                return "Вы забыли ввести повторно.";
            }
            if (attrs.step === 3 && attrs.password !== attrs.repetPassword) {
                return "Пароль и повторный пароль отличаются.";
            }
        }
    });
    return Model;
});