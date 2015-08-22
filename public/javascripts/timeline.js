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
app.controller('timeline', function($scope,$location,$http) {
	$scope.activeCourse = {
        name : "Sistem Operasi A",
        description : "Praktikum Sistem Operasi kelas A",
        alias : "Sisop A",
        end : "10/11/2015",
        color : "#F5AB35"
    }

    $scope.allTimeline =[];
    $scope.addEvent = function(){
        bootbox.dialog({
                title: "Add new course",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Event Name</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="name" name="name" type="text" placeholder="Your event name" class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Event Description</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<input id="description" name="description" type="text" placeholder="Your event description" class="form-control input-md"> ' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-text-background"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Event Type</label> ' +
                    '<div class="col-md-4 input-group"> ' +
                    '<select class="form-control" id="type">' +
                    '<option value="presence" >PRESENCE</option>' +
                    '<option value="assignments" >ASSIGNMENTS</option>' +
                    '</select>' +
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-list"></span>' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group">' +
                    '<label class="col-md-4 control-label" for="name">Event time</label> ' +
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
                    "format: 'DD/MM/YY HH:mm'" +
                    '});' +
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
                            var time = $('#time').val()
                            var type = $('#type').val()
                            var event = {
                                name : name,
                                description : description,
                                type : type,
                                datetime:time,
                                time:time.split(" ")[1],
                                date: time.split(" ")[0]
                            }
                            console.log(event)
                            if(name == "" || type =="" || time==""){
                                bootbox.alert("<i style='color:red' class='fa fa-warning fa-lg'></i><b style='color:red'> Error please fill all required field</b>", function(result) {
                                  
                                }); 
                            }
                            else
                            {
                                $scope.allTimeline.push(event);
                                $scope.$apply();
                            }
                            
                        }
                    }
                }
            }
        );
    }
    $scope.configure = function(event){
        if(event.type=="presence")
        {


            bootbox.dialog({
                    title: "Add new course",
                    message: '<div class="row">' +
                        '<div class="col-md-12">' +
                        '<form class="form-horizontal"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-4 control-label" for="name">Event Name</label> ' +
                        '<div class="col-md-4 input-group"> ' +
                        '<input id="name" value="'+event.name+'" name="name" type="text" placeholder="Your event name" class="form-control input-md"> ' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-text-background"></span>' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-4 control-label" for="name">Event Description</label> ' +
                        '<div class="col-md-4 input-group"> ' +
                        '<input id="description" value="'+event.description+'" name="description" type="text" placeholder="Your event description" class="form-control input-md"> ' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-text-background"></span>' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-4 control-label" for="name">Presence Point</label> ' +
                        '<div class="col-md-4 input-group"> ' +
                        '<input id="point" name="point" min="0" value="1" type="number" placeholder="Give point" class="form-control input-md"> ' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-screenshot"></span>' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-4 control-label" for="name">Event Type</label> ' +
                        '<div class="col-md-4 input-group"> ' +
                        '<select class="form-control" id="lateOpt">' +
                        '<option value="yes" >Allow Late</option>' +
                        '<option value="no" >Not Allow Late</option>' +
                        '</select>' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-list"></span>' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="form-group">' +
                        '<label class="col-md-4 control-label" for="name">Presence time</label> ' +
                        '<div class="input-group date col-md-4 datetimepicker3" id="datetimepicker3">' +
                        '<input id="time" type="text" class="form-control datetimepicker3" value='+event.time+'/>' +
                        '<span class="input-group-addon">' +
                        '<span class="glyphicon glyphicon-time"></span>' +
                        '</span>' +
                        '</div>'  +
                        '</div>'  +
                        '</form> </div>  </div>'+
                        '<script type="text/javascript">' +
                        '$(function () {' +
                        "$('.datetimepicker3').datetimepicker({" +
                        "format: 'HH:mm'" +
                        '});' +
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
                                var time = $('#time').val()
                                var point = $('#point').val()
                                var allowLate = $('#lateOpt').val()
                                
                                var config = {
                                    presenceTime:time,
                                    point:point,
                                    allowLate:allowLate
                                }
                                console.log(event)
                                if(name == "" || time==""){
                                    bootbox.alert("<i style='color:red' class='fa fa-warning fa-lg'></i><b style='color:red'> Error please fill all required field</b>", function(result) {
                                      
                                    }); 
                                }
                                else
                                {
                                    event.name = name
                                    event.description = description
                                    event.config = config
                                    $scope.$apply();
                                }
                                
                            }
                        }
                    }
                }
            );
        }
    }
    $scope.deleteEvent = function(event){
        bootbox.dialog({
          message: "This will delete event permanently",
          title: "Confirm Delete",
          buttons: {
            success: {
              label: "Cancel",
              className: "btn-primary",
              callback: function() {

              }
            },
            danger: {
              label: "Delete",
              className: "btn-danger",
              callback: function() {
                var index = $scope.allTimeline.indexOf(event);
                console.log(index)
                $scope.allTimeline.splice(index,1)
                $scope.$apply();
              }
            }
          }
        });
    }

});
