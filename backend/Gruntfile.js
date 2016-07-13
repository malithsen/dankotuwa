module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      all: {
        src: ['*.js', 'public/javascripts/*.js']
      }
    },
    watch: {
      js: {
        files: ['*.js', 'public/javascripts/*.js'],
        tasks: ['jshint']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignoredFiles: ['README', 'node_modules/**'],
          ignore: ['public/**'],
          watchedExtensions: ['js'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 8080
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint', 'concurrent']);
};
