define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            storedParameter: '',
            success: false,
            waiter: false,
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
            message: {},
            fromSocialNet: true
        },
        url: '/api/settings.php',
        validate: function (attrs) {
            if (attrs.storedParameter === "name" && attrs.needWalidate && attrs.newName === "") {
                return "Поле для нового имени не должно быть пустым.";
            }
            if (attrs.storedParameter === "name" && attrs.needWalidate && attrs.newName === attrs.name) {
                return "Ваше текущее имя \"" + attrs.name + "\". Введите другое имя, если вы хотите его изменить.";
            }
            if (attrs.storedParameter === "email" && attrs.needWalidate && attrs.newEmail === "") {
                return "Поле нового электронного адреса не должно быть пустым.";
            }
            if (attrs.storedParameter === "email" && attrs.needWalidate && !/@/.test(attrs.newEmail)) {
                return "Вы ошиблись при вводе адркса электронной почты.";
            }
            if (attrs.storedParameter === "email" && attrs.needWalidate && attrs.newEmail === attrs.email) {
                return "E-mail который вы вводите, уже привязан к вашей учетной записи.";
            }

            if (attrs.storedParameter === "password" && attrs.needWalidate && attrs.changePassOld === "") {
                return "Поле старого пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && attrs.needWalidate && attrs.changePassNew === "") {
                return "Поле нового пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && attrs.needWalidate && (attrs.changePassOld === attrs.changePassNew)) {
                return "Новый пароль должен отличаться от старого.";
            }
            if (attrs.storedParameter === "password" && attrs.needWalidate && attrs.confirmChangePassNew === "") {
                return "Поле подтверждение нового пароля не должно быть пустым.";
            }
            if (attrs.storedParameter === "password" && attrs.needWalidate && attrs.changePassNew !== attrs.confirmChangePassNew) {
                return "Поля нового пароля и подтверждения нового пароля не совпадают.";
            }

            if (attrs.storedParameter === "delete" && attrs.needWalidate && !attrs.confirmDelete) {
                return "Для удаления профиля, необходимо выставить флаг \"Да,я действительно хочу удалить пользователя.\"";
            }

            if (attrs.storedParameter === "delete" && attrs.needWalidate && !attrs.fromSocialNet && attrs.passForDelete === "") {
                return "Поле пароля не должно быть пустым.";
            }
        }
    });
    return Model;
});