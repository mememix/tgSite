module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      app: 'public',
      dist: 'dist'
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '<%=config.app %>',
          keepalive: false,
          livereload: true, 
          debug: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      templates: {
        files: [
          'templates/**/*.ftl',
          'mocks/**/*.js'
        ],
        tasks: ['freemarker', 'connect:server'],
        options: {
          spawn: true
        }
      }
    },
    freemarker: {
      options: {
        // Task-specific options go here.
        views: "templates"
      },
      // Target-specific file lists and/or options go here.
      src: "mocks/**/*.js"
    },

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-freemarker');

  // Default task(s).
  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', ['freemarker', 'connect:server', 'watch']);

};
