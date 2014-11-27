if(typeof(xRequest) == 'undefined'){
	var xRequest = function(url, id, charset) {
		var DOC = document, sId = id || 'scr' + Math.random().toString().replace(/\./g, '');
		var sc = DOC.getElementById(sId);
		var head = DOC.getElementsByTagName('head').item(0);
		if (sc && sc.parentNode == head) {
			head.removeChild(sc);
		}
		sc = DOC.createElement("script");
		sc.setAttribute('src', url);
		sc.setAttribute('id', sId);
		sc.setAttribute('type', 'text/javascript');
		if ( typeof (charset) != 'undefined') {
			sc.setAttribute('charset', charset);
		}
		head.appendChild(sc);
		return sc;
	};
}
function y_appendCSS(sId, sCss) {
	var cssId = 'css_' + sId;
	if (document.getElementById(cssId)) {
		return;
	}
	var d = document.createElement('style'), dHead = document.getElementsByTagName('head')[0];
	if (!dHead) {
		return;
	}
	d.setAttribute('type', 'text/css');
	d.id = cssId;
	if (!/MSIE/ig.test(navigator.appVersion)) {
		d.innerHTML = sCss.replace(/ysmad/ig, sId);
	} else {
		d.styleSheet.cssText = sCss.replace(/ysmad/ig, sId);
	}
	dHead.appendChild(d);
}
function y_showAd(args){
	var dAd = document.getElementById(args.sId);
	if (dAd) {
		dAd.innerHTML = args.sHtm;
		dAd.style.display = '';
	}
	if ( typeof args.sCallback === "function") {
		args.sCallback.call(this);
	}
}
function y_windowopen(url) {
	instance = window.open("about:blank");
	instance.document.write("<meta http-equiv=\"refresh\" content=\"0;url=" + url + "\">");
	instance.document.close();
	return false;
}
function y_srcollAd(args){
	var obj = document.getElementById(args.obj),
		prevObj = document.getElementById(args.prevObj),
		speed = 60,
		autoScrollAd,
		scrollad = function(){
		if((obj.offsetWidth - prevObj.offsetWidth) <= prevObj.scrollLeft){
			clearInterval(autoScrollAd);
		}else{
			prevObj.scrollLeft++;
		}
	};
	setTimeout(function(){
		autoScrollAd = setInterval(scrollad, speed);
		prevObj.onmouseover = function() {
			clearInterval(autoScrollAd);
		};
		prevObj.onmouseout = function() {
			autoScrollAd = setInterval(scrollad , speed);
		};
	}, 5000);
}
(function(){
	if(typeof (twysm_id) == 'undefined' || typeof (twysm_partner) == 'undefined' || typeof (twysm_unit) == 'undefined'){
		return;
	}
	/* common parameters */
	var aId = typeof (twysm_id) != 'undefined' ? twysm_id : '',
		aPartner = typeof (twysm_partner) != 'undefined' ? twysm_partner : '',  // partner 
		aUnit = typeof (twysm_unit) != 'undefined' ? twysm_unit : '',  // template
		aSize = typeof (twysm_size) != 'undefined' ? twysm_size : '',  // 寬度 默認是全屏（可省略）
		aLoc = typeof (twysm_loc) != 'undefined' ? twysm_loc : '',  // 位置 默認居中，center代表居中，left代表靠左（可省略）
		aNum = typeof (twysm_num) != 'undefined' ? twysm_num : 30,  // 數量 默認拉取30條廣告（可省略）
		aPic = typeof (twysm_pic) != 'undefined' ? twysm_pic : "n";  // 縮略圖  默認不顯示，y代表顯示，n代表不顯示（可省略）
		
	/* clean */
	twysm_id = undefined;
	twysm_size = undefined;  // 寬度 默認是全屏
	twysm_loc = undefined;  // 位置 默認靠左，center代表居中，left代表靠左
	twysm_num = undefined;  // 數量 默認拉取30條廣告
	twysm_pic = undefined;  // 縮略圖  默認不顯示，true代表顯示，false代表不顯示
	twysm_partner = undefined;  // partner 
	twysm_unit = undefined;  // template
	
	var divStyle = 'position: fixed; bottom: 0;',
		_size = aSize ? (divStyle += 'width: ' + aSize + 'px;') : (divStyle += 'width: 100%;'), 
		_loc;
	if(aLoc && aLoc == "left"){
		divStyle += 'left: 0px;';
	}else{
		divStyle += 'left: 50%; margin-left: -' + (aSize / 2) + 'px;';
	}
	
	/* generate ad container */
	document.write('<div id="' + aId + '" style="' + divStyle + '"></div>');
	
	var aUrl = 'http://sc.203.adsbro.com/ytw/hotspot/?'
			+ 'p=' + aPartner
			+ '&t=' + aPic
			+ '&n=' + aNum
			+ '&unit=' + aUnit
			+ '&aid=' + aId;
			
	xRequest(aUrl, 'scr_' + aId);
})();
