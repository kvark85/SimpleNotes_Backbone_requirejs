define([
    'backbone',
    'text!templates/zzz/simpAlert_Template.html'], function(Backbone, template, zzzHeaderView, zzzContentView){
    var View = Backbone.View.extend({
        el: '#mainContetn',
        template: _.template(template),

        initialize: function() {
            console.log('simp alert vieq init');
        },

        render: function(){
            console.log('simp alert vieq render');
        }
    });
    return View;
});