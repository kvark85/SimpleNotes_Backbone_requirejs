define(['backbone'], function (Backbone) {
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            type: 'success',
            textTitle: 'Внимание!',
            textAlert: ''
        }
    });
    return Model;
});