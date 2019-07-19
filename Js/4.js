function Map(el, arrows, images) {
	this.screen = el;
	this.left = arrows[0];           // 左箭头
  this.right = arrows[1];          // 右箭头
  this.imgList = images  // 照片列表
  this.index = 0;   // 数字按钮的索引
  this.timeId = null; // 定时器id
}
// 动画
Map.prototype.change = function () {
	let self = this;
	var len = self.imgList.length;

  console.log(self.index);
	for (var i = 0, j = self.index; i < len; i++) {
		self.imgList[j % len].className = "images trasform" + i;
		j++;
	}
};
// > < 点击
Map.prototype.changeClick = function(str) {
	let self = this;
	var len = self.imgList.length;

	if (changeJudge) {
		if(str == "left"){
			self.index = (self.index + len - 1) % len;
		}else if(str == "right"){
			self.index = (self.index + 1) % len;
		}
		self.change();

    // 0.8秒后才能再次点击
  	changeJudge = false;  
  	setTimeout(function(){
  		changeJudge = true;
  	}, 800);
	}
};
// 初始化
Map.prototype.init = function () {
	let self = this;
	changeJudge = true;  // 判断 > < 能否点击

	self.change();
  // > < 点击
	self.left.onclick = function () {
		self.changeClick("left");
	};
	self.right.onclick = function () {
		self.changeClick("right");
	}  
  //定时器轮播
	self.timeId = setInterval(function() {
		self.changeClick('right')	
	}, 1200); 
  // 鼠标悬停，清空定时器，显示 > <
  self.screen.onmouseover = function () {
    self.left.style.display = 'block';
    self.right.style.display = 'block';
    self.timeId && clearInterval(self.timeId);
  };
  // // 鼠标移开，重设定时器，隐蔽 > <
  self.screen.onmouseout = function () {
    self.left.style.display = 'none';
    self.right.style.display = 'none';
    self.timeId = setInterval(function() {
		  self.changeClick('right')	
	  }, 1200); 
  };
};
// 获取节点
var el = document.getElementsByClassName('container')[0];
var arrows = document.getElementsByClassName('arrows');
var images = document.getElementsByClassName('images');
// 新构对象 
var map = new Map(el, arrows, images);
// 初始化轮播图
map.init();