define(['backbone',
        'text!templates/todo/todoContentTemplate.html',
        'app/todo/oneTodo/oneTodoView'
    ],
    function (Backbone,
             template,
             OneTodoView) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',

            events: {
                'keypress #newTodo': 'createNewTodoOnEnter',
                'click #butAddTodo': 'createInTodoCollection'
            },

            initialize: function () {
                this.$el.html(template); // insert html (first render)

                this.$newTodo = this.$('#newTodo');
                this.$list = $('#todoList');
                this.$explanatoryInformation = $('#explanatoryInformation');

                this.listenTo(this.collection, 'reset', this.addAll);
                this.listenTo(this.collection, 'add', this.addOne);
                this.listenTo(this.collection, 'all', _.debounce(this.render, 1));

                this.collection.fetch({reset: true});
            },

            render: function () {
                if (this.collection.length) {
                    this.$list.show();
                    this.$explanatoryInformation.hide();
                } else {
                    this.$list.hide();
                    this.$explanatoryInformation.show();
                }
            },

            createNewTodoOnEnter: function (e) {
                if (e.keyCode !== 13 || !this.$newTodo.val()) {
                    return;
                }

                this.createInTodoCollection();
            },

            createInTodoCollection: function () {
                var strTodo = this.$newTodo.val().trim();
                if (strTodo) {
                    this.collection.create({todo: strTodo}, {'wait': true});
                    this.clearInput();
                }
            },

            clearInput: function () {
                this.$newTodo.val('');
            },

            addAll: function () {
                this.$list.html('');
                this.collection.each(this.addOne, this);
            },

            addOne: function (todo) {
                var oneTodoView = new OneTodoView({model: todo});
                this.$list.append(oneTodoView.render().el);
            }
        });
        return View;
    });