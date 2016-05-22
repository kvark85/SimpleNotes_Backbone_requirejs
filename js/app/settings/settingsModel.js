define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            storedParameter: '',
            name: '',
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
            if (attrs.storedParameter === "name" && attrs.newName === "") {
                return "Поле для нового имени не должно быть пустым.";
            }
            if (attrs.storedParameter === "name" && attrs.newName === attrs.name) {
                return "Ваше текущее имя \"" + attrs.name + "\". Введите другое имя, если вы хотите его изменить.";
            }
            if (attrs.storedParameter === "email" && attrs.newEmail === "") {
                return "Поле нового электронного адреса не должно быть пустым.";
            }
            if (attrs.storedParameter === "email" && !/@/.test(attrs.newEmail)) {
                return "Вы ошиблись при вводе адркса электронной почты.";
            }
        }
    });
    return Model;
});