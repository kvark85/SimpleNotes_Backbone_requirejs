define(['backbone'], function(Backbone){
    'use strict';
    var Model = Backbone.Model.extend({
        defaults: {
            name: "",
            needLogout: false
        },
        url: '/api2/user.php'
    });
    return Model;
});