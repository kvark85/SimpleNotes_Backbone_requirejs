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
            message: {},
            fromSocialNet: true
        },
        url: '/api/settings.php',
        validate: function (attrs) {
            if (!attrs.message && attrs.storedParameter === "name" && attrs.newName === "") {
                return {type: "warning", textAlert: "Поле для нового имени не должно быть пустым."};
            }
            if (!attrs.message && attrs.storedParameter === "name" && attrs.newName === attrs.name) {
                return {type: "warning", textAlert: "Ваше текущее имя \"" + attrs.name + "\". Введите другое имя, если вы хотите его изменить."};
            }
            if (!attrs.message && attrs.storedParameter === "email" && attrs.newEmail === "") {
                return {type: "warning", textAlert: "Поле нового электронного адреса не должно быть пустым."};
            }
            if (!attrs.message && attrs.storedParameter === "email" && !/@/.test(attrs.newEmail)) {
                return {type: "warning", textAlert: "Вы ошиблись при вводе адркса электронной почты."};
            }
            if (!attrs.message && attrs.storedParameter === "email" && attrs.newEmail === attrs.email) {
                return {type: "warning", textAlert: "E-mail который вы вводите, уже привязан к вашей учетной записи."};
            }

            if (!attrs.message && attrs.storedParameter === "password" && attrs.changePassOld === "") {
                return {type: "warning", textAlert: "Поле старого пароля не должно быть пустым.."};
            }
            if (!attrs.message && attrs.storedParameter === "password" && attrs.changePassNew === "") {
                return {type: "warning", textAlert: "Поле нового пароля не должно быть пустым."};
            }
            if (!attrs.message && attrs.storedParameter === "password" && (attrs.changePassOld === attrs.changePassNew)) {
                return {type: "warning", textAlert: "Новый пароль должен отличаться от старого."};
            }
            if (!attrs.message && attrs.storedParameter === "password" && attrs.confirmChangePassNew === "") {
                return {type: "warning", textAlert: "Поле подтверждение нового пароля не должно быть пустым."};
            }
            if (!attrs.message && attrs.storedParameter === "password" && attrs.changePassNew !== attrs.confirmChangePassNew) {
                return {type: "warning", textAlert: "Поля нового пароля и подтверждения нового пароля не совпадают."};
            }

            if (!attrs.message && attrs.storedParameter === "delete" && !attrs.confirmDelete) {
                return {type: "warning", textAlert: "Для удаления профиля, необходимо выставить флаг \"Да,я действительно хочу удалить пользователя.\""};
            }

            if (!attrs.message && attrs.storedParameter === "delete" && !attrs.fromSocialNet && attrs.passForDelete === "") {
                return {type: "warning", textAlert: "Поле пароля не должно быть пустым."};
            }
        }
    });
    return Model;
});