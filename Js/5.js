function Map(el, arrows, images, leftPart, rightPart, font, back) {
	this.screen = el;
	this.left = arrows[0];      // 左箭头
  this.right = arrows[1];     // 右箭头
  this.imgList = images       // 照片列表
  this.leftPart = leftPart;   // 左侧方块
  this.rightPart = rightPart; // 右侧方块
  this.font = font;    // 方块正面
  this.back = back;    // 方块背面
  this.nodelist = node.children;  // 下标列表
  this.index = 0;      // 图片索引
  this.timeId = null;  // 定时器id
  this.imgArr = ["url(image/1.png)","url(image/2.png)","url(image/3.png)","url(image/4.png)"]; // 图片地址
}
// 动画
Map.prototype.change = function () {
	let self = this;
	let i = 0;
	changeIndex = 0;

  self.nodelist[self.index].className = "li2";
	for (i = 0; i < self.back.length; i++) {  //  换背图
		self.back[i].style.backgroundImage = self.imgArr[self.index]; 
	}
	for (i = 0; i < self.leftPart.length; i++) { // 执行 change1，change2 动画
    setTimeout(function () {
      self.leftPart[changeIndex].style.animation = "change1 1.5s forwards";
  		self.rightPart[changeIndex].style.animation = "change2 1.5s forwards";
  		changeIndex ++;
    }, 100*i);
	}

	setTimeout(function() {
		changeIndex = 0;
		self.imgList[self.index].style.display = "block";
		for (i = 0; i < self.back.length; i++) {  //  换正图
  		self.font[i].style.backgroundImage = self.imgArr[self.index]; 
  	}
		for (i = 0; i < self.leftPart.length; i++) { // 消去 change1，change2 动画
		  self.leftPart[i].style.animation = "";
		  self.rightPart[i].style.animation = "";
	  }
	}, 1800);
};
// > < 点击
Map.prototype.changeClick = function(str) {
	let self = this;
	var len = self.imgList.length;
  
	if (changeJudge) {
		self.nodelist[self.index].className = "li1";
    self.imgList[self.index].style.display = "none";
		if(str == "left"){
			self.index = (self.index + len - 1) % len;
		}else if(str == "right"){
			self.index = (self.index + 1) % len;
		}
		self.change();
    // 2秒后才能再次点击
  	changeJudge = false;  
  	setTimeout(function(){
  		changeJudge = true;
  	}, 2000);
	}
};
// 下标点击
Map.prototype.nodeClick = function (target) {
	let self = this;

	if(nodeJudge) {
		self.nodelist[self.index].className = "li1";
  	self.imgList[self.index].style.display = "none";
  	self.index = parseInt(target);
  	self.change();
  	// 2秒后才能再次点击
  	nodeJudge = false;  
  	setTimeout(function(){
  		nodeJudge = true;
  	}, 2000);
	}
}
// 初始化
Map.prototype.init = function () {
	let self = this;
	changeJudge = true;  // 判断 > < 能否点击\
	nodeJudge = true;

  // > < 点击
	self.left.onclick = function () {
		self.changeClick("left");
	};
	self.right.onclick = function () {
		self.changeClick("right");
	}  
	// 节点点击
  for (var i = 0; i < self.nodelist.length; i++) {

  	self.nodelist[i].onclick = function () {
  		var target = this.getAttribute("id");
  		self.nodeClick(target);
  	}
  }
  // 定时器轮播
	self.timeId = setInterval(function() {
		self.changeClick('right')	
	}, 2500); 
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
	  }, 2500); 
  };
};
// 获取节点
var el = document.getElementsByClassName('container')[0];
var arrows = document.getElementsByClassName('arrows');
var images = document.getElementsByClassName('images');
var leftPart = document.getElementsByClassName('left');
var rightPart = document.getElementsByClassName('right');
var font = document.getElementsByClassName('font');
var back = document.getElementsByClassName('back');
var node = document.getElementsByClassName('node')[0];
// 新构对象 
var map = new Map(el, arrows, images, leftPart, rightPart, font, back, node);
// 初始化轮播图
map.init();