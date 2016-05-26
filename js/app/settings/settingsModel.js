define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            storedParameter: '',
            success: false,
            name: '',
            email: '',
            newName: '',
            newEmail: '',
            changePassOld: '',
            changePassNew: '',
            confirmChangePassNew: '',
            confirmDelete: '',
            passForDelete: '',
            photo_rec: '',
            fromSocialNet: true
        },
        url: '/api/settings.php',
        validate: function (attrs) {
            if (attrs.storedParameter === "name" && !attrs.success && attrs.newName === "") {
                return "Поле для нового имени не должно быть пустым.";
            }
            if (attrs.storedParameter === "name" && !attrs.success && attrs.newName === attrs.name) {
                return "Ваше текущее имя \"" + attrs.name + "\". Введите другое имя, если вы хотите его изменить.";
            }
            if (attrs.storedParameter === "email" && !attrs.success && attrs.newEmail === "") {
                return "Поле нового электронного адреса не должно быть пустым.";
            }
            if (attrs.storedParameter === "email" && !attrs.success && !/@/.test(attrs.newEmail)) {
                return "Вы ошиблись при вводе адркса электронной почты.";
            }
            if (attrs.storedParameter === "email" && !attrs.success && attrs.newEmail === attrs.email) {
                return "E-mail который вы вводите, уже привязан к вашей учетной записи.";
            }

            if (attrs.storedParameter === "password" && !attrs.success && attrs.changePassOld === "") {
                return "Поле старого пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && !attrs.success && attrs.changePassNew === "") {
                return "Поле нового пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && !attrs.success && (attrs.changePassOld === attrs.changePassNew)) {
                return "Новый пароль должен отличаться от старого.";
            }
            if (attrs.storedParameter === "password" && !attrs.success && attrs.confirmChangePassNew === "") {
                return "Поле подтверждение нового пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && !attrs.success && (attrs.changePassNew !== attrs.confirmChangePassNew)) {
                return "Поля нового пароля и подтверждения нового пароля не совпадают.";
            }
        }
    });
    return Model;
});