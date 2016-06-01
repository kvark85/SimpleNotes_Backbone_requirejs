define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            loginOrEmail: '',
            login: '',
            changePass: '',
            confirmChangePass: '',
            step: 1,
            waiter: false
        },
        url: '/api/restorePass.php',
        validate: function (attrs) {
            if (attrs.needWalidate && attrs.loginOrEmail === "") {
                return "Поле для ввода логина или пароля не должно быть пустым.";
            }
            if (attrs.needWalidate && attrs.changePass === "") {
                return "Поле нового пароля не должно быть пустым.";
            }
            if (attrs.needWalidate && attrs.confirmChangePass === "") {
                return "Поле подтверждение нового пароля не должно быть пустым.";
            }
            if (attrs.needWalidate && attrs.changePass !== attrs.confirmChangePass) {
                return "Поля нового пароля и подтверждения нового пароля не совпадают.";
            }
        }
    });
    return Model;
});