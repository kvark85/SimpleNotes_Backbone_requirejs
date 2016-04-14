define(['backbone',
      'text!templates/todoTemplates/oneTodoTemplate.html'],
    function (Backbone,
               template) {
        'use strict';
        var View = Backbone.View.extend({
            tagName: 'li',
            className: 'list-group-item',
            template: _.template(template),

            events: {
                'change .js-status-checkbox': 'toggle',
                'click .js-delete-button': 'clear'
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function () {
                if (this.model.get('completed') === "1") {
                    this.$el.addClass('list-group-item-success');
                } else {
                    this.$el.removeClass('list-group-item-success');
                }
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            toggle: function () {
                this.model.toggle();
            },

            clear: function () {
                this.model.destroy({wait: true});
            }
        });
        return View;
    });