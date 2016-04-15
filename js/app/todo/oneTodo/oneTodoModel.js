define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            todo: '',
            completed: false
        },

        toggle: function () {
            this.set('completed', !this.get('completed'));
            this.save();
        }
    });
    return Model;
});