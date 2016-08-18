module.exports = function(grunt) {

    //Checks the dependencies associated with Grunt and autoloads
    //& requires ALL of them in this Gruntfile
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        // Sass configuration
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'css/main.css': 'css/scss/main.scss'
                }
            }
        },

        wiredep: {

            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    '*.html', // .html support...
                    'css/scss/main.scss', // .scss & .sass support...
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        },


        // Copy font awesome fonts into relative project
        copy: {
            font_awesome: {
                expand: true,
                flatten: true,
                src: ['bower_components/font-awesome/fonts/*'],
                dest: 'fonts'
            }
        },


        //Use PostCSS Autoprefixer to apply browser prefixes for certain styles
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        //Watches files and folders for us
        watch: {
            options: {
                livereload: true,
            },
            files: [
                '*.html',
                'js/**/*.js',
                'css/**/*.scss',
                'img/**/*.{png,jpg,gif,svg}'
            ],
            tasks: [
                'copy',
                'sass',
                'wiredep',
                'postcss'
            ]
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    livereload: true,
                    open: true,
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //grunt serve
    grunt.registerTask('default', ['wiredep', 'connect', 'watch']);

};