define(['backbone', 'text!app/header/header_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    el: '#header',
    template: _.template(template),

    initialize: function() {
      this.render();
    },

    render: function(){
      this.$el.html(this.template( this.model.toJSON() ));
      return this;
    }
  });
  return View;
});