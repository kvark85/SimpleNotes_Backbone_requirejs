define([
    'backbone',
    'text!templates/zzz/zzz_Template.html',
    'app/zzz/zzz_header/zzz__header_View',
    'app/zzz/zzz_content/zzz_content_View',
    'app/zzz/zzz_user/zzz_user_Model'],
    function(Backbone, template, zzzHeaderView, zzzContentView, zzzUserModel){
    var View = Backbone.View.extend({
        el: '#mainContetn',
        template: _.template(template),

        initialize: function() {
            this.user= new zzzUserModel();
            this.user.on('invalid', function(model, error) {
                alert(error);
            });
            this.render();
        },

        render: function(){
            this.$el.html(this.template());
            this.header = new zzzHeaderView({model: this.user});
            this.content = new zzzContentView({model: this.user});
            return this;
        }
    });
    return View;
});