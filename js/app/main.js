requirejs(['backbone',
    'app/router/appRouter',
    'bootstrap'],
    function (Backbone,
             Router) {
        'use strict';
        $(function () {
            new Router();
            Backbone.history.start();  // Start HTML5 History push
        });
    });