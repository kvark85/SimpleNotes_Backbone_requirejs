define(['backbone', 'app/todoItem/todo_Model'], function(Backbone, rTodoModel){
    var Collection = Backbone.Collection.extend({
        model: rTodoModel,
        url: '/api/getTodo.php',
    });
    return Collection;
});