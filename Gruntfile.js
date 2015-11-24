module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            client: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/*.js',
                dest: 'server/public/assets/scripts/controllers/controllers.min.js'
            },
            data: {
                src: 'client/scripts/data/*.js',
                dest: 'server/public/assets/scripts/data/data.min.js'
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map",
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map",
                    "angular-modal-service/dst/angular-modal-service.min.js",
                    "angular-modal-service/dst/angular-modal-service.min.js.map",
                    "ngmodal/dist/ng-modal.min.js",
                    "angular-ui-bootstrap/ui-bootstrap.min.js",
                    "angular-ui-bootstrap/ui-bootstrap-tpls.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist',
                src: [
                    "css/bootstrap.min.css",
                    "js/bootstrap.min.js"
                ],
                "dest": "server/public/vendors/bootstrap"
            },
            html: {
                expand: true,
                cwd: "client",
                src: "views/index.html",
                dest: "server/public/assets/"
            },
            htmlRoutes:{
                expand: true,
                cwd: "client/views/routes/",
                src: [
                    "dartboardSVG.html",
                    "home.html",
                    "projects.html",
                    "profile.html",
                    "login.html"
                ],
                dest: "server/public/assets/views/routes/"
            },
            htmlTemplates: {
                expand: true,
                cwd: "client/views/templates",
                src : "*.html",
                dest: "server/public/assets/views/templates/"
            },
            style: {
                expand: true,
                cwd: "client/styles/",
                src: 'style.css',
                dest: 'server/public/assets/styles/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};