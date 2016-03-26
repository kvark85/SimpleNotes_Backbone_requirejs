define(
    [
      'backbone',
      'text!templates/loginTemplates/loginContentTemplate.html',
      'app/simpAlert/simpAlertView',
      'app/simpAlert/simpAlertModel'
    ],
    function(Backbone, template, SimpAlertView, SimpAlertModel){
      var View = Backbone.View.extend({
        el: '#content',
        template: _.template(template),
        events:{
          'click #submitButton': 'loginSubmit'
        },

        initialize: function() {
          this.render();  //рендер контентной части
          this.$login = this.$el.find('#login');
          this.$password = this.$el.find('#password');
          this.$needForgot = this.$el.find('#needForgot');
          this.simpAlertModel = new SimpAlertModel(); // создаем модель для информационных сообщений
          this.simpAlertView = new SimpAlertView({model: this.simpAlertModel}); //создаем новое view для отображения информационного сообщения

          this.listenTo(this.model, 'invalid', function(model, error) { //привязываем вывод информационного сообщения на валидацию модели
            this.simpAlertModel.set('textAlert', error); //помещаем текст ошибки в модель
            this.simpAlertView.render();
          }, this);

          this.listenTo(this.model, 'change:acces', function() {
            app.router.navigate("todo", true);
          });
        },

        loginSubmit: function() {
          var login = this.$login.val().trim(),
              password = this.$password.val().trim(),
              needForgot = (this.$needForgot.prop('checked')? '1':'0');

          this.model.set({login: login, password: password, needForgot: needForgot});
          this.model.save("", "", {
            error: function() {
              this.simpAlertModel.set('textAlert', 'Вы ошиблись при вводе логина или пароля.');
              this.simpAlertView.render();
            }.bind(this)
          });
        },

        render: function(){
          this.$el.html(this.template( this.model.toJSON() ));
        }
      });
      return View;
    });