define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        defaults: {
            textAlert: "AAA"
        }
    });
    return Model;
});