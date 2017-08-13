//封装渲染模块
(function($,root){
	var $scope = $(document.body);
	//歌曲信息
  function renderInfo(data){
  	var html = "<h1 class = 'song-name'>" + data.song+"</h1>" +
  	           "<h3 class = 'singer-name'>" + data.singer+"</h3>" +
  	           "<h3 class = 'album-name'>" + data.album+"</h3>";
  $scope.find('.song-info').html(html);	           
  }
  //歌曲图片

  function renderImage(src){
     var img = new Image();
     img.onload = function(){
     	$scope.find(".song-img img").attr("src",src);
      // console.log(root.blurImg);
        root.blurImg(img,$scope);
     }
     img.src = src;
  }
//  宣染喜欢
  function renderLike(islike){
  	if (islike) {
  		$scope.find(".like-btn").addClass("liked");
  	}else{
  		$scope.find(".like-btn").removeClass("liked");
  	}
      // $scope.find(".like-btn").on('click',function(){
      //   if (this.class = 'liked') {
      //     $scope.find(".like-btn").removeClass("liked");
      //   }
      // })
  }
  root.render = function(data){

  	renderInfo(data);
  	renderImage(data.image);
  	renderLike(data.isLike);
  }
}(window.Zepto,window.player || (window.player = {})))