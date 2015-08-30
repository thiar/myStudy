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
app.controller('dashboard', function($scope,$location,$http) {
	
    var socket = io.connect();
    $scope.activeUser =""
	$scope.allCourse = []
    getCourseList();
    function getCourseList()
    {
        socket.emit("getCourseList");
    }
    function addNewCourse(data)
    {
        socket.emit("addNewCourse",data);
        
    }
    socket.on("getCourseListResponse",function(data){
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
    socket.on("addNewCourseResponse",function(data){
        getCourseList();
    })
    socket.on('changeCourseResponse',function(data){
        window.location.href="/admin/course/timeline";
    })
    $scope.showTimeline = function(course)
    {
        var idCourse = course.IDCOURSE;
        socket.emit("changeCourse",{id:idCourse,alias:course.ALIAS});
    }
	$scope.addCourse = function()
	{
        
		bootbox.dialog({
                title: "Add new course",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Course Name</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="name" name="name" type="text" placeholder="Your course name" class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Course Description</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="description" name="description" type="text" placeholder="Your course description" class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Alias name</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input maxlength="8" id="alias" name="description" type="text" placeholder="Alias for Your Course,max 8 char" class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group">' +
                    '<label class="col-md-4 control-label" for="name">Course end</label> ' +
	                '<div class="input-group date col-md-4 datetimepicker3" id="datetimepicker3">' +
                    '<input id="time" type="text" class="form-control datetimepicker3" />' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-calendar"></span>' +
                    '</span>' +
	                '</div>'  +
		            '</div>'  +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Color</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<select class="form-control" id="color" style="background-color:#F5AB35;color:white;">' +
                    '<option value="#F5AB35" style="background-color:#F5AB35;">LIGHTNING YELLOW</option>' +
                    '<option value="#6BB9F0" style="background-color:#6BB9F0;">MALIBU</option>' +
                    '<option value="#EF4836" style="background-color:#EF4836;">FLAMINGO</option>' +
                    '</select>' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-tint"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '</form> </div>  </div>'+
	                '<script type="text/javascript">' +
		            '$(function () {' +
	                "$('.datetimepicker3').datetimepicker({" +
                    "format: 'DD/MM/YYYY'" +
	                '});' +
		            '});' +
                    '$("#color").change(function(){' +
                    'if($(this).val() == "#F5AB35"){' +
                    '$("#color").css("background-color", "#F5AB35");}' +
                    'if($(this).val() == "#6BB9F0"){' +
                    '$("#color").css("background-color", "#6BB9F0");}' +
                    'if($(this).val() == "#EF4836"){' +
                    '$("#color").css("background-color", "#EF4836");}' +
                    '});' +
			        '</script>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                            var alias = $('#alias').val();
                            var description = $("#description").val()
                            var end = $('#time').val()
                            var color = $('#color').val()
                            var course = {
                            	NAME : name,
                            	DESCRIPTION : description,
                            	ALIAS : alias,
                            	END : end,
                                COLOR : color
                            }
                            console.log(course)
                            if(name == "" || end =="" || alias ==""){
                            	bootbox.alert("<i style='color:red' class='fa fa-warning fa-lg'></i><b style='color:red'> Error please fill Requirement field</b>", function(result) {
								  
								});	
                            }
                            else
                            {
                                addNewCourse(course);
                            	
                            }
                            
                        }
                    }
                }
            }
        );
	}
	$scope.deleteCourse = function(course)
	{
		bootbox.dialog({
		  message: "Your course will deleted",
		  title: "Confirm Deletion",
		  buttons: {
		    success: {
		      label: "cancel",
		      className: "btn-primary",
		      callback: function() {
		        
		      }
		    },
		    danger: {
		      label: "Delete",
		      className: "btn-danger",
		      callback: function() {
		        var index = $scope.allCourse.indexOf(course);
      			$scope.allCourse.splice(index, 1);
      			$scope.$apply();
		      }
		    }
		  }
		});
		
	}
});
