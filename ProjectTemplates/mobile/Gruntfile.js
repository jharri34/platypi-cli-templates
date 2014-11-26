/*
 * PlatypiCLI Generated Gruntfile
 */
var DEBUG = true;

module.exports = function(grunt) {
    var projectFiles = [
        './public/*.ts',
        './public/**/*.ts'
    ],
    lintIgnoreFiles = [
        '!./public/typings/**',
        '!./public/lib/**'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    './public/app.js': './public/main.js'
                },
                options: {
                    commondir: true,
                    browserifyOptions: {
                        debug: DEBUG
                    },
                    transform: ['deamdify']
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            bundle: [
                './public/app.js',
                './public/app.js.map',
                './public/style.css',
                './public/style.css.map'
            ]
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            build: {
                tasks: [
                    'tsd',
                    'ts:client',
                    'less'
                ]
            },
            bundle: {
                tasks: [
                    'cssmin',
                    'bundle'
                ]
            },
            install: {
                tasks: [
                    'tsd',
                    'bower'
                ]
            },
            run: {
                tasks: [
                    'watch'
                ]
            }
        },
        cssmin: {
            combine: {
                options: {
                    keepSpecialComments: 0,
                    target: 'public/style.css'
                },
                files: {
                    // Add files (e.g. bootstrap) in here to combine them into 1 output css file.
                    './public/style.css': [
                        './public/common/css/main.css'
                    ]
                }
            }
        },
        less: {
            main: {
                options: {
                    compress: true,
                    relativeUrls: true,
                    sourceMap: DEBUG
                },
                files: {
                    'public/style.css': 'public/common/css/main.less'
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            client: {
                src: projectFiles.concat(lintIgnoreFiles)
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                mangle: true
            },
            bundle: {
                files: {
                    './public/app.js': [
                        './public/app.js'
                    ]
                }
            }
        },
        watch: {
            client: {
                files: projectFiles,
                tasks: ['tslint', 'typescript:client']
            },
            less: {
                files: ['./public/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            browserify: {
                files: ['./public/**/*.js'],
                tasks: ['bundle']
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: true,

                    // specify config file
                    config: './tsd.public.json',
                }
            }
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: DEBUG,
                noImplicitAny: true
            },
            client: {
                src: projectFiles.concat(lintIgnoreFiles)
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-tslint');

    /// Register Grunt Tasks
    // tasks: default, bundle, test, lint

    // Bundles the JS using browserify, also uglifies if we aren't debugging
    grunt.registerTask('bundle', ['browserify'].concat(DEBUG ? [] : ['uglify']));

    // Concurrently compiles all the typescript/less, then bundles the JS with browserify
    grunt.registerTask('make', ['clean:bundle', 'concurrent:build', 'concurrent:bundle']);

    // This task is where you can run anything you would need to install in order to have everything work
    // such as TSD/Bower
    grunt.registerTask('install', ['concurrent:install']);
    
    // Default Task, watches the directory for changes, rebuilds.
    grunt.registerTask('default', ['make', 'concurrent:run']);
};
