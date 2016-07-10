({
    appDir: './',
    baseUrl: './js',
    dir: './dist',
    modules: [
        {
            name: 'app/main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js|node_modules$|SQL_backup|\.git|\.idea|less|package\.json|gulpfile\.js|bower\.json|\.bowerrc/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: 'lib/jquery/dist/jquery.min',
        underscore: 'lib/underscore/underscore-min',
        backbone: 'lib/backbone/backbone-min',
        text: 'lib/text/text',


        bootstrap: 'lib/bootstrap/dist/js/bootstrap.min'
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