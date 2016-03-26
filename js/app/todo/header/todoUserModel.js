define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        defaults: {
            name: "",
            needLogout: false
        },
        url: '/api2/user.php'
    });
    return Model;
});