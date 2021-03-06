module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [ 'Gruntfile.js', 'app/*.es6', 'app/**/*.es6']
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/app.js': 'app/index.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                process: function(src, filepath) {
                    //Uncheck files with contains *.spec.js
                    if (filepath.indexOf('spec') == -1) {
                        return src;
                    }
                }
            },
            dist: {
                src: ['app/main.js', 'app/constants/*.js', 'app/directives/*.js', 'app/translate.config.js', 'app/**/*.js', 'app/routes/index.js'],
                dest: 'public/scripts.js',
            },
            vendor: {
                src: ['bower_components/angular/angular.min.js', 'bower_components/oclazyload/dist/ocLazyLoad.min.js', 'bower_components/ui-router/release/angular-ui-router.min.js', 'bower_components/ui-router/release/angular-ui-router.min.js', 'bower_components/angular-translate/angular-translate.min.js', 'bower_components/underscore/underscore-min.js'],
                dest: 'public/vendor.js',
            },
            missing: {
                src: ['app/**/*.spec.js'],
                dest: 'public/compiled.js',
                nonull: true,
            },
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080
                }
            }
        },
        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/**/*.js', '*.html', 'app/**/*.scss' ],
                tasks: [ 'jshint', 'sass' ],
                options: {
                    atBegin: true
                }
            },
            karma: {
                files: ['app/**/*.js'],
                tasks: ['karma:unit:run']
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'app/styles/main.css': 'app/styles/sass/main.scss',       // 'destination': 'source'                    
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    // destination for transpiled js : source js
                    'dist/index.js': 'app/index.es6'
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        wiredep: {
            target: {
                src: 'public/index.html' // point to your HTML file.
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            },
            travis: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('default', [
        'jshint',
        //'babel',
        'sass',
        'wiredep',
        'concat',
        'browserify:dist',
        'connect:server',
        'watch:dev'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'sass',
        'wiredep',
        'concat',
        'browserify:dist'
    ]);

    grunt.registerTask('devmode', ['karma:unit', 'watch:karma']);
    grunt.registerTask('test', ['karma:travis']);

};