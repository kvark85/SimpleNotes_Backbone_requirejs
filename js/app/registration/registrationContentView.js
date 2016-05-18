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
                    this.simpAlertModel.set({type: 'warning', textAlert: error}); //помещаем текст ошибки в модель
                    this.simpAlertView.render();
                }, this);

                this.listenTo(this.model, 'userCreateSuccess', function () {
                    var messageStr;
                    if (this.model.get('step') === 2) {
                        messageStr = 'Проверьте Вашу почту для завершения процеса регистрации.';
                    }
                    if (this.model.get('step') === 5) {
                        messageStr = 'Регистрация прошла успешно. Залогинтесь и пользуйтесь сервисом с удовольствием.';
                    }
                    this.render();

                    this.simpAlertModel.set({
                        type: 'success',
                        textAlert: messageStr
                    }); //помещаем текст ошибки в модель
                    this.simpAlertView.render();
                }, this);


                if (this.model.get('id') && this.model.get('regNum')) {
                    this.simpAlertModel.set({
                        type: 'success',
                        textAlert: 'Регистрация почти закончена, осталось ввести какой вы хотите себе пароль.'
                    });
                    this.simpAlertView.render();

                    this.model.save("", "", {
                        validate: false,
                        success: function (a, response) {
                            if (response.message) {
                                this.simpAlertModel.set({
                                    type: response.message.type,
                                    textAlert: response.message.textAlert
                                });
                                this.simpAlertView.render();
                            } else {
                                this.render();

                                this.$login = this.$('#login');
                                this.$name = this.$('#name');
                                this.$email = this.$('#email');
                                this.$password = this.$('#password');
                                this.$repetPassword = this.$('#repetPassword');

                            }
                        }.bind(this),
                        error: function () {
                            this.simpAlertModel.set({
                                type: 'warning',
                                textAlert: 'Какая то странная ошибочка произошла... Я даже не знаю как это обьяснить...'
                            });
                            this.simpAlertView.render();
                        }.bind(this)
                    });
                }

                this.render();  //рендер контентной части
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
                    repetPassword: repetPassword
                });

                this.model.save("", "", {
                    success: function (a, response) {
                        if (response.message) {
                            this.simpAlertModel.set({
                                type: response.message.type,
                                textAlert: response.message.textAlert
                            });
                            this.simpAlertView.render();
                        } else {
                            this.model.trigger('userCreateSuccess');

                        }
                    }.bind(this),
                    error: function () {
                        this.simpAlertModel.set({
                            type: 'warning',
                            textAlert: 'Какая то странная ошибочка произошла... Я даже не знаю как это обьяснить...'
                        });
                        this.simpAlertView.render();
                    }.bind(this)
                });
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });
        return View;
    });