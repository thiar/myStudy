app.controller('event', function($scope,$location) {
	var socket = io();
	getTimeline();
	getEvent();
	getStudentList();
	getResponse();
	function getEvent(){
		socket.emit('getEventDetail');
	}
	function getTimeline()
    {
        socket.emit('getTimeline');
    }
    function getStudentList(){
        socket.emit('getStudentList');
    }
    function getResponse()
    {
    	socket.emit('getResponEvent')
    }
    socket.on('getStudentListResponse',function(data){
        $scope.studentlist = data;
        $scope.$apply();
    })
    socket.on('getTimelineResponse',function(data){
        $scope.activeCourse = data;
        $scope.$apply();
    })
	socket.on('getEventDetailResponse',function(data){
		$scope.activeEvent = data
		$scope.$apply();
	})
	socket.on('getResponEventResponse',function(data){
		for(i=0;i<data.length;i++)
		{
			data[i].RESPONSEDATA = JSON.parse(data[i].RESPONSEDATA);
			
		}
		$scope.responder = data

		$scope.$apply();
	})
	$scope.validate = function(student){
		
		var data = {
			nrp :student.NRP,
			responseData : JSON.stringify(student.RESPONSEDATA)
		}
		socket.emit('validatePresence',data);
	}
});