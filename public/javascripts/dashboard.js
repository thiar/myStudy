var app = angular.module('myStudy', ['ngAnimate']);
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
        addClass: 'animate-leave animate-leave-active',
        removeClass: 'animate-enter animate-enter-active',
        easing: 'ease-out',
        duration: 0.3 // one second
      });
    }
  }
}]);
app.controller('dashboard', function($scope,$location,$http) {
	$scope.allUser =[{nrp:"5112100080",isCheck:false,isHide:false},{nrp:"5112100081",isCheck:false,isHide:false}
	,{nrp:"5112100082",isCheck:false,isHide:false},
	{nrp:"5112100083",isCheck:false,isHide:false},{nrp:"5112100084",isCheck:false,isHide:false},
	{nrp:"5112100085",isCheck:false,isHide:false},{nrp:"5113100085",isCheck:false,isHide:false}]
	$scope.allCourse = []
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
                    '<div class="form-group">' +
                    '<label class="col-md-4 control-label" for="name">Course end</label> ' +
	                '<div class="input-group date col-md-4 datetimepicker3" id="datetimepicker3">' +
                    '<input id="time" type="text" class="form-control datetimepicker3" />' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-calendar"></span>' +
                    '</span>' +
	                '</div>'  +
		            '</div>'  +
                    '</form> </div>  </div>'+
	                '<script type="text/javascript">' +
		            '$(function () {' +
	                "$('.datetimepicker3').datetimepicker({" +
                    "format: 'DD/MM/YYYY'" +
	                '});' +
		            '});' +
			        '</script>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                            var description = $("#description").val()
                            var end = $('#time').val()
                            var course = {
                            	name : name,
                            	description : description,
                            	end : end
                            }
                            $scope.allCourse.push(course);
                            $scope.$apply();
                            
                        }
                    }
                }
            }
        );
	}
});
