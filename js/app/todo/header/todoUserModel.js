define(['backbone'], function(Backbone){
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            login: '',
            name: '',
            photo_rec: '',
            needLogout: false
        },
        url: '/api/user.php'
    });
    return Model;
});