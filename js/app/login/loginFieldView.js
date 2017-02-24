define(['backbone',
        'text!templates/login/loginFieldTemplate.html',
        'app/login/loginHeaderView',
        'app/login/loginContentView',
        'app/login/loginUserModel'],
    function (Backbone,
              template,
              LoginHeaderView,
              LoginContentView,
              LoginUserModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function () {
                this.user = new LoginUserModel();
                this.render();
            },

            render: function () {
                this.$el.html(this.template());
                this.header = new LoginHeaderView();
                this.content = new LoginContentView({model: this.user});
                return this;
            }
        });
        return View;
    });