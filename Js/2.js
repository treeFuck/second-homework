function Map(el, arrows, images, node) {
	this.screen = el;  
	this.imgBox = images;            // 照片盒子
  this.imglist = images.children;  // 照片列表
  this.nodelist = node.children;  // 下标列表
  this.left = arrows[0];           // 左箭头
  this.right = arrows[1];          // 右箭头
  this.index = 0;   // 数字按钮的索引
  this.timeId = null; // 定时器id
}

// 动画
Map.prototype.change1 = function () { // 删除效果
	this.imglist[this.index].className = "img1";
	this.nodelist[this.index].className = "li1";
};
Map.prototype.change2 = function () { // 添加效果
  this.imglist[this.index].className = "img2";
	this.nodelist[this.index].className = "li2";

};

// < 点击
Map.prototype.leftOnclick = function() {
	let self = this;

  
	if (leftJudge) {
		self.change1();
		self.index --;
		if (self.index === -1) {
			self.index = self.imglist.length -1;
		}		
		self.change2();

		// 0.8秒后才能再次点击
  	leftJudge = false;  
  	setTimeout(function(){
  		leftJudge = true;
  	}, 800);
	}
};

// > 点击
Map.prototype.rightOnclick = function () {
	let self = this;

	if (rightJudge) {
		self.change1();
		self.index ++;
		if (self.index === self.imglist.length) {
			self.index = 0;
		}		
		self.change2();

		// 0.8秒后才能再次点击
  	rightJudge = false;  
  	setTimeout(function(){
  		rightJudge = true;
  	}, 800);
	}
};

// 初始化
Map.prototype.init = function () {
	let self = this;
	leftJudge = true;  // 判断 < 能否点击
	rightJudge = true; // 判断 > 能否点击

  // < d点击
	self.left.onclick = function () {
		self.leftOnclick();
	};

  // > 点击
	self.right.onclick = function () {
		self.rightOnclick();
	}
  
  // 节点点击
  for (var i = 0; i < self.nodelist.length; i++) {

  	self.nodelist[i].onclick = function () {
  		self.change1();
  		self.index = this.getAttribute("id");
  		self.change2();
  	} 
  }
  
  // 定时器轮播
	self.timeId = setInterval(self.rightOnclick.bind(self), 2000);
  
  // 鼠标悬停，清空定时器，显示 > <
  self.screen.onmouseover = function () {
    self.left.style.display = 'block';
    self.right.style.display = 'block';
    self.timeId && clearInterval(self.timeId);
  };
  //  鼠标移开，重设定时器，隐蔽 > <
  self.screen.onmouseout = function () {
    self.left.style.display = 'none';
    self.right.style.display = 'none';
    self.timeId = setInterval(self.rightOnclick.bind(self), 2000);
  };
};

// 获取节点
var el = document.getElementsByClassName('container')[0];
var arrows = document.getElementsByClassName('arrows');
var node = document.getElementsByClassName('node')[0];
var images = document.getElementsByClassName('images')[0];

// 新构对象
var map = new Map(el, arrows, images, node);
// 初始化轮播图
map.init();