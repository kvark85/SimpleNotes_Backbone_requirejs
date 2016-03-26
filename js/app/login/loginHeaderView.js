define(['backbone',
        'text!templates/loginTemplates/loginHeaderTemplate.html'],
    function (Backbone,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#head',
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