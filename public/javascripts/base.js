var app = angular.module('myStudy', ['ngAnimate']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})
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
app.controller('base', function($scope,$location,$http) {
 
	
});
