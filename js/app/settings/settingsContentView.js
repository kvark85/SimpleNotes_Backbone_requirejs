define(['backbone',
        'text!templates/settings/settingsContentTemplate.html'],
    function (Backbone,
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
                this.render();
                this.listenTo(this.model, 'change', function () {
                    this.render();
                }.bind(this));
            },

            bindFieldToView: function () {
                this.$newName = this.$('#newName');
                this.$newEmail = this.$('#newEmail');
                this.$changePassOld = this.$('#changePassOld');
                this.$changePassNew = this.$('#changePassNew');
                this.$confirmChangePassNew = this.$('#confirmChangePassNew');
                this.$confirmDelete = this.$('#confirmDelete');
                this.$passForDelete = this.$('#passForDelete');
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                this.bindFieldToView();
            },

            changeName: function () {
                this.model.set({
                    'success': false,
                    'storedParameter': 'name',
                    'newName': this.$newName.val().trim()
                }).save();
            },

            keypressOnNewName: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                this.changeName();
            },

            changeEmail: function () {
                this.model.set({
                    'success': false,
                    'storedParameter': 'email',
                    'newEmail': this.$newEmail.val().trim()
                }).save();
            },

            keypressOnNewEmail: function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                this.changeEmail();
            },

            changePassword: function () {
                this.model.set({
                    'success': false,
                    'storedParameter': 'password',
                    'changePassOld': this.$changePassOld.val().trim(),
                    'changePassNew': this.$changePassNew.val().trim(),
                    'confirmChangePassNew': this.$confirmChangePassNew.val().trim()
                }).save();
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
                this.model.set('storedParameter', 'delete');
                alert('deleteUser');
            }
        });
        return View;
    });