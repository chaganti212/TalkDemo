var app = angular.module("Myapp", ['ngRoute', 'ngGrid']);


app.config(function ($routeProvider) {
    $routeProvider
    

    .when('/AddTalk', {
        templateUrl: 'AddTalk.html',
        controller: 'adddata'
    })
    .when('/List', {
        templateUrl: 'cors_Demo.html',
        controller: 'MainCtrl'
    })
    .otherwise('/', {
        templateUrl: 'Index.html'
        
    })
});

app.factory('myService', function ($http) {
        var myService = {
        async1: function () {
            var promise = $http.get("http://localhost:56488/api/talk").then(function (response) {
                console.log(response);
                return response.data;
            });
            return promise;
        }
    };
    return myService;
});

app.controller('MainCtrl', function (myService,myupdateService, $scope) {
    //alert('mysc');
    var editableCellTemplate = '<input type="text" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-change="save()"/>';
        $scope.gridOptions = {
            data: 'mydata',
            enableCellEdit: true,
            enableCellSelection: true,
            enableRowSelection: true,
            showFooter:true,
            columnDefs: [{field:'id', displayName: 'Id', enableCellEdit: false},
                        { field: 'Name', displayName: 'Talk Title', enableCellEdit: true, editableCellTemplate: editableCellTemplate },
                        { field: 'Speaker', displayName: 'Speaker Name', enableCellEdit: true, editableCellTemplate: editableCellTemplate },
                        { field: 'Venue', displayName: 'Location', enableCellEdit: true, editableCellTemplate: editableCellTemplate },
                        { field: 'Duration', displayName: 'Duration in Minutes', enableCellEdit: true, editableCellTemplate: editableCellTemplate }
            ],
            enableSorting: true,
            footerRowHeight:90,
            footerTemplate: "<div style=\"width: 160px;float: left;\">&nbsp;</div>"
            + "<div class=\"ngTopPanel ng-scope\" style=\"width: 120px;hight: 120px; float: left;\">{{getTotal()}}</div>"
        };

        $scope.Talkupdate = function (Talk) {
            myupdateService.async3(Talk).then(function (Talk) {
                $scope.data = Talk;
            });
        };

        $scope.$on('ngGridEventEndCellEdit', function (event) {
            $scope.Talk = event.targetScope.row.entity;
            $scope.Talkupdate($scope.Talk);
            console.log($scope.Talk);
            //$scope.save($scope.Talk);
            
        });
        $scope.getTotal = function () {
            //alert('into sum function');
            $scope.total = 0;
            angular.forEach($scope.mydata, function (row) {
                return getSumCol(row.Duration);
            });
            return $scope.total;
        };
        function getSumCol(Duration) {
            $scope.total += Duration;
        };


        $scope.getData = function () {
            myService.async1().then(function (d) {
                $scope.mydata = d;
                
            });

       
        };
    });

app.factory('myService1', function ($http) {
    var myService1 = {
        async2: function (Talk) {
            var promise = $http.post("http://localhost:56488/api/talk",Talk).then(function (response) {
                console.log(response);
                return response.data;
            });
            return promise;
        }
    };
    return myService1;
});

app.controller('adddata', function (myService1, $scope) {
    //alert('mys1c');
    $scope.insertData = function (Talk) {
        myService1.async2(Talk).then(function(Talk){
            $scope.data = Talk;
        });
    };
});

app.factory('myupdateService', function ($http) {
    var myupdateService = {
        async3: function (Talk) {
            var promise = $http.put("http://localhost:56488/api/talk", Talk).then(function (response) {
                console.log(response);
                return response.data;
            });
            return promise;
        }
    };
    return myupdateService;
});

app.controller('updatedata', function (myupdateService, $scope) {
    //alert('mys1c');
    $scope.Talk = function (Talk) {
        myupdateService.async3(Talk).then(function (Talk) {
            $scope.data = Talk;
        });
    };
});


//app.config(function ($routeProvider) {
//    $routeProvider

//    .when('/', {
//        templateUrl: 'demo2.html',
//        controller: 'condemo2'
//    })

//    .when('/demo1', {
//        templateUrl: 'demo1.html',
//        controller: 'condemo1'
//    })

//    .when('/demo2', {
//        templateUrl: 'demo2.html',
//        controller: 'condemo2'
//    })
//});

//app.controller('condemo1', function ($scope) {
//    $scope.message = "Coming in demo 1 controller";
//});

//app.controller('condemo2', function ($scope) {
//    $scope.message = "Coming in demo 2 controller";
//});