define(['backbone', 'text!templates/zzz_content/zzz_content_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    el: '#content',
    template: _.template(template),
    events:{
      'click #submitButton': 'loginSubmit'
    },

    initialize: function() {
      this.render();
    },

    loginSubmit: function() {
      var strLogin = this.$('#login').val().trim(),
          strPassword = this.$('#password').val().trim();
      this.model.set({login: strLogin, password: strPassword});
      this.model.save("", "", {
        error: function() {
          alert('Вы ошиблись при вводе логина или пароля');
        }
      });
    },

    render: function(){
      this.$el.html(this.template( this.model.toJSON() ));
    }
  });
  return View;
});