define(['backbone',
        'app/todo/header/todoHeaderView',
        'app/todo/todoContentView',
        'app/todo/header/todoUserModel',
        'app/todo/todoListCollection'],
    function (Backbone,
             TodoHeaderView,
             TodoContentView,
             TodoUserModel,
             TodoListCollection) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',

            initialize: function () {
                alert('init todo field');
                this.todoUserModel = new TodoUserModel(); // create Users object (model)
                this.todoListCollection = new TodoListCollection(); // create collections object (collection)
                //this.render();
                //this.todoUserModel.fetch({
                //    success: function () {
                //        this.header.render();
                //    }.bind(this),
                //    error: function () {
                //        location.href = '';
                //    }
                //});
                //this.todoListCollection.fetch({
                //    error: function () {
                //        location.href = '';
                //    }
                //});
            },

            render: function () {
                alert('field render');
                //this.$el.html(this.template());
                //this.header = new TodoHeaderView({model: this.todoUserModel});
                //this.content = new TodoContentView({collection: this.todoListCollection});
                //return this;
            }
        });
        return View;
    });