define(['backbone',
        'text!templates/todoTemplates/todoContentTemplate.html',
        'app/todo/oneTodo/oneTodoView'
    ],
    function (Backbone,
             template,
             OneTodoView) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),

            initialize: function () {
                this.render();  //рендер контентной части
            },

            render: function () {
                this.$el.html(this.template());

                this.collection.each(function (todo) {
                    var oneTodoView = new OneTodoView({model: todo});
                    this.$('#todoList').append(oneTodoView.render().el);
                }, this);
            }
        });
        return View;
    });