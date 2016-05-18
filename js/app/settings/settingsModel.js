define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            storedParameter: '',
            name: '',
            newName: '',
            newEemail: '',
            photo_rec: ''
        },
        url: '/api/settings.php',
        validate: function (attrs) {
            if (attrs.storedParameter === "name" && attrs.newName === "") {
                return "Поле для нового имени не должно быть пустым.";
            }
            if (attrs.storedParameter === "email" && attrs.newEmail === "") {
                return "Поле нового электронного адреса не должно быть пустым.";
            }
        }
    });
    return Model;
});