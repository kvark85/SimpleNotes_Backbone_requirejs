define(['backbone',
        'app/simpAlert/simpAlertView',
        'app/simpAlert/simpAlertModel',
        'text!templates/settings/settingsContentTemplate.html'],
    function (Backbone,
              SimpAlertView,
              SimpAlertModel,
              template) {
        'use strict';
        var View = Backbone.View.extend({
            el: '#content',
            template: _.template(template),

            events: {
                'click #saveName': 'changeName',
                'keypress #newName': 'keypressOnNewName',
                'click #saveEmail': 'changeEmail',
                'keypress #newEmail': 'keypressOnNewEmail',
                'click #savePassword': 'changePassword',
                'keypress #changePassOld': 'passwordFocusHandler',
                'keypress #changePassNew': 'passwordFocusHandler',
                'keypress #confirmChangePassNew': 'passwordFocusHandler',
                'click #doDelete': 'deleteUser'
            },

            initialize: function () {
                this.$el.html(this.template(this.model.toJSON()));

                this.listenTo(this.model, 'change:fromSocialNet', this.bigRender);
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'sync', this.waiterOff);
                this.listenTo(this.model, 'invalid', this.showMessage);
                this.listenTo(this.model, 'destroy', this.goToLogin);
            },

            bigRender: function () {
                this.$el.html(this.template(this.model.toJSON()));
                this.$simpleAlert = this.$('#simpleAlert');
                this.$userName = this.$('#userName');
                this.$newName = this.$('#newName');
                this.$userEmail = this.$('#userEmail');
                this.$newEmail = this.$('#newEmail');
                this.$changePassOld = this.$('#changePassOld');
                this.$changePassNew = this.$('#changePassNew');
                this.$confirmChangePassNew = this.$('#confirmChangePassNew');
                this.$confirmDelete = this.$('#confirmDelete');
                this.$passForDelete = this.$('#passForDelete');
                this.$localWaiter = this.$('#localWaiter');
            },

            render: function () {
                this.showMessage();
                this.$userName.text(this.model.get('name'));
                this.$userEmail.text(this.model.get('email'));
            },

            showMessage: function (model, message) {
                var currentMessage = message || this.model.get('message');
                if(!currentMessage.textAlert) return;
                this.waiterOff();
                this.$simpleAlert.append(
                    new SimpAlertView({
                        model: new SimpAlertModel({
                            type: currentMessage.type,
                            textAlert: currentMessage.textAlert
                        })
                    }).render().el
                );
            },

            waiterOff: function () {
                this.$localWaiter.hide();
            },

            changeName: function () {
                this.$localWaiter.show();
                this.model.unset('message', {silent: true}); // delete message
                this.model.set({
                    'storedParameter': 'name',
                    'newName': this.$newName.val().trim()
                }, {silent: true}).save();
            },

            keypressOnNewName: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                this.changeName();
            },

            changeEmail: function () {
                this.$localWaiter.show();
                this.model.unset('message', {silent: true}); // delete message
                this.model.set({
                    'storedParameter': 'email',
                    'newEmail': this.$newEmail.val().trim()
                }, {silent: true}).save();
            },

            keypressOnNewEmail: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                this.changeEmail();
            },

            changePassword: function () {
                this.$localWaiter.show();
                this.model.unset('message', {silent: true}); // delete message
                this.model.set({
                    'storedParameter': 'password',
                    'changePassOld': this.$changePassOld.val().trim(),
                    'changePassNew': this.$changePassNew.val().trim(),
                    'confirmChangePassNew': this.$confirmChangePassNew.val().trim()
                }, {silent: true}).save();
            },

            passwordFocusHandler: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                if ($(e.target).attr('id') === 'changePassOld') {
                    this.$changePassNew.focus();
                }
                if ($(e.target).attr('id') === 'changePassNew') {
                    this.$confirmChangePassNew.focus();
                }
                if ($(e.target).attr('id') === 'confirmChangePassNew') {
                    this.changePassword();
                }
            },

            deleteUser: function () {
                this.$localWaiter.show();
                this.model.unset('message', {silent: true}); // delete message
                this.model.set({
                    'storedParameter': 'delete',
                    'confirmDelete': this.$confirmDelete.prop('checked'),
                    'passForDelete': this.$passForDelete.val() && this.$passForDelete.val().trim()
                }, {silent: true}).destroy({
                    success: function(model, response) {
                        alert(222);
                    }
                });
            },

            goToLogin: function () {
               alert(111);
            }
        });
        return View;
    });
