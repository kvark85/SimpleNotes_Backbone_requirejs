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

            events: {
                'click #submitButton': 'registrationSubmit'
            },

            initialize: function () {
                this.simpAlertModel = new SimpAlertModel(); // создаем модель для информационных сообщений
                this.simpAlertView = new SimpAlertView({model: this.simpAlertModel}); //создаем новое view для отображения информационного сообщения

                this.listenTo(this.model, 'invalid', function (model, error) { //привязываем вывод информационного сообщения на валидацию модели
                    this.model.set('message', {type: 'warning', textAlert: error});
                    this.model.set('waiter', false);
                }, this);

                this.listenTo(this.model, 'change:message', function (model) {
                    if (model.get('message').type) {
                        this.simpAlertModel.set({
                            type: model.get('message').type,
                            textAlert: model.get('message').textAlert
                        });
                        this.simpAlertView.render();
                        this.model.set('message', {});
                    }
                }, this);

                this.listenTo(this.model, 'change', function () {
                    this.render();
                }.bind(this));

                this.render();
                this.bindFieldToView();

                this.model.save("", "", {
                    validate: false
                });
            },

            bindFieldToView: function () {
                this.$login = this.$('#login');
                this.$name = this.$('#name');
                this.$email = this.$('#email');
                this.$password = this.$('#password');
                this.$repetPassword = this.$('#repetPassword');
            },

            registrationSubmit: function () {
                var login = this.$login.val().trim(),
                    name = this.$name.val().trim(),
                    email = this.$email.val().trim(),
                    password = this.$password.val().trim(),
                    repetPassword = this.$repetPassword.val().trim();

                this.model.set({
                    login: login,
                    name: name,
                    email: email,
                    password: password,
                    repetPassword: repetPassword,
                    waiter: true
                }).save("", "", {
                    success: function () {
                        this.resetWaiter();
                    }.bind(this),
                    error: function () {
                        this.resetWaiter();
                    }.bind(this)
                });
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                this.bindFieldToView();
            },

            resetWaiter: function () {
                this.model.set('waiter', false);
            }
        });
        return View;
    });