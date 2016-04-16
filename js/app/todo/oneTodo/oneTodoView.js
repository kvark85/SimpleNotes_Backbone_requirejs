define(['backbone',
        'text!templates/todo/oneTodoTemplate.html'],
    function (Backbone,
               template) {
        'use strict';
        var View = Backbone.View.extend({
            tagName: 'li',
            className: 'list-group-item',
            template: _.template(template),

            events: {
                'change .js-status-checkbox': 'toggle',
                'dblclick .js-one-todo': 'edit',
                'click .js-delete-button': 'clear',
                'keypress .js-change-input': 'editTextTodoFromKeypress',
                'blur .js-change-input': 'cancelEdit',
                'click .js-note-edit': 'close'
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function () {
                this.$el.toggleClass('list-group-item-success', this.model.get('completed'));
                this.$el.html(this.template(this.model.toJSON()));
                this.input = this.$('.js-change-input');
                return this;
            },

            toggle: function () {
                this.model.toggle();
            },

            editTextTodoFromKeypress: function (e) {
                if (e.keyCode === 13) {
                    this.close();
                }
            },

            close: function () {
                var value = this.input.val();
                if (!value) {
                    this.clear();
                } else {
                    this.model.save({todo: value});
                    this.$el.removeClass('now-modified');
                }
            },

            edit: function () {
                this.input.val(this.model.get('todo'));
                this.$el.addClass('now-modified');
                this.input.focus();
            },

            cancelEdit: function () {
                setTimeout(function () {
                    this.$el.removeClass('now-modified');
                }.bind(this), 200);
            },

            clear: function () {
                this.model.destroy({wait: true});
            }
        });
        return View;
    });