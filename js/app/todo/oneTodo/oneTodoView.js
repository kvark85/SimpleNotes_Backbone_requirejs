define(['backbone', 'text!templates/todoTemplates/oneTodoTemplate.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template(template),

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });
  return View;
});