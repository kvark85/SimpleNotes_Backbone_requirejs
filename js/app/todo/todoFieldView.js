define(['backbone',
        'text!templates/todo/todoFieldTemplate.html',
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

            initialize: function () {
                this.$el.html(template); // insert html (render)
                new TodoHeaderView({model: new TodoUserModel()}); // creating header
                new TodoContentView({collection: new TodoListCollection()}); // creating content
            }
        });
        return View;
    });