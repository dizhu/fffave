function AddFave( stylesheet ) {
	this.stylesheet = stylesheet;
	
	this.visible = false;

	this.create = function(){
		//alert('hello');
		var that = this;
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = this.stylesheet;
		if( document.getElementsByTagName("head").item(0) ) {
			document.getElementsByTagName("head").item(0).appendChild( css );
		} else {
			document.getElementsByTagName("body").item(0).appendChild( css );
		}	

	}
	
	this.show = function() {
		this.visible = true;
		var that = this;
		var thebox = document.createElement('div');
		var forimg = document.createElement('div');
		var arrayPageSize = this.getPageSize();
		thebox.id = 'faveva';
		document.body.appendChild(thebox);

		forimg.id = 'forimg';

		favebackground = document.createElement('div');
		favebackground.id = 'favebackground-w';
		favebackground.style.height = arrayPageSize[1] + 'px';
		favebackground.onclick = function(){
			return that.cancel();
		}
		
		document.getElementById('faveva').appendChild(forimg);
		forimg.appendChild(favebackground);
		
		var images = document.getElementsByTagName('img');
		for( var i=0; i<images.length; i++ ) {
			var img = images[i];
			if( img && img.src && img.src.match(/(space|blank)[^\/]*\.gif$/i) ) {
				img.style.display = 'none';
			}
			else if( img && img.src && img.width > 250 && img.height > 250) {
				//alert('hello');
				imgposition = this.getPosition(img);
				//alert(imgposition.x);
				imgdv = document.createElement('div');
				imgdv.id = 'favevaimg' + i;
				imgdv.className = 'faveimg';
				imgdv.style.width = img.width + 'px';
				imgdv.style.height = img.height + 'px';
				imgdv.style.lineHeight = img.height + 'px';
				imgdv.style.left = imgposition.x + 'px';
				imgdv.style.top = imgposition.y + 'px';

				imgdv.title = img.src;

				addfav_text = document.createTextNode('Add as a favorite');
				imgdv.appendChild(addfav_text);
				document.getElementById('forimg').appendChild(imgdv);
				img.parentNode.onclick = function() {return false;}
				imgdv.onmouseover = function() {this.className = 'faveimg2';}
				imgdv.onmouseout = function() {this.className = 'faveimg';}
				
				imgdv.onclick = function(){
					return that.selectImage(this.title);
				}
			}
		}
	}
	this.toggle = function() {
		if( !this.visible ) {
			this.show();
		} else {
			this.cancel();
		}
		return false;
	}
	this.selectImage = function(fileurl) {
		var that = this;
		var arrayPageSize = this.getPageSize();
		var arrayPageScroll = this.getPageScroll();
	    document.getElementById('faveva').removeChild(document.getElementById('forimg'));
	    
	    var title = document.title;
		var via = document.location.href;
		Scrollh = arrayPageScroll[1] + 100;

		favevapost = document.createElement('div');
		favevapost.id = 'favevapost';
		document.getElementById('faveva').appendChild(favevapost);
		postbox = document.createElement('div');
		postbox.id = 'postbox';
		postbox2 = document.createElement('div');
		postbox2.id = 'postbox2';
		postbox.style.top = Scrollh + 'px';
		postbox2.style.top = Scrollh + 'px';
		favebackground = document.createElement('div');
		favebackground.id = 'favebackground-b';
		favebackground.style.height = arrayPageSize[1] + 'px';
		favebackground.onclick = function(){
			return that.cancel();
		}
		favevapost.appendChild(postbox);
		favevapost.appendChild(postbox2);
		favevapost.appendChild(favebackground);
		
		document.getElementById('postbox').innerHTML = '<div class="formdv"><form method="post" action="http://favefavefave.com/save/"><ol><li><label for="post_title">title</label><input class="input-text" value="' + title + '" name="post_title" id="post_title" type="text" /></li><li><label for="tags">Tags</label><input class="input-text" value="" name="tags" id="tags" type="text" /></li><li style="color:#999;">Separate tags with commas.</li><li><label for="post_via">Via</label><input class="input-text" value="' + via + '" name="post_via" id="post_via" type="text" /></li><li><label for="fileurl">Image</label><input class="input-text" value="' + fileurl + '" name="fileurl" id="fileurl" type="text" /></li></ol><p id="faveov" style="font-size:1.2em"><input class="btn" type="submit" onclick="document.getElementById(\'faveov\').style.display=\'none\';document.getElementById(\'faveov2\').style.display=\'block\';" value="Add favorite" /> or </p><p id="faveov2" style="display:none;"><img src="http://favefavefave.com/images/ajax-loader.gif" alt="loading..." /></p></form></div>';
		favevacancel = document.createElement('a');
		favevacancel.href = 'javascript:void(0)';
		favevacancel_text = document.createTextNode('Cancel');
		favevacancel.appendChild(favevacancel_text);
		
		favevacancel.onclick = function(){
			return that.cancel();
		}
		
		document.getElementById('faveov').appendChild(favevacancel);
	}
	
	this.cancel = function() {
		this.visible = false;
	    return document.body.removeChild(document.getElementById('faveva'));
	}
	
	this.toggle = function() {
		if( !this.visible ) {
			this.show();
		} else {
			this.cancel();
		}
		return false;
	}
	
	this.getPosition = function(e) {
	    var o = {x:0,y:0};
	    var n = e;
	    do {
	      o.x += n.offsetLeft;
	      o.y += n.offsetTop;
	      n = n.offsetParent;
	    }
	    while(n)
	      return o;
	  }
	  
	 this.getPageScroll = function(){
	  
	  	var xScroll, yScroll;
	  
	  	if (self.pageYOffset) {
	  		yScroll = self.pageYOffset;
	  		xScroll = self.pageXOffset;
	  	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
	  		yScroll = document.documentElement.scrollTop;
	  		xScroll = document.documentElement.scrollLeft;
	  	} else if (document.body) {// all other Explorers
	  		yScroll = document.body.scrollTop;
	  		xScroll = document.body.scrollLeft;	
	  	}
	  
	  	arrayPageScroll = new Array(xScroll,yScroll) 
	  	return arrayPageScroll;
	  }
	 
	 this.getPageSize = function (){
	 	
	 	var xScroll, yScroll;
	 	
	 	if (window.innerHeight && window.scrollMaxY) {	
	 		xScroll = window.innerWidth + window.scrollMaxX;
	 		yScroll = window.innerHeight + window.scrollMaxY;
	 	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
	 		xScroll = document.body.scrollWidth;
	 		yScroll = document.body.scrollHeight;
	 	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
	 		xScroll = document.body.offsetWidth;
	 		yScroll = document.body.offsetHeight;
	 	}
	 	
	 	var windowWidth, windowHeight;
	 	
	 //	console.log(self.innerWidth);
	 //	console.log(document.documentElement.clientWidth);
	 
	 	if (self.innerHeight) {	// all except Explorer
	 		if(document.documentElement.clientWidth){
	 			windowWidth = document.documentElement.clientWidth; 
	 		} else {
	 			windowWidth = self.innerWidth;
	 		}
	 		windowHeight = self.innerHeight;
	 	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
	 		windowWidth = document.documentElement.clientWidth;
	 		windowHeight = document.documentElement.clientHeight;
	 	} else if (document.body) { // other Explorers
	 		windowWidth = document.body.clientWidth;
	 		windowHeight = document.body.clientHeight;
	 	}	
	 	
	 	// for small pages with total height less then height of the viewport
	 	if(yScroll < windowHeight){
	 		pageHeight = windowHeight;
	 	} else { 
	 		pageHeight = yScroll;
	 	}
	 
	 //	console.log("xScroll " + xScroll)
	 //	console.log("windowWidth " + windowWidth)
	 
	 	// for small pages with total width less then width of the viewport
	 	if(xScroll < windowWidth){	
	 		pageWidth = xScroll;		
	 	} else {
	 		pageWidth = windowWidth;
	 	}
	 //	console.log("pageWidth " + pageWidth)
	 
	 	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	 	return arrayPageSize;
	 }
	 this.create();
}
var str= document.location.href;
var re = /http:\/\/([^\/]+)\//i;
var h = str.match(/(renren.com|diggfoto.com|topit.me|favefavefave.com|picasaweb.google.com|kaixin001.com|baidu.com|qq.com|douban.com|tucia.com|u148.net|sina.com.cn|163.com|konachan.com|sohu.com|soso.com|ohmf.us|beautifulphoto.net)/i);

if(!h){
	if( typeof(Faveva_Instance) == 'undefined' )  {
		var Faveva_Instance = new AddFave(
			'http://favefavefave.com/css/post.css'
		);
	}
	Faveva_Instance.toggle();
}
else{
	alert('it\'s NOT support this website, pls change othersite.');
}
