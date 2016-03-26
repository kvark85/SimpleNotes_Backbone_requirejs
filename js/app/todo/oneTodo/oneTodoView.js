define(['backbone',
      'text!templates/todoTemplates/oneTodoTemplate.html'],
    function (Backbone,
               template) {
        'use strict';
        var View = Backbone.View.extend({
            tagName: 'li',
            className: 'list-group-item',
            template: _.template(template),

            render: function () {
                if (this.model.get('completed') === "1") {
                    this.$el.addClass('list-group-item-success');
                }
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });
        return View;
    });