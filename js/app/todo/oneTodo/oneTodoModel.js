define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            todo: '',
            completed: "0"
        },

        toggle: function () {
            var newCompleted = (this.get('completed') === '0') ? '1' : '0';
            this.set('completed', newCompleted);
            this.save();
        }
    });
    return Model;
});