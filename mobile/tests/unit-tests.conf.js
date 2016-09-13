// Karma configuration
// Generated on Sat Sep 03 2016 23:07:04 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    '../www/lib/angular/angular.js',
    '../www/lib/angular-mocks/angular-mocks.js',
    '../www/lib/ionic/js/ionic.js',
    '../www/lib/ionic/js/ionic-angular.js',
    '../www/lib/ngCordova/dist/ng-cordova.js',
    '../www/lib/auth0.js/build/auth0.min.js',
    '../www/lib/auth0-angular/build/auth0-angular.js',
    '../www/lib/a0-angular-storage/dist/angular-storage.js',
    '../www/lib/angular-jwt/dist/angular-jwt.js',
    '../www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
    '../www/lib/lodash/dist/lodash.min.js',
    '../www/lib/le_js/product/le.min.js',
    '../www/lib/ionic-filter-bar/dist/ionic.filter.bar.js',
    '../www/lib/ionic-toast/dist/ionic-toast.bundle.min.js',
    '../www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
    '../www/js/app.js',
    '../www/js/controllers.js',
    '../www/js/controllers/*.js',
    '../www/js/services/*.js',
    '../www/js/directives/*.js',
    '*.tests.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

  })
}
