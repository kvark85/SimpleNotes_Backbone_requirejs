define(['backbone',
        'text!templates/todoTemplates/todoTemplate.html',
        'app/todo/header/todoHeaderView',
        'app/todo/todoContentView',
        'app/todo/header/todoUserModel',
        'app/todo/todoListCollection'],
    function (Backbone,
             template,
             TodoHeaderView,
             TodoContentView,
             TodoUserModel,
             TodoListCollection) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function () {
                this.todoUserModel = new TodoUserModel();
                this.todoListCollection = new TodoListCollection();
                this.render();
                this.todoUserModel.fetch({
                    success: function () {
                        this.header.render();
                    }.bind(this),
                    error: function () {
                        app.router.navigate("", true);
                    }
                });
                this.todoListCollection.fetch({
                    success: function () {
                        this.content.render();
                    }.bind(this),
                    error: function () {
                        app.router.navigate("", true);
                    }
                });
            },

            render: function () {
                this.$el.html(this.template());
                this.header = new TodoHeaderView({model: this.todoUserModel});
                this.content = new TodoContentView({collection: this.todoListCollection});
                return this;
            }
        });
        return View;
    });