define(['backbone',
  'app/loginContent/loginContent_View',
  'app/todosContent/todosContent_View',
  'app/newUserContent/newUserContent_View',
  'app/rememberContent/rememberContent_View'],
    function(Backbone, bLoginView, bTodoView, bNewPageView, bRememberContentView){
  var Router = Backbone.Router.extend({
    routes: {
      "": "start",
      "todo": "todo",
      "new": "new",
      "remember": "remember"
    },
    start: function () {
      app.Views = app.Views || {};
      if(app.Views.start === undefined) {
        app.Views.start = new bLoginView( { model: app.Models.user } );
      }
      app.Views.start.render();
    },
    todo: function () {
      app.Views = app.Views || {};
      if(app.Views.todo === undefined) {
        app.Views.todo = new bTodoView( { model: app.Models.user } );
      }
      app.Views.todo.render();
    },
    new: function () {
      app.Views = app.Views || {};
      if(app.Views.new === undefined) {
        app.Views.new = new bNewPageView();
      }
      app.Views.new.render();
    },
    remember: function () {
      app.Views = app.Views || {};
      if(app.Views.remember === undefined) {
        app.Views.remember = new bRememberContentView();
      }
      app.Views.remember.render();
    }
  });
  return Router;
});