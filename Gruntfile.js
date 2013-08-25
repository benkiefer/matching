module.exports = function (grunt) {
    grunt.initConfig({
        coffee: {
          dist: {
            files: [{
              expand: true,
              flatten: true,
              cwd: './coffee',
              src: ['*.coffee'],
              dest: './js',
              ext: '.js'
            }]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.registerTask('default', 'coffee');
};