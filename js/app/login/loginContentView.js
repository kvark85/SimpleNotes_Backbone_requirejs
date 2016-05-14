define(['backbone',
        'text!templates/login/loginContentTemplate.html',
        'app/simpAlert/simpAlertView',
        'app/simpAlert/simpAlertModel',
        'http://userapi.com/js/api/openapi.js?34'],
    function (Backbone,
              template,
              SimpAlertView,
              SimpAlertModel) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),
            events: {
                'click #submitButton': 'loginSubmit'
            },

            initialize: function () {
                this.render();  //рендер контентной части
                this.$login = this.$('#login');
                this.$password = this.$('#password');
                this.$needForgot = this.$('#needForgot');
                this.simpAlertModel = new SimpAlertModel(); // создаем модель для информационных сообщений
                this.simpAlertView = new SimpAlertView({model: this.simpAlertModel}); //создаем новое view для отображения информационного сообщения

                VK.init({apiId: 5438723});
                VK.Widgets.Auth("vk_auth", {width: "290px", authUrl: '/api/registration.php'});

                this.listenTo(this.model, 'invalid', function (model, error) { //привязываем вывод информационного сообщения на валидацию модели
                    this.simpAlertModel.set({type: 'warning', textAlert: error}); //помещаем текст ошибки в модель
                    this.simpAlertView.render();
                }, this);

                this.listenTo(this.model, 'change:acces', function () {
                    location.href = '#!/todo';
                });
            },

            loginSubmit: function () {
                var login = this.$login.val().trim(),
                    password = this.$password.val().trim(),
                    needForgot = (this.$needForgot.prop('checked') ? '1' : '0');

                this.model.set({login: login, password: password, needForgot: needForgot});
                this.model.save("", "", {
                    error: function () {
                        this.simpAlertModel.set({
                            type: 'warning',
                            textAlert: 'Вы ошиблись при вводе логина или пароля.'
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