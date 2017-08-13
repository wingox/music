var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var processer = root.processer;
var playlist = root.playlist;

$scope.on("play:change",function(e,index,flag){
	var curdata = songList[index];
	root.render(curdata);
	audiomanager.setAudio(curdata.audio);
    if (audiomanager.status === "play" || flag) {
    	audiomanager.play();
    	processer.start();
    };
    processer.render(curdata.duration);
})
$scope.on("click",".like-btn",function(islike){   
  	if (islike){
  		$scope.find(".like-btn").addClass("liked");
  	}else{
  		$scope.find(".like-btn").removeClass("liked");
  	}   
	})
$scope.on("click",".play-btn",function(){
	if (audiomanager.status === "play") {
		
		audiomanager.pause();
		processer.stop();
	}else{
		processer.start();
		audiomanager.play();
	}
	$scope.find(".play-btn").toggleClass("playing");
})
$scope.on("click",'.list-btn',function(){
 playlist.show(controlmanager);
})

//绑定touch时间
function bindTouch(){
	var $slidePoint = $scope.find('.slide-point');
	var offset = $scope.find('.pro-wrapper').offset();
	var left = offset.left;
	var width = offset.width;
	$slidePoint.on("touchstart",function(e){
		processer.stop();
	}).on("touchmove",function(e){
	var x = e.changedTouches[0].clientX;
    var percentage = (x - left) / width;
     if (percentage > 1 || percentage < 0) {
     	percentage = 0;
     };
    processer.updata(percentage);
 }).on("touchend" ,function(e){
 	var x = e.changedTouches[0].clientX;
    var percentage = (x - left) / width;
   if (percentage  > 1 || percentage < 0) {
   	percentage = 0;
   };
    processer.start(percentage);
   var curDuration =  songList[controlmanager.index].duration;
   var duration = curDuration * percentage;
    audiomanager.jumpToPlay(duration);
    $scope.find('.play-btn').addClass("playing");
 })
}
$scope.on("click",".prev-btn",function(){
    var index = controlmanager.prev();
    // root.render(songList[index]);
	$scope.trigger("play:change",[index])
} )
$scope.on("click",".next-btn",function(){
	var index = controlmanager.next();
	// root.render(songList[index]);
	$scope.trigger("play:change",[index])
})
function getData (url) {
	// $(document).trigger("ajaxstart",function(){

	// })
	// $(document).on("ajaxstart",function(){})
	$.ajax({
		url:url,
		type:"GET",
		success:successedFn,
		error:function(){
			console.log("error");
		}
	});
	// .done(function(){}).fail(function(){})
}
function successedFn(data){
	bindTouch();
    songList = data;
    controlmanager = new root.controlManager(data.length);
	// console.log(data[0]);
	// root.render(data[0]);
	// root.render(songList[0]);
	$scope.trigger("play:change",[0]);
	playlist.render(data);
}
getData("/mock/data.json");