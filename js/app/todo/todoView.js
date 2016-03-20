define([
        'backbone',
        'text!templates/todoTemplates/todoTemplate.html',
        'app/todo/todoHeaderView',
        'app/todo/todoContentView',
        'app/todo/todoCollection'],
    function(Backbone, template, TodoHeaderView, TodoContentView, TodoCollection){
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function() {
                this.todoCollection = new TodoCollection();
                this.render();
                this.todoCollection.fetch({
                    success: function() {
                        this.render();
                    }.bind(this)
                });
            },

            render: function(){
                this.$el.html(this.template());
                this.header = new TodoHeaderView();
                this.content = new TodoContentView({collection: this.todoCollection});
                return this;
            }
        });
        return View;
    });