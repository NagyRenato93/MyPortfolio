;(function(angular) {
  'use strict';

  // Define the main application module and its dependencies
  angular.module('app', [
    'ui.router',       // For state-based routing
    'app.common',      // Common/shared functionality module
    'app.language',    // Language-related functionality
    'app.user',        // User-related functionality
    'app.form'         // Form-related functionality
  ])

  // Configure the application routes and states
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      // Define application states
      $stateProvider
        .state('root', { // Abstract root state
          abstract: true, // Cannot be directly navigated to
          views: {
            '@': { templateUrl: './html/root.html' }, // Main view template
            'header@root': { templateUrl: './html/header.html' } // Header view template
          }
        })
        .state('home', { // Home page state
          url: '/',
          parent: 'root',
          templateUrl: './html/Home.html',
          controller: 'HomeController'
        })
        .state('education', { // Education page state
          url: '/education',
          parent: 'root',
          templateUrl: './html/school.html'
        })
        .state('skills', { // Skills page state
          url: '/skills',
          parent: 'root',
          templateUrl: './html/skills.html',
          controller: 'SkillsController'
        })
        .state('work', { // Work experience page state
          url: '/work',
          parent: 'root',
          templateUrl: './html/Work.html',
          controller: 'WorkController'
        })
        .state('about', { // About page state
          url: '/about',
          parent: 'root',
          templateUrl: './html/About.html'
        });

      // Redirect to the home page for any unmatched URLs
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Run block for initializing the application
  .run([
    'trans', // Transaction service
    'lang',  // Language service
    'user',  // User service
    (trans, lang, user) => {
      // Initialize transaction events for the 'user' group
      trans.events({ group: 'user' });

      // Initialize language settings
      lang.init();

      // Initialize user-related functionality
      user.init();
    }
  ])

  // Home controller for the home page
  .controller('HomeController', ['$scope', '$timeout', function($scope, $timeout) {
    // Data for the home section
    $scope.homeData = {
      greeting: "Hello, I'm",
      name: "Nagy Renátó",
      title: ["Software Developer", "Barber", "Designer"],
      email: "nagyrenato93@email.com",
      phone: "+36 20 240 38 59",
      address: "5940, Tótkomlós, Hungary",
      image: "images/hero.png",
      socials: [
        { icon: "fab fa-facebook-f", link: "https://facebook.com" },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        { icon: "fab fa-github", link: "https://github.com/NagyRenato93" },
        { icon: "fab fa-dribbble", link: "https://dribbble.com" }
      ]
    };

    // Data for the about section
    $scope.aboutData = {
      title: "About Me",
      description: "I'm a software developer based in Hungary. I have rich experience in web development, software design, and customization. I am passionate about learning new technologies and solving complex problems.",
      image: "./images/aboutme.png",
      skills: [
        "HTML", "CSS", "JavaScript", "AngularJS", "PHP", "MySQL", "Git", "Bootstrap", "C#", ".NET", "Python"
      ],
      cvLink: "./assets/cv/Nagy Renátó Cv.pdf"
    };

    // Work experience data
    $scope.workExperience = [
      {
        title: 'Operator',
        date: '2024 Jan - 2024 Nov',
        company: 'Cerlux.kft',
        tasks: [
          'Completed documentation accurately and efficiently.',
          'Performed administrative and background tasks to support operations.'
        ]
      },
      {
        title: 'Work Schedule Manager',
        date: '2018 Jan - 2021 Feb',
        company: 'Nagyné Durkó Mónika ev.',
        tasks: [
          'Managed employee work schedules and ensured proper staffing.',
          'Handled personnel matters, including recruitment and employee relations.',
          'Coordinated communication with suppliers.'
        ]
      },
      {
        title: 'Coordination Specialist',
        date: '2015 Feb - 2017 Nov',
        company: 'Természet Háza',
        tasks: [
          'Facilitated communication and coordination between teams.',
          'Oversaw project execution and ensured timely delivery.',
          'Handled follow-up tasks and maintained accurate administrative records.'
        ]
      },
      {
        title: 'Healthcare Specialist',
        date: '2021 Feb - 2023 Aug',
        company: 'Tótkomlós',
        tasks: [
          'Maintained communication with family members and healthcare teams.',
          'Performed nursing activities in accordance with the care plan.'
        ]
      }
    ];

    // Education data
    $scope.education = [
      {
        degree: 'Szoftverfejlesztő és -tesztelő',
        institution: 'HSZC Návay Lajos Technikum',
        date: '2022 Szep - 2024 Feb',
        description: 'Outstanding final project - 1st place. Specialized in software development and testing.'
      },
      {
        degree: 'Középszintű érettségi',
        institution: 'Kölcsey Ferenc Gimnázium',
        date: '2020 - 2022',
        description: 'Achieved 100% in English final exam. Focused on mathematics and computer science.'
      }
    ];

    // Sort work experience by date (newest first)
    $scope.workExperience.sort((a, b) => {
      const dateA = new Date(a.date.split(' - ')[0] + ' 01');
      const dateB = new Date(b.date.split(' - ')[0] + ' 01');
      return dateB - dateA;
    });

    // Typewriter effect for the home section
    let index = 0;
    let textIndex = 0;
    const typewriterElement = document.getElementById('typewriter');
    const typewriterTexts = $scope.homeData.title;

    function typeWriter() {
      if (index < typewriterTexts[textIndex].length) {
        typewriterElement.textContent += typewriterTexts[textIndex].charAt(index);
        index++;
        $timeout(typeWriter, 100);
      } else {
        $timeout(() => {
          index = 0;
          textIndex = (textIndex + 1) % typewriterTexts.length;
          typewriterElement.textContent = "";
          typeWriter();
        }, 2000);
      }
    }

    typeWriter();
  }])

  // Skills controller for the skills page
  .controller('SkillsController', ['$scope', '$timeout', function($scope, $timeout) {
    // Technical skills data
    $scope.technicalSkills = [
      { name: 'JavaScript', percentage: 65, animatedPercentage: 0 },
      { name: 'Bootstrap', percentage: 75, animatedPercentage: 0 },
      { name: 'Python', percentage: 38, animatedPercentage: 0 },
      { name: 'PHP', percentage: 25, animatedPercentage: 0 },
      { name: 'C#', percentage: 50, animatedPercentage: 0 },
      { name: 'HTML', percentage: 95, animatedPercentage: 0 },
      { name: 'CSS', percentage: 90, animatedPercentage: 0 }
    ];

    // Professional skills data
    $scope.professionalSkills = [
      { name: 'Communication', percentage: 90, animatedPercentage: 0 },
      { name: 'Team Work', percentage: 75, animatedPercentage: 0 },
      { name: 'Project Management', percentage: 60, animatedPercentage: 0 },
      { name: 'Creativity', percentage: 75, animatedPercentage: 0 }
    ];

    // Animate skill progress bars
    function animateSkills(skills) {
      skills.forEach(skill => {
        let currentPercentage = 0;
        const interval = setInterval(() => {
          if (currentPercentage >= skill.percentage) {
            clearInterval(interval);
          } else {
            currentPercentage++;
            skill.animatedPercentage = currentPercentage;
            $scope.$apply();
          }
        }, 40);
      });
    }

    // Start animation after a delay
    $timeout(() => {
      animateSkills($scope.technicalSkills);
      animateSkills($scope.professionalSkills);
    }, 500);
  }])

  // Future controller for the future section
  .controller('FutureController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.futureData = {
        title: "Future Goals",
        description: [
            "As I look to the future, I am filled with excitement and determination to pursue my passion for programming.",
            "My ultimate goal is to enroll in a prestigious university where I can deepen my knowledge of computer science and software development.",
            "I envision myself mastering advanced programming languages, exploring the intricacies of algorithms, and contributing to innovative projects that make a real-world impact."
        ],
        image: "images/future-bg.gif"
    };

    // Typewriter effect for the Future Goals description
    let index = 0;
    let textIndex = 0;
    const typewriterElement = document.getElementById('future-typewriter');
    const typewriterTexts = $scope.futureData.description;

    function typeWriter() {
        if (textIndex < typewriterTexts.length) {
            if (index < typewriterTexts[textIndex].length) {
                // Hozzáadja az aktuális karaktert az aktuális sorhoz
                typewriterElement.innerHTML += `<span class="highlight">${typewriterTexts[textIndex].charAt(index)}</span>`;
                index++;
                $timeout(typeWriter, 50); // Gyorsabb írási sebesség (50ms)
            } else {
                // Új sor hozzáadása, ha a jelenlegi sor véget ért
                textIndex++;
                index = 0;
                if (textIndex < typewriterTexts.length) {
                    typewriterElement.innerHTML += `<br>`; // Új sor
                    $timeout(typeWriter, 500); // Rövid szünet az új sor előtt
                }
            }
        }
    }

    $timeout(typeWriter, 500); // Delay before starting the effect
}])

  // Navbar controller for the navigation bar
  .controller('NavbarController', ['$scope', function($scope) {
    $scope.navbarItems = [
        { name: 'Home', link: 'mh-home' },
        { name: 'About', link: 'mh-about' },
        { name: 'Education', link: 'mh-experience' }, // New Education Button
        { name: 'Skills', link: 'mh-skills' }, // New Skills Button
        { name: 'Portfolio', link: 'mh-portfolio' },
        { name: 'Additional Info', link: 'mh-additional-info' },
        { name: 'Future', link: 'mh-future' }
    ];

    $scope.scrollTo = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
}])

  // Additional Information controller
  .controller('AdditionalInfoController', ['$scope', function($scope) {
    $scope.additionalInfo = {
        title: 'Additional Information',
        items: [
            {
                icon: 'fas fa-car',
                title: 'Driving License',
                description: 'B Category'
            },
            {
                icon: 'fas fa-language',
                title: 'Languages',
                description: 'English - B2 Level, Slovak - A1 Level'
            },
            {
                icon: 'fas fa-tools',
                title: 'IT Support',
                description: 'Hardware and software maintenance of computers, troubleshooting network issues.'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Microsoft Office',
                description: 'Advanced data analysis, creating charts, and professional presentations in Hungarian and English.'
            }
        ]
    };
}])

  // Portfolio controller
  .controller('PortfolioController', ['$scope', function($scope) {
    $scope.portfolio = {
        title: 'Portfolio',
        subtitle: 'Explore my most recent and impactful projects.',
        projects: [
            {
                image: 'images/shop.png',
                title: 'E-Commerce Shop',
                description: 'A fully functional online shop with user registration, shopping cart, and payment integration.',
                link: 'https://github.com/NagyRenato93/EcoGourmet'
            },
            {
                image: 'images/lang.png',
                title: 'Language Learning App',
                description: 'An interactive app designed to help users learn new languages with quizzes and progress tracking.',
                link: 'https://github.com/NagyRenato93/EcoGourmet'
            },
            {
                image: 'images/pay.png',
                title: 'Profile Management & Payments',
                description: 'A system for managing user profiles, integrating payment gateways, and handling shopping carts.',
                link: 'https://github.com/NagyRenato93/EcoGourmet'
            },
            {
                image: 'images/subs.png',
                title: 'Subscription Feature',
                description: 'A subscription-based system with monthly payment options and automated billing.',
                link: 'https://github.com/NagyRenato93/EcoGourmet'
            }
        ]
    };
}])

  // Education controller
  .controller('EducationController', ['$scope', function($scope) {
    $scope.education = [
        {
            degree: 'Software Developer and Tester',
            institution: 'HSZC Návay Lajos Technical School',
            date: 'September 2022 - February 2024',
            description: 'Achieved first place for an outstanding final project. Specialized in software development and testing.'
        },
        {
            degree: 'High School Diploma',
            institution: 'Kölcsey Ferenc High School',
            date: '2020 - 2022',
            description: 'Graduated with a perfect score (100%) in the English final exam. Focused on mathematics and computer science.'
        }
    ];
}])

})(angular);
