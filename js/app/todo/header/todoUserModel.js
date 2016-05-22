define(['backbone'], function(Backbone){
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            name: '',
            photo_rec: '',
            fromSocialNet: false
        },
        url: '/api/user.php'
    });
    return Model;
});