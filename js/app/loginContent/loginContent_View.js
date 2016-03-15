define(['backbone', 'text!app/loginContent/loginContent_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    el: '#mainContetn',
    template: _.template(template),
    events:{
      'click #access__submitButton': 'loginSubmit'
    },

    initialize: function() {
      this.render();
    },

    loginSubmit: function() {
      var strLogin = this.$('#access__login').val().trim(),
          strPassword = this.$('#access__password').val().trim();
      this.model.set({login: strLogin, password: strPassword});
      this.model.save("", "", {
        error: function() {
          alert('Вы ошиблись при вводе логина или пароля');
        }
      });
    },

    render: function(){
      this.$el.html(this.template( this.model.toJSON() ));
      return this;
    }
  });
  return View;
});