define(['backbone', 'text!templates/zzz_header/zzz_header_Template.html'], function(Backbone, template){
  var View = Backbone.View.extend({
    el: '#head',
    template: _.template(template),

    initialize: function() {
      this.render();
    },

    render: function(){
      this.$el.html(this.template(  ));
    }
  });
  return View;
});