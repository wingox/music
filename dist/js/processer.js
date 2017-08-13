//管理进度条
(function($,root){
	var $scope = $(document.body) 
	var starttime;
	var curDuration,
	    frameId,
	    lastpercentage = 0;
	//转换时间
	function forTime(time){
	  time = Math.round(time); 
      var minute = Math.floor(time / 60);
	  var second = time - minute * 60;
	  if (minute < 10) {
	  	minute = "0" + minute;
	  }
	  if (second < 10) {
	  	second = "0" + second;
	  }
	  return minute + ":" + second;
	}
	//渲染总时间
    function render(duration){
     curDuration = duration;
	 lastpercentage = 0;
     updata(0);
     var allTime = forTime(duration);
     $scope.find(".all-time").text(allTime);     
    }
    function setprocesser(percentage){
        var percent = (percentage - 1) * 100 + "%";
        $scope.find('.pro-top').css({
        	"transform":"translateX("+percent+")"
        })

    }
    function updata(percentage){
       var curTime =forTime( percentage * curDuration);
       $scope.find(".cur-time").text(curTime);
       // console.log(curTime);

       setprocesser(percentage);
    }
    //渲染当前时间
    function start(percent){
    	if (percent === undefined) {
    		lastpercentage = lastpercentage;
    	}else{
    		lastpercentage = percent;
    	}
    	cancelAnimationFrame(frameId);
    	starttime = new Date().getTime();
    	function frame(){
            var curTime = new  Date().getTime();
            var percentage = lastpercentage + (curTime - starttime) / (curDuration * 1000);
    	    if (percentage < 1) {
    	    	updata(percentage);
    	    	//console.log(percentage);
               frameId = requestAnimationFrame(frame);
    	    }else{
    	    	cancelAnimationFrame(frameId);
    	    }
    	}
        frame();
    }
    //渲染喜欢
     function favourate(){
     $scope.find(".like-btn").on('click',function(){
        if (this.class = 'liked') {
          $scope.find(".like-btn").removeClass("liked");
        }
      })
     }
    //结束动画
    function stop(){
    	var curTime = new Date().getTime();
    	lastpercentage = lastpercentage + (curTime - starttime) / (curDuration * 1000);
    	cancelAnimationFrame(frameId);

    }
    root.processer = {
    	render : render,
    	start : start,
    	stop : stop,
    	updata : updata,
      favourate : favourate
    };

}(window.Zepto,window.player || (window.player = {})))