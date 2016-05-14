define(['backbone',
        'text!templates/settings/settingsContentTemplate.html'],
    function (Backbone,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),

            initialize: function () {
                this.render();
            },

            render: function () {
                this.$el.html(this.template());
            }
        });
        return View;
    });