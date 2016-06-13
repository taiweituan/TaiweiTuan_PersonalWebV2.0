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

.factory('Page',['$http', function ($h) {
    var title = 'Taiwei Tuan';
    return {
        title: function () { return title; },
        setTitle: function (newTitle) { title = newTitle; },
        sendEmail: function(emailContent){
            console.log(JSON.stringify(emailContent));
            return $h.post("/sendEmail", JSON.stringify(emailContent));
        }
    };
}])

.config(['$mdThemingProvider', '$routeProvider', function ($mdThemingProvider, $routeProvider) {
    // material theme config
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey')
        // .backgroundPalette('white',{
        //     'default':'200'
        // });
        ;

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
    $routeProvider.when('/profolios', {
        title: 'Profolio',
        templateUrl: "pages/profolios.html",
        reloadOnSearch: false,
    });
    $routeProvider.when('/contact', {
        title: 'Contact Me',
        templateUrl: "pages/contact.html",
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
    
    this.menuBtn = function () {
        $s.active = !$s.active;
    };
    this.closeMenu = function () {
        $s.active = false;
    }
}])

.controller('homeController', ['$scope', 'Page', function ($scope, Page) {
    console.log('at home.html');
    $scope.reSize = reSize();
    
    window.onresize = function (event) {
    	$scope.reSize = reSize();
    }
    $scope.helloworld = 'hello World!';
    $scope.iconList = [{
        link: 'https://www.linkedin.com/in/taiwei-tuan-6311506b',
        name: 'LinkedIn',
        icon: 'fa-linkedin-square'
    }, {
        link: 'https://github.com/taiweituan?tab=activity',
        name: 'GitHub',
        icon: 'fa-github-square'
    }, {
        link: 'http://stackoverflow.com/users/4549166/duandai',
        name: 'Stack Overflowwwwwwwww',
        icon: 'fa-stack-overflow'
    }, {
        link: 'https://taiweituanblog.wordpress.com/',
        name: 'Word Press',
        icon: 'fa-wordpress'
    }];
    // re-adjust height to user's view
	function reSize() {
        if(!document.getElementById('home')){
            return;
        }
	    var windowHeight = window.innerHeight - 64 -100;
	    // console.log(windowHeight);
	    document.getElementById('home').style.height = windowHeight + 'px';
	}
}])

.controller('resumeController', ['$scope', 'Page', function ($scope, Page) {
    console.log('resume controller loaded');
}])

.controller('contactController',['$scope', 'Page', '$http', function($s, Page, $h){
    console.log('contact controller loaded');
    var emailContent = {
        'title': 'Hello Taiwei!',
        'message': ''
    };
    $s.emailContent = emailContent;
    $s.submitted = false;

    //sending email using POST method
    $s.submitEmail = function(email){
        console.log('submitting email');
        $s.submitSuccess = false;
        $s.submitted = true;

        // sending email
        Page.sendEmail(email).success(function(data){
            $s.submitSuccess = true;
            console.log('Send Email success');
            console.log(data);
        });
    };
}])

.controller('profolioController', ['$scope', 'Page', function ($s, Page) {
    console.log('profolio controller loaded');

    var profolioData = [{
        name: 'AGICCTV Mobile Website',
        src: 'img/AGI_Profolio.png',
        link: 'http://www.agicctv.com/',
        features: [
            'Mobile & Tablet Friendly',
            'Ability to browse products',
            'Ability to search product',
            'Can use swipe control on mobile devices'
        ],
        tags: [
            'AngularJS',
            'PHP',
            'JSON',
            'Angular Mobile'
        ]
    },{
        name:'Leadertech Mobile Website',
        src: 'img/LSI_Profolio.png',
        link: 'https://www.leadertechusa.com/',
        features: [
            'Associated in development',
            'Mobile & Tablet Friendly',
            'Ability to browse products',
            'Ability to search product'
        ],
        tags: [
            'AngularJS',
            'jQuery',
            'PHP',
            'JSON',
            'ASP.NET'
        ]
    },{
        name:'Personal Website Ver.2',
        src: 'img/Personal_Website_Profolio_v2.png',
        link: 'https://taiweituan.herokuapp.com/',
        features: [
            'Heavely inspired by Material Design',
            'Mobile & Tablet Friendly',
            'Ability to send Email',
            'ng-route provide faster page load'
        ],
        tags: [
            'AngularJS',
            'Angular Material',
            'NodeJS',
            'JSON'
        ]
    },{
        name:'Personal Website Ver.1',
        src: 'img/Personal_Website_Profolio_v1.png',
        link: 'https://taiweituan.github.io/',
        features: [
            'Heavely inspired by Material Design',
            'Mobile & Tablet Friendly',
            'ng-route provide faster page load'
        ],
        tags: [
            'AngularJS',
            'Angular Material'
        ]
    }];

    $s.profolioData = profolioData;
}]);

