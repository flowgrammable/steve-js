
module.exports = function(grunt) {

var files = ['Gruntfile.js', 'lib/**/*.js', 'tests/**/*.js'];
     
grunt.initConfig({
  jshint: {
    all: files
  },
  mochaTest: {
    test: {
      src: ['tests/**/*.js']
    }
  },
  watch: {
    scripts: {
      files: files,
      tasks: ['default'],
      options: {
        spawn: false,
      },
    },
  }
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
      
grunt.registerTask('default', ['jshint', 'mochaTest']);
grunt.registerTask('test', ['jshint', 'mochaTest']);

};
