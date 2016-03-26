define([
    'backbone',
    'text!templates/loginTemplates/loginTemplate.html',
    'app/login/loginHeaderView',
    'app/login/loginContentView',
    'app/login/loginUserModel'],
    function(Backbone, template, LoginHeaderView, LoginContentView, LoginUserModel){
    var View = Backbone.View.extend({
        el: '#mainContetn',
        template: _.template(template),

        initialize: function() {
            this.user= new LoginUserModel();
            this.render();
        },

        render: function(){
            this.$el.html(this.template());
            this.header = new LoginHeaderView({model: this.user});
            this.content = new LoginContentView({model: this.user});
            return this;
        }
    });
    return View;
});