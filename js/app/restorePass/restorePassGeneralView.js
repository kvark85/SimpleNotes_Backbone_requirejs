define(['backbone',
        'text!templates/restorePass/restorePassGeneralTemplate.html',
        'app/simpAlert/simpAlertView',
        'app/simpAlert/simpAlertModel',
        'app/restorePass/restorePassHeaderView',
        'app/restorePass/restorePassContentView',
        'app/restorePass/restorePassModel'],

    function (Backbone,
              template,
              SimpAlertView,
              SimpAlertModel,
              RestorePassHeaderView,
              RestorePassContentView,
              RestorePassUserModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#mainContetn',
            template: _.template(template),

            initialize: function (data) {
                this.user = new RestorePassUserModel({
                    id: data.postData.id,
                    restorePassNum: data.postData.restorePassNum
                });

                this.render();

                this.simpAlertModel = new SimpAlertModel(); // создаем модель для информационных сообщений
                this.simpAlertView = new SimpAlertView({model: this.simpAlertModel}); //создаем новое view для отображения информационного сообщения

                this.user.save({
                    error: function () {
                        location.href = '';
                    }
                });

                this.listenTo(this.user, 'invalid', function (model, error) { //привязываем вывод информационного сообщения на валидацию модели
                    this.user.set('message', {type: 'warning', textAlert: error});
                    this.user.set('waiter', false);
                }, this);

                this.listenTo(this.user, 'change:message', function (model) {
                    if (model.get('message').type) {
                        this.simpAlertModel.set({
                            type: model.get('message').type,
                            textAlert: model.get('message').textAlert
                        });
                        this.simpAlertView.render();
                        this.user.set('message', {});
                    }
                }, this);
            },

            render: function () {
                this.$el.html(this.template());
                this.header = new RestorePassHeaderView({model: this.user});
                this.content = new RestorePassContentView({model: this.user});
                return this;
            }
        });
        return View;
    });