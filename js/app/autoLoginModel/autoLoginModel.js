define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        url: '/api2/login.php'
    });
    return Model;
});