define(['backbone',
        'text!templates/settings/settingsGeneralTemplate.html',
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

            initialize: function () {
                this.user = new SettingsUserModel();
                this.render();

                this.simpAlertModel = new SimpAlertModel(); // создаем модель для информационных сообщений
                this.simpAlertView = new SimpAlertView({model: this.simpAlertModel}); //создаем новое view для отображения информационного сообщения

                this.user.fetch({
                    success: function () {
                        this.header.render();
                    }.bind(this),
                    error: function () {
                        location.href = '';
                    }
                });

                this.listenTo(this.user, 'invalid', function (model, error) { //привязываем вывод информационного сообщения на валидацию модели

                    alert(error);
                    this.simpAlertModel.set({type: 'warning', textAlert: error}); //помещаем текст ошибки в модель
                    this.simpAlertView.render();
                }, this);
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