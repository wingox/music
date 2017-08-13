//管理歌曲
(function($,root){
	function audioManager (){
		this.audio = new Audio();
		this.status = "pause";
		this.bindEvent();
	}
	audioManager.prototype = {
		//绑定时间
		bindEvent:function(){
			$(this.audio).on("ended",function(){
				$scope.find(".next-btn").trigger('click');
			})
		},
		//歌曲播放
		play : function(){
			this.audio.play();
			this.status = "play";

		}, 
		//歌曲暂停
		pause :function(){
			this.audio.pause();
			this.status = "pause";
		},
		//切换歌曲的音频路径
		setAudio :function(src){
			this.audio.src = src;
			this.audio.load();
		},
		jumpToPlay : function(duration){
			this.audio.currentTime = duration;
			this.play();
		}
 	}
 	root.audioManager = audioManager;
}(window.Zepto,window.player || (window.player = {})))