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
app.controller('usertimeline', function($scope,$location,$http) {
	var socket = io.connect();
    
    getTimeline()
    getEvent()
    getStudentList()
    getUser()
    function getTimeline()
    {
        socket.emit('getTimeline');
    }
    function getEvent()
    {
        socket.emit('getEventUser');
    }
    function getStudentList(){
        socket.emit('getStudentList');
    }
    function getUser(){
        socket.emit('getUser');
    }
    socket.on('getUserResponse',function(data){
        $scope.user = data;
        $scope.$apply();
    })
    socket.on('getStudentListResponse',function(data){
        $scope.studentlist = data;
        $scope.$apply();
    })
    socket.on('getTimelineResponse',function(data){
        $scope.activeCourse = data;
        $scope.$apply();
    })
    socket.on('getEventUserResponse',function(data){
        
        for(i=0;i<data.length;i++)
        {
            console.log(data[i])
            if(data[i].config !="")
            {
                data[i].config = JSON.parse(data[i].config)
            }
        }
        $scope.allTimeline = data;
        $scope.$apply();
    })
    socket.on('savePresenceResponse',function(data){
        getEvent()
    })
    
    
    $scope.doEvent = function(event,user){
        console.log(user)
        bootbox.dialog({
                title: "Presence",
                message: '<script src="/javascripts/webcam.min.js"></script>' + 
                    '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    
                    '<div style="margin-left: auto;margin-right: auto;" id="my_camera"></div>' +
                    '<br>' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Student Id(NRP)</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="studentId" type="number" name="studentId" value="'+user.nrp+'"  disabled  class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Student name</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="studentnama"  name="studentnama" type="text" value="'+user.name+'"  disabled  class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '</form> </div>  </div>'+
                    '<script type="text/javascript">' +
                    '$( document ).ready(function() {' +
                    'Webcam.set({' +
                        'width: 320,' +
                        'height: 240,' +
                        'dest_width: 640,' +
                        'dest_height: 480,' +
                        'image_format: "jpeg",' +
                        'jpeg_quality: 90,' +
                        'force_flash: false,' +
                        'flip_horiz: true,' +
                        'fps: 45' +
                    '});' +
                       'Webcam.attach("#my_camera" );' +
                    '});' +
                    '</script>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            Webcam.snap( function(data_uri) {
                                console.log(event)
                                var studentid = $('#studentId').val();
                                var eventid = event.idevent
                                var course = {
                                    eventid : eventid,
                                    date: event.date,
                                    studentid : user.nrp,
                                    data : data_uri,
                                    lateTime: event.config.lateTime,
                                    point : event.config.point
                                }
                                if(studentid == "" ){
                                    bootbox.alert("<i style='color:red' class='fa fa-warning fa-lg'></i><b style='color:red'> Error please fill Requirement field</b>", function(result) {
                                      
                                    }); 
                                }
                                else
                                {
                                    
                                    socket.emit('savePresence',course);
                                }
                            }) 
                        }
                    }
                }
            }
        );
    }
    

});
