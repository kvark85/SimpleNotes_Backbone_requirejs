define(['backbone',
        'text!templates/registration/registrationContentTemplate.html',
        'app/simpAlert/simpAlertView',
        'app/simpAlert/simpAlertModel'],
    function (Backbone,
              template,
              SimpAlertView,
              SimpAlertModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),

            initialize: function () {
                this.render();  //рендер контентной части
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });
        return View;
    });