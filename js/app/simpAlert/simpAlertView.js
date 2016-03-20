define([
    'backbone',
    'text!templates/simpAlert/simpAlertTemplate.html'], function(Backbone, template){
    var View = Backbone.View.extend({
        el: '#simpleAlert',
        template: _.template(template),

        render: function(){
            this.$el.html(this.template( this.model.toJSON() ));
            return this;
        }
    });
    return View;
});

