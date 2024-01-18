require.config({
    baseUrl: "js/lib",
    paths: {
        jquery: 'jquery/dist/jquery.min',
        underscore: 'underscore/underscore-min',
        backbone: 'backbone/backbone-min',
        text: 'text/text',
        bootstrap: 'bootstrap/dist/js/bootstrap.min',
        templates: '../templates',
        app: '../app'
    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

requirejs(['app/main']);


