requirejs(['backbone', 'app/router/appRouter', 'bootstrap'], function(Backbone, Router) {
  $(function(){
    new Router();
    Backbone.history.start();  // Start HTML5 History push
  });
});