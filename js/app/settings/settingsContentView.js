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
                this.model.ser('storedParameter', 'password');
                alert('changePassword');
            },

            deleteUser: function () {
                this.model.ser('storedParameter', 'delete');
                alert('deleteUser');
            }
        });
        return View;
    });