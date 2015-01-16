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
            ],
            cordovaProject: [
                './cordova/www'
            ]
        },
        copy: {
            cordovaProjectFiles: {
                files: [
                    {
                        expand: true, flatten: true,
                        src: [
                            './public/index.html',
                            './public/app.js',
                            './public/style.css'
                        ],
                        dest: './cordova/www', filter: 'isFile'
                    },
                ]
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            build: {
                tasks: [
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
                options: {
                    command: 'create',
                    id: '%cordovaid%',
                    name: '%name%'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'network-information',
                        'splashscreen',
                        'org.apache.cordova.statusbar'
                    ]
                }
            },
            build: {
                options: {
                    command: 'build'
                }
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

    grunt.registerTask('appendCordovaScript', 'Appends the cordova.js script reference to the project index.html file', function () {
        // <script type="text/javascript" src="cordova.js"></script>

        // index.html location
        var projectIndexLocation = 'cordova/www/index.html';

        // index.html contents
        var projectIndex = grunt.file.read(projectIndexLocation);

        if (projectIndex.indexOf('src="cordova.js"') === -1) {
            var beforeBodyEnd = projectIndex.slice(0, projectIndex.indexOf('</body>')),
                bodyEndAndBeyond = projectIndex.slice(projectIndex.indexOf('</body>')),
                newProjectIndex = projectIndex; // default to current state incase something goes wrong

            beforeBodyEnd = beforeBodyEnd + '<script type="text/javascript" src="cordova.js"></script>';

            newProjectIndex = beforeBodyEnd + '\n' + bodyEndAndBeyond;

            grunt.file.write(projectIndexLocation, newProjectIndex);

            grunt.log.writeln('Appended cordova.js to Project Index at: ' + projectIndexLocation)
        }
    });

    grunt.registerTask('makeCordovaDirectory', 'Creates a directory for cordova projects.', function() {
        grunt.file.mkdir('cordova/');
        grunt.log.writeln('Created cordova directory.');
    });

    grunt.registerTask('addCordovaPlatform', 'Add platforms to a cordova project based on your dev OS.', function() {
        // possible platforms 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'

        var cordovaTaskPlatformVar = 'cordovacli.add_platforms.options.platforms',
            platforms = grunt.config(cordovaTaskPlatformVar);

        if (process.platform === 'win32') {
            platforms.push('wp8');
        } else if (process.platform === 'darwin') {
            platforms.push('ios');
        }

        grunt.config.set(cordovaTaskPlatformVar, platforms);

        grunt.log.writeln('Your OS is ' + (process.platform === 'darwin' ? 'OS X' : process.platform) 
                           + ' so your target platforms are: ' + grunt.config('cordovacli.add_platforms.options.platforms'));

        grunt.task.run('cordovacli:add_platforms');
    });

    grunt.registerTask('setupCordova', ['makeCordovaDirectory', 'cordovacli:create', 'addCordovaPlatform', 'cordovacli:add_plugins']);

    grunt.registerTask('cordovaCopy', ['clean:cordovaProject', 'build', 'copy:cordovaProjectFiles', 'appendCordovaScript']);

    /// Register Grunt Tasks
    // tasks: default, bundle, test, lint
    
    // Installs any dependencies, can be used to do bower install. Currently does tsd.
    grunt.registerTask('install', ['tsd', 'setupCordova']);

    // Bundles the JS using browserify, also uglifies if we aren't debugging
    grunt.registerTask('bundle', ['browserify'].concat(DEBUG ? [] : ['uglify']));

    // Concurrently compiles all the typescript/less, then bundles the JS with browserify
    grunt.registerTask('build', ['clean:bundle', 'concurrent:build', 'concurrent:bundle']);

    grunt.registerTask('build-cordova', ['cordovaCopy', 'cordovacli:build']);

    grunt.registerTask('run', ['concurrent:run']);
    
    // Default Task, watches the directory for changes, rebuilds.
    grunt.registerTask('default', ['build', 'concurrent:run']);
};
