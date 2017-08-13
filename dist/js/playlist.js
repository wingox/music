(function ($ ,root){
	var controlmanager;
    var $playlist = $('<div class = "play-list">' + 
        '<div class="line-head">播放列表</div>' +
        '<ul class="plaay-list-wrap"></ul>' +
        '<div class="close-btn">关闭</div>' +
    	'</div>');
    function render(data){
    	var html = "";
    	var len = data.length;
    	for (var i = 0; i < len; i++) {
    		
    		html += '<li><h3>' + data[i].song+'<span>' + data[i].singer+'</span></h3></li>';
    	}
    	$playlist.find('ul').html(html);
    	$scope.append($playlist);
    	bindEvent();
    }
    function bindEvent(){
    	$playlist.on('click','.close-btn',function(){
    		$playlist.removeClass('show');
    	})
    	$playlist.on('click','li',function(){
    		var index = $(this).index();
    		signSong(index);
            controlmanager.index = index;
            $scope.trigger('play:change',[index,true]);
    		$scope.find('.play-btn').addClass('playing');
    		setTimeout(function(){
              $playlist.removeClass('show');
    		},1000)
    	})
    }
    function show(control){
           controlmanager = control;
           var index = controlmanager.index;
           $playlist.addClass('show');
           signSong(index);
    }
    function signSong(index){
    	$playlist.find('.playing').removeClass('playing');
    	$playlist.find('li').eq(index).addClass('playing');
    }
    root.playlist = {
    	render :render,
    	show : show
    }
}(window.Zepto,window.player || (window.player = {})))