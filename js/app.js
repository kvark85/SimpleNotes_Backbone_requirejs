require.config({
    baseUrl: "js/lib",
    paths: {
        jquery: 'jquery/dist/jquery.min',
        text: 'text/text',
        underscore: 'underscore/underscore-min',
        backbone: 'backbone/backbone-min',
        bootstrap: 'bootstrap/dist/js/bootstrap.min',
        app: '../app',
        templates: '../../../templates'
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


