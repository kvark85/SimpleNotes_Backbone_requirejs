define([
        'backbone',
        'text!templates/todoTemplates/todoTemplate.html',
        'app/todo/header/todoHeaderView',
        'app/todo/todoContentView',
        'app/todo/todoListCollection'],
    function(Backbone, template, TodoHeaderView, TodoContentView, TodoListCollection){
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function() {
                this.todoListCollection = new TodoListCollection();
                this.render();
                this.todoListCollection.fetch({
                    success: function() {
                        this.render();
                    }.bind(this),
                    error: function() {
                        app.router.navigate("", true);
                    }
                });
            },

            render: function(){
                this.$el.html(this.template());
                this.header = new TodoHeaderView();
                this.content = new TodoContentView({collection: this.todoListCollection});
                return this;
            }
        });
        return View;
    });