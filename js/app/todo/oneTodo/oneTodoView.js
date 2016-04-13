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
                'click .js-toggle-button': 'toggle'
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function () {
                debugger;
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
            }
        });
        return View;
    });