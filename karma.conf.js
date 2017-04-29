//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/oclazyload/dist/ocLazyLoad.min.js',
      'bower_components/ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/main.js',
      'app/**/*.js'
    ],

    autoWatch: true,

    singleRun: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
