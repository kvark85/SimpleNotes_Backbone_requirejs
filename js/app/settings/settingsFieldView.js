define(['backbone',
        'text!templates/settings/settingsFieldTemplate.html',
        'app/simpAlert/simpAlertView',
        'app/simpAlert/simpAlertModel',
        'app/settings/settingsHeaderView',
        'app/settings/settingsContentView',
        'app/settings/settingsModel'],

    function (Backbone,
              template,
              SimpAlertView,
              SimpAlertModel,
              SettingsHeaderView,
              SettingsContentView,
              SettingsUserModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function (data) {
                this.$el.html(template); // insert html (render)

                var user = new SettingsUserModel({id: data.postData.id, emailNum: data.postData.emailNum});

                if (data.postData.id && data.postData.emailNum) {
                    user.save();
                } else {
                    user.fetch();
                }

                new SettingsHeaderView({model: user}); // creating header
                new SettingsContentView({model: user}); // creating content
            }
        });
        return View;
    });