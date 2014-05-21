module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      app: 'public',
      dist: 'dist',
      tmp: '.tmp'
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            '<%=config.app %>'
          ],
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
        tasks: ['freemarker:dev', 'connect:server'],
        options: {
          spawn: true
        }
      },
      less: {
        files: [
          '<%=config.app %>/styles/**/*.less'
        ],
        tasks: [ 'less:dev' ]
      },
      coffee: {
        files: [
          '<%=config.app %>/js/**/*.coffee'
        ],
        tasks: [ 'coffee:dev' ]
      }
    },
    freemarker: {
      options: {
        // Task-specific options go here.
        views: "templates"
      },
      dev: {
        out: '.tmp',
        // Target-specific file lists and/or options go here.
        src: "mocks/**/*.js"
      },
      dist: {
        out: 'public',
        // Target-specific file lists and/or options go here.
        src: "mocks/**/*.js"
      }
    },

    less: {
      dev: {
        compress: false,
        sourceMap: false,
        files: [{
          expand: true,
          cwd: '<%=config.app %>/styles',
          src: '**/*.less',
          dest: '<%=config.tmp %>/styles',
          ext: '.css'
        }]
      },

      dist: {
          compress: true,
          sourceMap: false,
          files: [{
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: '**/*.less',
            dest: '<%=config.tmp %>/styles',
            ext: '.css'
          }]
        }
      },

      coffee: {
        dev: {
          sourceMap: true,
          files: [{
            expand: true,
            cwd: '<%= config.app %>/js',
            src: '**/*.coffee',
            dest: '<%=config.tmp %>/js',
            ext: '.js'
          }]
        }
      },

      clean: {
        tmp: {
          files: [{ src: ['<%=config.tmp %>'] }]
        },
        dist: {
          files: [{ src: [ '<%=config.tmp %>', '<%=config.dist %>' ]}]
        }
      },

      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              'js/**/*.js',
              '!styles/**/*.less',
              'styles/'
            ]
          }, {
            expand: true,
            dot: true,
            cwd: '<%=config.tmp %>',
            dest: '<%= config.dist %>',
            src: [
              '**/*'
            ]
          }]
        }
      }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-freemarker');

  // Default task(s).
  grunt.registerTask('default', ['server']);
  grunt.registerTask('build', ['clean:dist', 'freemarker:dev', 'less:dev', 'coffee:dev', 'copy:dist', 'clean:tmp' ]);
  grunt.registerTask('server', ['freemarker:dev', 'less:dev', 'coffee:dev', 'connect:server', 'watch']);

};
