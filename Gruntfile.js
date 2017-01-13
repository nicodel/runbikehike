/* jshint strict: true, node: true */
'use strict';

module.exports = function (grunt) {

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  // Strip comments from JsHint JSON files.
  var _jshint = function (name) {
    if (!grunt.file.exists(name)) { return "{}"; }
    return JSON.parse(grunt.file.read(name).replace(/\/\/.*\n/g, ""));
  };

  // --------------------------------------------------------------------------
  // Configuration
  // --------------------------------------------------------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    bowerPath: "bower_components",
    vendorAppPath: "notes/app/js/lib",
    vendorTestPath: "notes/test/js/lib",

    notesPath: "notes",
    notesRestPath: "notes-rest",

    clean: {
      vendor: [
        "<%= vendorAppPath %>",
        "<%= vendorTestPath %>"
      ],
      "notes-rest": [
        "<%= notesRestPath %>/app/css",
        "<%= notesRestPath %>/app/js/app",
        "<%= notesRestPath %>/app/js/lib",
        "<%= notesRestPath %>/test/js/lib",
        "<%= notesRestPath %>/test/js/spec"
      ]
    },

    copy: {
      "vendor-app": {
        files: [
          {
            dest: "<%= vendorAppPath %>",
            expand: true,
            flatten: true,
            src: [
              "<%= bowerPath %>/jquery/dist/jquery.js",
              "<%= bowerPath %>/jquery/dist/jquery.min.js",
              "<%= bowerPath %>/json2/json2.js",
              "<%= bowerPath %>/underscore/underscore.js",
              "<%= bowerPath %>/backbone/backbone.js",
              "<%= bowerPath %>/backbone.localStorage/backbone.localStorage.js"
            ]
          },
          {
            dest: "<%= vendorAppPath %>/bootstrap",
            cwd: "<%= bowerPath %>/bootstrap/dist",
            expand: true,
            src: [
              "css/**",
              "fonts/**",
              "js/**"
            ]
          },
          {
            dest: "<%= vendorAppPath %>/jasny-bootstrap",
            cwd: "<%= bowerPath %>/jasny-bootstrap/dist",
            expand: true,
            src: ["**"]
          },
          {
            dest: "<%= vendorAppPath %>/backbone.localStorage.min.js",
            src: "<%= bowerPath %>/backbone.localStorage/" +
                 "backbone.localStorage-min.js"
          },
          {
            dest: "<%= vendorAppPath %>/showdown",
            cwd: "<%= bowerPath %>/showdown/src",
            expand: true,
            src: ["**"]
          }
        ]
      },
      "vendor-test": {
        dest: "<%= vendorTestPath %>",
        expand: true,
        flatten: true,
        src: [
          "<%= bowerPath %>/mocha/mocha.js",
          "<%= bowerPath %>/mocha/mocha.css",
          "<%= bowerPath %>/chai/chai.js",
          "<%= bowerPath %>/sinonjs/sinon.js",
          "<%= bowerPath %>/sinon-chai/lib/sinon-chai.js",
          "<%= bowerPath %>/blanket/dist/qunit/blanket.js",
          "<%= bowerPath %>/blanket/dist/qunit/blanket.min.js"
        ]
      },
      "notes-rest": {
        files: [
          {
            dest: "<%= notesRestPath %>",
            expand: true,
            cwd: "<%= notesPath %>",
            src: [
              "app/css/**",
              "app/js/app/**",
              "app/js/lib/**",
              "test/js/lib/**",
              "test/js/spec/**"
            ]
          }
        ]
      }
    },

    uglify: {
      "vendor-app": {
        files: {
          "<%= vendorAppPath %>/json2.min.js": [
            "<%= vendorAppPath %>/json2.js"
          ],
          "<%= vendorAppPath %>/underscore.min.js": [
            "<%= vendorAppPath %>/underscore.js"
          ],
          "<%= vendorAppPath %>/backbone.min.js": [
            "<%= vendorAppPath %>/backbone.js"
          ]
        }
      }
    },

    jshint: {
      options: {
        strict: "global",
        devel: "true"
      },
      client: {
        files: {
          src: [
            "sources/js/**/*.js",
          ]
        }
      },
      server: {
        files: {
          src: [
            "Gruntfile.js",
            "server.js",
            "server/**/*.js.js"
          ]
        }
      }
    },

    mocha_phantomjs: {
      app: ["test/app.html"]
    },


    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      tmpl: {
        files: [
          "./notes/app/templates.html"
        ],
        tasks: ["build:tmpl"]
      },
      docs: {
        files: [
          "doc/**/*.jade",
          "**/*.md"
        ],
        tasks: ["jade"]
      }
    }
  });

  // Dependencies
  grunt.loadNpmTasks("grunt-contrib-jshint");
  //grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-mocha-phantomjs");
  //grunt.loadNpmTasks("grunt-karma");
  //grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Internal Tasks.
  /*grunt.registerTask("build:tmpl", function () {
    var tmpl = buildTmpl("./notes/app/templates.html");
    grunt.file.write(
      "./notes/app/js/app/templates/templates.js",
      tmpl);
  });
  grunt.registerTask("build:vendor", [
    "clean:vendor",
    "copy:vendor-app",
    "uglify:vendor-app",
    "copy:vendor-test"
  ]);
  grunt.registerTask("build:rest", [
    "clean:notes-rest",
    "copy:notes-rest"
  ]);*/

  // Wrapper Tasks.
  /*grunt.registerTask("test:app",        ["mocha_phantomjs:app"]);
  grunt.registerTask("test:rest",       ["mocha_phantomjs:rest"]);
  grunt.registerTask("test:chaps-all",  ["mocha_phantomjs:chaps-all"]);
  grunt.registerTask("test:chaps",      ["mocha_phantomjs:chaps"]);*/
  grunt.registerTask("test",            ["mocha_phantomjs"/*, "karma:fast"*/]);
  grunt.registerTask("check",           ["jshint", "test"]);
  //grunt.registerTask("check:fast",      ["jshint", "karma:fast"]);
  grunt.registerTask("default",         ["check"]);

  /*grunt.registerTask("build",   ["build:tmpl", "jade:docs", "build:vendor",
                                 "build:rest"]);*/
};
