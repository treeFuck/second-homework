function Map(el, image1, image2,arrows) {
  this.screen = el;
	this.imgList1 = image1.children;   // 照片1
	this.imgList2 = image2.children;   // 照片2
  this.left = arrows[0];           // 左箭头
  this.right = arrows[1];          // 右箭头
  this.index = 0;   // 数字按钮的索引
  this.timeId = null; // 定时器id
  this.imgArr = ["url(image/1.png)","url(image/2.png)","url(image/3.png)","url(image/4.png)"]; // 图片地址
}
// 动画
Map.prototype.change = function () {
	var self = this;

	for (var i = 0; i < self.imgList1.length; i++) {
		if(self.index % 2 == 0) {
  		self.imgList1[i].style.backgroundImage = self.imgArr[this.index % 4];
  	}else {
  		self.imgList2[i].style.backgroundImage = self.imgArr[this.index % 4];
  	}
		self.imgList1[i].style.transform = "rotateX(" + (this.index % 2) * 180 + "deg)";
		self.imgList2[i].style.transform = "rotateX(" + ((this.index + 1) % 2) * 180 + "deg)";
	}
};
// < 点击
Map.prototype.changeClick = function(str) {
	let self = this;
  
	if (changeJudge) {
    if (str == "left"){
       self.index --;
    }else {
       self.index ++;
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
	changeJudge = true;  // 判断 > 能否点击
  // < d点击
	self.left.onclick = function () {
		self.changeClick("left");
	};
  // > 点击
	self.right.onclick = function () {
		self.changeClick("right");
	}  
  // 定时器轮播
  self.timeId = setInterval(function() {
    self.changeClick('right') 
  }, 2000); 
  // 鼠标悬停，清空定时器，显示 > <
  self.screen.onmouseover = function () {
    self.left.style.display = 'block';
    self.right.style.display = 'block';
    self.timeId && clearInterval(self.timeId);
  };
  // 鼠标移开，重设定时器，隐蔽 > <
  self.screen.onmouseout = function () {
    self.left.style.display = 'none';
    self.right.style.display = 'none';
    self.timeId = setInterval(function() {
      self.changeClick('right') 
    }, 2000); 
  };
};
// 获取节点
var el = document.getElementsByClassName('container')[0];
var arrows = document.getElementsByClassName('arrows');
var image1 = document.getElementsByClassName('image1')[0];
var image2 = document.getElementsByClassName('image2')[0];
// 新构对象 
var map = new Map(el, image1, image2, arrows);
// 初始化轮播图
map.init();