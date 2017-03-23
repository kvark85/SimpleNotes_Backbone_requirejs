define(['backbone',
        'text!templates/settings/settingsHeaderTemplate.html'],

    function (Backbone,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#head',
            template: _.template(template),

            initialize: function () {
                this.render();
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'error', this.error);
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            },

            error: function () {
                location.href = '';
            }
        });
        return View;
    });