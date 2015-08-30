app.controller('studentlist', function($scope,$location,$http) {
	var socket = io.connect();
	getTimeline()
	getStudentList()
	getStudentNotList()
	function getTimeline()
    {
        socket.emit('getTimeline');
    }
    function getStudentList(){
    	socket.emit('getStudentList');
    }
    function getStudentNotList(){
    	socket.emit('getStudentNotList');
    }
    socket.on('getTimelineResponse',function(data){
        $scope.activeCourse = data;
        $scope.$apply();
    })
    socket.on('getStudentListResponse',function(data){
        $scope.studentlist = data;
        $scope.$apply();
    })
    socket.on('getStudentNotListResponse',function(data){
        $scope.studentnotlist = data;
        $scope.$apply();
    })
    $scope.addStudentToCourse = function(nrp){
    	var data ={
    		nrp: nrp
    	}
    	socket.emit('addStudentToCourse',data);
    }
    socket.on('addStudentToCourseResponse',function(data){
    	getStudentList()
		getStudentNotList()
    })
     $scope.removeStudentFromCourse = function(nrp){
    	var data ={
    		nrp: nrp
    	}
    	socket.emit('removeStudentFromCourse',data);
    }
    socket.on('removeStudentFromCourseResponse',function(data){
    	getStudentList()
		getStudentNotList()
    })
});