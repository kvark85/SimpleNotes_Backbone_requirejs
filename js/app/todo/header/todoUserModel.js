define(['backbone'], function(Backbone){
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            name: "",
            needLogout: false
        },
        url: '/api/user.php'
    });
    return Model;
});