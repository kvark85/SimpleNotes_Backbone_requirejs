define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        url: '/api/login.php'
    });
    return Model;
});