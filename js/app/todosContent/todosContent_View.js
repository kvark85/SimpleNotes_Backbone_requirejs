define(['backbone',
  'text!app/todosContent/todosContent_Template.html',
  'app/todoItem/todoItem_View'], function(Backbone, template, rTodoItemView){
  var View = Backbone.View.extend({
    el: '#mainContetn',
    template: _.template(template),

    initialize: function() {
      this.render();

      this.listenTo(this.collection, 'change', function(){
        this.render();
      });
    },

    render: function(){
      this.$el.html(this.template());

      this.collection.each(function(todo) {
        var oneTodoView = new rTodoItemView({model: todo});
        this.$('#todoList').append(oneTodoView.render().el);
      }, this);
    }
  });
  return View;
});