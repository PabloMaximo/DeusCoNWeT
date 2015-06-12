'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: '.'
      }
    },
    usemin: {html: ['build/prueba.html']},

    uglify: {
      min_controllers: {
        files: {
          'scripts/min/controllers.min.js': ['scripts/controllers/*.js']
        }
      }
    },
    copy: {
      task0: {
        src: 'index.html',
        dest: 'build/prueba.html'
      }
    },
    /* Minify de imagenes*/
    imagemin: {
      main: {
        files: [{
          expand: true,
          cwd: 'images',
          src: ['*.{png,jpg,gif,.svg}'],
          dest: 'images/min'
        }]
      }
    },//imagemin

    /* Monitorización del minify de javascript e imagenes */
    watch: {
      scripts: {

        files: ['scripts/controllers/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      images: {

        files: ['_/components/img/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      }
    },

    /* Limpia los ficheros temporales del concat */
    clean: [".tmp"]


  });


  /* Cargamos todas las tareas necesarios*/
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /* Tareas por defecto */
  grunt.registerTask('default', ["watch"]);
  grunt.registerTask('build', [
    'copy:task0',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'clean'
  ]);
};