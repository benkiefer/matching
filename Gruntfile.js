module.exports = function (grunt) {
    grunt.initConfig({
        coffee: {
            dist: {
                options: {
                    expand: true,
                    flatten: true
                },
                files: [
                    {
                        join: true,
                        src: ['src/javascript/coffee/matching-*.coffee'],
                        dest: 'build/js/matching-game.js'
                    },
                    {
                        src: ['src/javascript/coffee/no-touch.coffee'],
                        dest: 'js/no-touch.js'
                    },
                    {
                        src: ['src/javascript/coffee/animation-failure.coffee'],
                        dest: 'js/animation-failure.js'
                    }
                ]
            }
        },
        uglify: {
            javascript: {
                join: true,
                src: 'build/js/matching-game.js',
                dest: 'js/matching-game.js'
            }
        },
        copy: {
            javascript: {
                cwd: 'build/js/',
                src: '*.js',
                dest: 'js/',
                flatten: true,
                expand: true
            },
            css: {
                cwd: 'src/css/',
                src: '*.css',
                dest: 'css/',
                flatten: true,
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css'],
                dest: 'css/',
                ext: '.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',
        [
            'clean:build',
            'coffee:dist',
            'uglify:javascript',
            'cssmin',
        ]
    );
    grunt.registerTask('debug',
        [
            'clean:build',
            'coffee:dist',
            'copy:javascript',
            'copy:css'
        ]
    );
};