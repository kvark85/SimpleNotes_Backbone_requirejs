require.config({
    baseUrl: "js/lib",
    paths: {
        jquery: 'jquery-2.1.4',
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


