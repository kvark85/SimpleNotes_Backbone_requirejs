define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        url: '/api2/login.php'
    });
    return Model;
});