define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            name: '',
            photo_rec: ''
        },
        url: '/api/settings.php'
    });
    return Model;
});