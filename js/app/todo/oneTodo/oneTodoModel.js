define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            todo_id: '',
            todo: '',
            completed: "0"
        }
    });
    return Model;
});