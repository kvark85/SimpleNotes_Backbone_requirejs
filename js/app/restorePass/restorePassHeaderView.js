define(['backbone',
        'text!templates/restorePass/restorePassHeaderTemplate.html'],

    function (Backbone,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#head',
            template: _.template(template),

            initialize: function () {
                this.render();
                this.listenTo(this.model, 'change', this.render);
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });
        return View;
    });