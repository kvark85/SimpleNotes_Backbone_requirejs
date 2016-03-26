define(['backbone',
    'text!templates/todoTemplates/todoHeaderTemplate.html'],
    function (Backbone,
             template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#head',
            template: _.template(template),

            events: {
                'click #logoutLink': 'logout'
            },

            initialize: function () {
                this.render();
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            },

            logout: function () {
                this.model.set('needLogout', true);
                this.model.save("", "", {
                    success: function () {
                        app.router.navigate("", true);
                    }.bind(this)
                });
            }
        });
    return View;
});