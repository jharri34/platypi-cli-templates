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
            run: {
                tasks: [
                    'watch',
                    'nodemon'
                ]
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watch: ['public']
                }
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
        },
        cordovacli: {
            options: {
                path: 'cordova'
            },
            create: {
                command: 'create',
                id: 'plat.web.test',
                name: 'webtest'
            },
            add_platforms: {
                command: 'platform',
                action: 'add',
                platforms: ['android']
            },
            add_plugins: {
                command: 'plugin',
                action: 'add',
                plugins: [
                    'network-information',
                    'splashscreen',
                    'org.apache.cordova.statusbar'
                ]
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
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-cordovacli');

    grunt.registerTask('makeCordovaDirectory', 'Creates a directory for cordova projects.', function() {
        grunt.file.mkdir('cordova/');
        grunt.log.writeln('Created cordova directory.');
    });

    /// Register Grunt Tasks
    // tasks: default, bundle, test, lint

    // Bundles the JS using browserify, also uglifies if we aren't debugging
    grunt.registerTask('bundle', ['browserify'].concat(DEBUG ? [] : ['uglify']));

    // Concurrently compiles all the typescript/less, then bundles the JS with browserify
    grunt.registerTask('build', ['clean:bundle', 'concurrent:build', 'concurrent:bundle', 'makeCordovaDirectory']);

    grunt.registerTask('run', ['concurrent:run']);
    
    // Default Task, watches the directory for changes, rebuilds.
    grunt.registerTask('default', ['build', 'concurrent:run']);
};
