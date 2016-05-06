define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            login: '',
            name: '',
            step: 1,
            email: '',
            password: '',
            repetPassword: '',
            regId: '',
            regNum: ''
        },
        url: '/api/registration.php',
        validate: function (attrs) {
            if (attrs.step === 1) {
                if (attrs.login === "") {
                    return "Вы забыли ввести и логин.";
                }
                if (attrs.email === '') {
                    return "Вы забыли ввести электронную почту.";
                }
            } else if (attrs.step === 4) {
                if (attrs.password === '') {
                    return "Вы забыли ввести пароль.";
                }
                if (attrs.repetPassword === '') {
                    return "Вы забыли ввести повторно.";
                }
                if (attrs.password !== attrs.repetPassword) {
                    return "Пароль и повторный пароль отличаются.";
                }
            }
        }
    });
    return Model;
});