app.animation('.fold-animation', ['$animateCss', function($animateCss) {
  return {
    enter: function(element, doneFn) {
      var height = element[0].offsetHeight;
      return $animateCss(element, {
        addClass: '',
        removeClass: 'animate-leave animate-leave-active',
        from: { height:'0px' },
        to: { height:height + 'px' },
        easing: 'ease-out',
        duration: 0.3 // one second
      });
    },
    leave: function(element, doneFn) {
      return $animateCss(element, {
        addClass: '',
        removeClass: '',
        easing: 'ease-out',
        duration: 0.3 // one second
      });
    }
  }
}]);
app.controller('userdashboard', function($scope,$location,$http) {
	
    var socket = io.connect();
    $scope.activeUser =""
	$scope.allCourse = []
    getCourseList();
    function getCourseList()
    {
        socket.emit("usergetCourseList");
    }

    socket.on("usergetCourseListResponse",function(data){
        $scope.allCourse = []
        for(i=0;i<data.length;i++)
        {
            var format_date = moment(data[i].END).format("DD/MM/YY")

            data[i].END = format_date
            $scope.allCourse.push(data[i])
            console.log(format_date)
        }
        console.log($scope.allCourse)
        $scope.$apply();
    })
    socket.on('changeCourseResponse',function(data){
        window.location.href="/users/course/timeline";
    })
    $scope.showTimeline = function(course)
    {
        var idCourse = course.IDCOURSE;
        socket.emit("changeCourse",{id:idCourse,alias:course.ALIAS});
    }
	
});
