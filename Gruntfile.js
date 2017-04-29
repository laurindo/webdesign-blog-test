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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');    
    
    grunt.registerTask('default', [
        'jshint',
        //'babel',
        'sass',
        'browserify:dist',
        'connect:server',
        'watch:dev'
    ]);

};