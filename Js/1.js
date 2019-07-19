function Map(el, arrows, images) {
	this.screen = el;  
	this.width = this.screen.offsetWidth; // 移动宽度
	this.imgBox = images;            // 照片盒子
  this.imglist = images.children;  // 照片列表
  this.left = arrows[0];           // 左箭头
  this.right = arrows[1];          // 右箭头
  this.index = 0;   // 数字按钮的索引
  this.timeId = null; // 定时器id
}

// 动画
Map.prototype.animate = function () {
	this.imgBox.style.transform = 'translateX(' + -this.index * this.width + 'px)';
};


// < 点击
Map.prototype.leftOnclick = function() {
	let self = this;
  
  if (leftJudge) {	
		if (self.index === 0) {
			self.index = self.imglist.length - 1;
			self.imgBox.style.transitionDuration = '0s';
			self.animate();   
		}
  	
  	setTimeout(function() {
  		self.index --;
  		self.imgBox.style.transitionDuration = '.80s';
  		self.animate();
  	}, 20);

    // 一秒后才能再次点击
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
		if (self.index === self.imglist.length - 1){
			self.index = 0;
			self.imgBox.style.transitionDuration = '0s';
			self.animate();  
		}

  	setTimeout(function() {
  		self.index ++;
  		self.imgBox.style.transitionDuration = '.80s';
  		self.animate();
  	}, 20);

  	// 一秒后才能再次点击
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

	self.left.onclick = function () {
		self.leftOnclick();
	};

	self.right.onclick = function () {
		self.rightOnclick();
	}
  
  self.timeId = setInterval(self.rightOnclick.bind(self), 2000);
  
  self.screen.onmouseover = function () {
    self.left.style.display = 'block';
    self.right.style.display = 'block';
    self.timeId && clearInterval(self.timeId);
  };

  self.screen.onmouseout = function () {
    self.left.style.display = 'none';
    self.right.style.display = 'none';
    self.timeId = setInterval(self.rightOnclick.bind(self), 2000);
  };
}

var el = document.getElementsByClassName('container')[0];
var arrows = document.getElementsByClassName('arrows');
var images = document.getElementsByClassName('images')[0];

var map = new Map(el, arrows, images);
map.init();
