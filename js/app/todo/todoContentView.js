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

            events: {
                'keypress #newTodo': 'createNewTodoOnEnter',
                'click #butAddTodo': 'addNewTodoToList'
            },

            initialize: function () {
                this.render();  //рендер контентной части
                this.$newTodo = this.$('#newTodo'); //todo использовать это кешированное значение
                this.listenTo(this.collection, 'add', this.addOne);
            },

            render: function () {
                this.$el.html(this.template());

                this.collection.each(function (todo) {
                    var oneTodoView = new OneTodoView({model: todo});
                    this.$('#todoList').append(oneTodoView.render().el);
                }, this);
            },

            createNewTodoOnEnter: function (e) {
                if (e.keyCode !== 13 || !this.$('#newTodo').val()) {
                    return;
                }

                this.addNewTodoToList();
            },

            addNewTodoToList: function () {
                var strTodo = this.$('#newTodo').val().trim();
                if (strTodo) {
                    this.collection.create({todo: strTodo});
                    this.$('#newTodo').val('');
                }
            },

            addOne: function (todo) {
                var oneTodoView = new OneTodoView({model: todo});
                this.$('#todoList').append(oneTodoView.render().el);
            }
        });
        return View;
    });