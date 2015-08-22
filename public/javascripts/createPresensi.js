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
app.controller('createPresensi', function($scope,$location,$http) {
 
	$scope.allUser =[{nrp:"5112100080",isCheck:false,isHide:false},{nrp:"5112100081",isCheck:false,isHide:false}
	,{nrp:"5112100082",isCheck:false,isHide:false},
	{nrp:"5112100083",isCheck:false,isHide:false},{nrp:"5112100084",isCheck:false,isHide:false},
	{nrp:"5112100085",isCheck:false,isHide:false},{nrp:"5113100085",isCheck:false,isHide:false}]
	
	$scope.angkatan =[{value:"5111",label:"2011"},{value:"5112",label:"2012"},
	{value:"5113",label:"2013"},{value:"5114",label:"2014"},{value:"5115",label:"2015"}]
	$scope.searchUser = ""
	$scope.check= function()
	{
		console.log($scope.allUser)
	}
	$scope.$watch('isCheckAll',function(){
		if($scope.isCheckAll)
		for(i = 0;i<$scope.allUser.length;i++ ){
			if(!$scope.allUser[i].isHide)$scope.allUser[i].isCheck = true;
		}
		else for(i = 0;i<$scope.allUser.length;i++ ){
			$scope.allUser[i].isCheck = false;
		}
	})
	$scope.$watch('searchUser',function(){
		console.log($('#time').val())
		for(i = 0;i<$scope.allUser.length;i++ ){
			if($scope.allUser[i].nrp.indexOf($scope.searchUser) > -1)$scope.allUser[i].isHide = false
			else if($scope.searchUser == "")$scope.allUser[i].isHide = false
			else $scope.allUser[i].isHide = true
		}
		console.log($scope.searchUser)
	})

});
