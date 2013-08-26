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
                        src: ['coffee/matching-*.coffee'],
                        dest: 'build/js/matching-game.js'
                    },
                    {
                        src: ['coffee/no-touch.coffee'],
                        dest: 'js/no-touch.js'
                    },
                    {
                        src: ['coffee/animation-failure.coffee'],
                        dest: 'js/animation-failure.js'
                    }
                ]
            }
        },
        uglify: {
            files: {
                src: 'build/js/matching-game.js',
                dest: 'js/matching-game.js'
            }
        },
        copy: {
            main: {
                cwd: 'build/js/',
                src: '*.js',
                dest: 'js/',
                flatten: true,
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean:build', 'coffee:dist', 'uglify']);
    grunt.registerTask('debug', ['clean:build', 'coffee:dist', 'copy:main']);
};