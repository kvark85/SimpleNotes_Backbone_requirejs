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
                'click #saveEmail': 'changeEmail',
                'click #savePassword': 'changePassword',
                'click #doDelete': 'deleteUser'
            },

            initialize: function () {
                this.render();

                this.$newName = this.$('#newName');
                this.$newEmail = this.$('#newEmail');
                this.$chabgePassOld = this.$('#chabgePassOld');
                this.$chabgePassNew = this.$('#chabgePassNew');
                this.$confirnChabgePassNew = this.$('#confirnChabgePassNew');
                this.$confirmDelete = this.$('#confirmDelete');
                this.$passForDelete = this.$('#passForDelete');
            },

            render: function () {
                this.$el.html(this.template());
            },

            changeName: function () {
                this.model.set({
                    'storedParameter': 'name',
                    'newName': this.$newName.val().trim()
                });
                this.model.save("", "", {
                    error: function () {
                        this.simpAlertModel.set({
                            type: 'warning',
                            textAlert: 'Вы ошиблись при вводе логина или пароля.'
                        });
                        this.simpAlertView.render();
                    }.bind(this)
                });
            },

            changeEmail: function () {
                this.model.ser('storedParameter', 'email');
                alert('changeEmail');
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