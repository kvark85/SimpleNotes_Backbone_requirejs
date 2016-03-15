define(['backbone', 'text!app/todosContent/todosContent_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    el: '#mainContetn',
    template: _.template(template),
    render: function(){
      this.$el.html(this.template( this.model.toJSON() ));
      return this;
    }
  });
  return View;
});