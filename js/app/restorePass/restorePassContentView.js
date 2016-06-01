define(['backbone',
        'text!templates/restorePass/restorePassContentTemplate.html'],
    function (Backbone,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),

            events: {
                'click #submitButton': 'sendRequest',
                'keypress #submitButton': 'keypressOnSubmitButton'
            },

            initialize: function () {
                this.render();
                this.listenTo(this.model, 'change', function () {
                    this.render();
                }.bind(this));
            },

            bindFieldToView: function () {
                this.$loginOrEmail = this.$('#loginOrEmail');
                this.$changePass = this.$('#changePass');
                this.$confirmChangePass = this.$('#confirmChangePass');
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                this.bindFieldToView();
            },

            resetWaiter: function () {
                this.model.set('waiter', false);
            },

            sendRequest: function () {
                this.model.set({
                    'needWalidate': true,
                    'waiter': true,
                    'loginOrEmail': this.$loginOrEmail.val().trim(),
                    'changePass': this.$changePass.val() && this.$changePass.val().trim(),
                    'confirmChangePass': this.$confirmChangePass.val() && this.$confirmChangePass.val().trim()
                }).save("", "", {
                    'wait': true,
                    success: function () {
                        this.resetWaiter();
                    }.bind(this),
                    error: function () {
                        this.resetWaiter();
                    }.bind(this)
                });
            },

            keypressOnSubmitButton: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                this.sendRequest();
            }
        });
        return View;
    });