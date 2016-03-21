define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        defaults: {
            title: "",
            completed: ""
        }
    });
    return Model;
});