({
    dir: 'dist',
    modules: [
        {
            name: 'app'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        main: 'js/app/main',
        jquery: 'js/lib/jquery/dist/jquery.min',
        text: 'js/lib/text/text',
        underscore: 'js/lib/underscore/underscore-min',
        backbone: 'js/lib/backbone/backbone-min',
        bootstrap: 'js/lib/bootstrap/dist/js/bootstrap.min'
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
})