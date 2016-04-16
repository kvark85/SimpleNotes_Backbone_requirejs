define(['backbone',
        'text!templates/registration/registrationTemplate.html',
        'app/registration/registrationHeaderView',
        'app/registration/registrationContentView',
        'app/registration/registrationUserModel'],
    function (Backbone,
              template,
              RegistrationHeaderView,
              RegistrationContentView,
              RegistrationUserModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function () {
                this.regModel = new RegistrationUserModel();
                this.render();
            },

            render: function () {
                this.$el.html(this.template());
                this.header = new RegistrationHeaderView();
                this.content = new RegistrationContentView({model: this.regModel});
                return this;
            }
        });
        return View;
    });