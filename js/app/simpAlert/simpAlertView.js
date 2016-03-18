define([
    'backbone',
    'text!templates/simpAlert/simpAlert_Template.html'], function(Backbone, template){
    var View = Backbone.View.extend({
        el: '#simpleAlert',
        template: _.template(template),

        render: function(){
            this.$el.html(this.template( this.model.toJSON() ));
        }
    });
    return View;
});

