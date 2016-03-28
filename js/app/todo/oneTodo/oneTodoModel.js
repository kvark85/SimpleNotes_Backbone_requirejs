define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            title: "",
            completed: "0"
        }
    });
    return Model;
});