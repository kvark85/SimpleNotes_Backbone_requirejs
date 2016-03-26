define(['backbone',
    'app/todo/oneTodo/oneTodoModel'],
    function (Backbone,
              OneTodoModel) {
        'use strict';
        var Model = Backbone.Collection.extend({
            model: OneTodoModel,
            url: '/api2/todos.php'
        });
        return Model;
    });