define(['backbone', 'text!app/todoItem/todoItem_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'b__one-todo',
    template: _.template(template),

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });
  return View;
});