define(['backbone',
      'app/loginContent/loginContent_View',
      'app/loginContent/user_Model',
      'app/todosContent/todosContent_View',
      'app/zzz/zzz_View',
      'app/todosContent/todoCollection_Model'],
    function(Backbone,
             rLoginView,
             rLoginModel,
             rTodoView,
             zzzView,
             rTodoCollectionModel){

  var Router = Backbone.Router.extend({
    routes: {
      "": "login",
      "todo": "todo",
      "zzz": "zzz"
    },
    login: function () {
      var loginModel = new rLoginModel();
      new rLoginView( {model: loginModel} );

      loginModel.on('change:acces', function(){
         this.navigate("todo", true);
      }, this);
      loginModel.on('invalid', function(model, error) {
        alert(error);
      });
      loginModel.fetch();
    },
    todo: function () {
      var todoCollection = new rTodoCollectionModel();
      var a = new rTodoView( {collection: todoCollection} );


        todoCollection.add({'title': "QWERTY", 'password': "0"});


        todoCollection.fetch();
    },
    zzz: function() {
        var zzz = new zzzView();
    }
  });
  return Router;
});