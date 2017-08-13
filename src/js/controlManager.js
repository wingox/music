//管理index索引
(function  ($,root) {
	function controlManager (length){
		this.index = 0;
		this.length = length;
		// this.__proto__ = controlManager.prototype;
	 //    return
	}
	controlManager.prototype = {
		//下一首
		next :function(){
            return this.getIndex(1);
		},
		//上一首
		prev:function(){
           return this.getIndex(-1);
		},
		getIndex:function(val){
			var index = this.index;
			var len = this.length;
			var curIndex = (index + val +len) %len;
			this.index = curIndex;
			return curIndex;
		}

	}
	// var c = new controlManager();
	root.controlManager = controlManager;
}(window.Zepto,window.player || (window.player = {})))