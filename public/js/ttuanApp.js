angular.module('mainApp', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'ngAria'
])

.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}])

.factory('Page', function () {
    var title = 'Taiwei Tuan';
    return {
        title: function () { return title; },
        setTitle: function (newTitle) { title = newTitle; }
    };
})

.config(['$mdThemingProvider', '$routeProvider', function ($mdThemingProvider, $routeProvider) {
    // material theme config
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey');

    // ng-route
    $routeProvider.when('/', {
        title: "Taiwei Tuan",
        templateUrl: 'pages/home.html',
        reloadOnSearch: false,
    });
    $routeProvider.when('/resume', {
        title: "Resume",
        templateUrl: "pages/resume.html",
        reloadOnSearch: false,
    });
    $routeProvider.when('/skills', {
        title: 'Skill',
        templateUrl: "pages/skills.html",
        reloadOnSearch: false,
    });
    $routeProvider.when('/profolios', {
        title: 'Profolio',
        templateUrl: "pages/profolios.html",
        reloadOnSearch: false,
    });
}])

.controller('mainController', ['$scope', '$rootScope', '$timeout', function ($s, $r, $t) {
    console.log('main Ctrl loaded.')

    $s.active = false;
    $s.menuList = [{
        link: '#/',
        title: 'Home',
        name: 'Home'
    }, {
        link: '#/resume',
        title: 'Resume',
        name: 'Resume',
    }, {
    //    link: '#/skills',
    //    title: 'Skills',
    //    name: 'Skills'
    //}, {
        link: '#/profolios',
        title: 'Profolios',
        name: 'Profolios'
    }, {
        link: '#/contact',
        title: 'Contact Me',
        name: 'Contact Me'
    }];

    console.log($r.title);
    
    this.menuBtn = function () {
        $s.active = !$s.active;
    };
}])

.controller('homeController', ['$scope', 'Page', function ($scope, Page) {
    console.log('at home.html');

    reSize();
    window.onresize = function (event) {
        reSize();
    }
    $scope.helloworld = 'hello World!';
    $scope.iconList = [{
        link: 'linkedin.com',
        name: 'LinkedIn',
        icon: 'fa-linkedin-square'
    }, {
        link: 'github.com',
        name: 'GitHub',
        icon: 'fa-github-square'
    }, {
        link: 'stackoverflow.com',
        name: 'Stack Overflowwwwwwwww',
        icon: 'fa-stack-overflow'
    }, {
        link: 'wordpress.com',
        name: 'Word Press',
        icon: 'fa-wordpress'
    }];
}])

.controller('resumeController', ['$scope', 'Page', function ($scope, Page) {
    console.log('resume controller loaded');
}]);

// re-adjust height to user's view
function reSize() {
    var windowHeight = window.innerHeight - 64 -100;
    //console.log(windowHeight);
    document.getElementById('home').style.height = windowHeight + 'px';
}