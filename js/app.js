debugVars = {};

debugMode = true;

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
}

var socket;
$(document).ready(function() {
    socket = io.connect('http://130.211.127.72:3000');

    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    $('.modal').each(function(){
        var src = $(this).find('iframe').attr('src');

        $(this).on('click', function(){

            $(this).find('iframe').attr('src', '');
            $(this).find('iframe').attr('src', src);

        });
    });
});

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'CtrlApply'
        })
});

ngApp.controller('CtrlApply', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    $scope.data={};

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

    $scope.experienceObject = {};
    $scope.staffObject = {};

    $scope.addExperience = function(year, experience, type) {
        var id = Math.floor(Math.random()*(1000 - 0 + 1 ) + 0);
        if(type == "experience") {
            while ($scope.experienceObject.hasOwnProperty(id))
                id = Math.floor(Math.random() * (1000 - 0 + 1)+ 0);

            $scope.experienceObject[id] = {
                'id' : id,
                'year' : year,
                'experience' : experience
            };
            $scope.enterYear = "";
            $scope.enterExperience = "";
        } else {
            while ($scope.staffObject.hasOwnProperty(id))
                id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

            $scope.staffObject[id] = {
                'id' : id,
                'year' : year,
                'experience' : experience
            };
            $scope.enterSYear = "";
            $scope.enterSExperience = "";
        }

    };

    $scope.removeExperience = function(id, type){
        $timeout(function() {
            if(type == 'experience')
                delete $scope.experienceObject[id];
            else
                delete $scope.staffObject[id];
        });
    };

    $scope.submitForm = function(username, password) {
        debugMsg("Submit button has been pressed.")
        socket.emit('registerUser', {username: username, password: password});
        debugMsg('User should be registered now!')
    }

    //Still in progress
    $scope.verify = function(type) {
        message = {};
        switch(type) {
            case 'email':
                    console.log($scope.formEmail.$invalid);
                break;
            default:
                debugMsg("VERIFY FUNCTION HAS FAILED!")
        }
    }
}]);