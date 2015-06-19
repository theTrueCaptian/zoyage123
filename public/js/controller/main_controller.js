/**
 * Created by mh4047 on 4/28/15.
 */
var app = angular.module('travel_app',['ui.bootstrap', 'ngTagsInput']);
app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});
app.controller('login_controller', function($scope){



});

app.controller('search_controller', function($scope, $http){

    $scope.show_progress            = false;
    $scope.curr_search_page_link    = "partials/searchform.html";
    $scope.show_search_form         = true;
    /***************************************************/
    //Search button response and initial data
    $scope.search_input_text = {'from_location_model' : "France", 'to_location_model':"Germany"};
    /*$scope.begin_date_model
    $scope.end_date_model
    $scope.people_tags*/
    $scope.search  = function(){
        console.log($scope.search_input_text.from_location_model ,$scope.search_input_text.to_location_model,
            $scope.begin_date_model,$scope.end_date_model,$scope.people_tags);
        //Search result
        $scope.curr_search_page_link    = "partials/searchResult.html";
        //Show the progress bar
        $scope.show_progress = true;
        //Create an http result
        $http.post('search').success(function(data, status) {
            $scope.search_results = data;
            $scope.show_progress = false;
        }).error(function(data, status) {
            $scope.search_results = data || "Request failed";
            $scope.show_progress = false;
        });
    };
    /***************************************************/
    //Searching for interesting people tags
    $scope.people_tags = [
        'Coffee Lovers'
    ];

    $scope.load_people_tags = function(query) {
        return $http.get('people_kinds.json');
    };
    /***************************************************/

    //Date pickerjs
    $scope.today = function() {
        $scope.begin_date_model = new Date();
        $scope.end_date_model = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.begin_date_model = null;
        $scope.end_date_model = null;

    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },{
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
    /*$scope.navClass = function (page, isShowProgressBar) {
        $scope.partial_link = page;

        if(isShowProgressBar) {
            $scope.show_progress = true;


            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.show_progress = false;
                    console.log('done')
                })
            }, 1000);
            console.log("loading")
        }
    };*/

});

