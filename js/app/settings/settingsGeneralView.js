define(['backbone',
        'text!templates/settings/settingsGeneralTemplate.html',
        'app/settings/settingsHeaderView',
        'app/settings/settingsContentView',
        'app/settings/settingsModel'],

    function (Backbone,
              template,
              SettingsHeaderView,
              SettingsContentView,
              SettingsUserModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function () {
                this.user = new SettingsUserModel();
                this.render();
            },

            render: function () {
                this.$el.html(this.template());
                this.header = new SettingsHeaderView({model: this.user});
                this.content = new SettingsContentView({model: this.user});
                return this;
            }
        });
        return View;
    });