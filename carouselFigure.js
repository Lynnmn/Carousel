
(function($){

	$.fn.carouselFigure = function(options){
		return this.each(function(){
			var me = $(this),
				instance = me.data('carouselFigure');

			if(!instance){
				me.data('carouselFigure', (instance = new carouselFigure(me,options)))
			}

			if($.type(options) === 'string') return instance[options]();
		});
	};

	$.fn.carouselFigure.defaults = {
		selectors: {
			list: '.list',   // 父元素
			item: '.item',   // 列表元素
			active: 'active'  
		},
		index: 0,   // 当前元素索引
		easing: 'ease',   // 过渡方式
		duration: 2000,   // loop的时间间隔
		loop: false,    // 是否循环
		callback:""   // 回调函数
	}

	/*说明:获取浏览器前缀*/
	/*实现：判断某个元素的css样式中是否存在transition属性*/
	/*参数：dom元素*/
	/*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
	var _prefix = (function(temp){
		var aPrefix = ["webkit", "Moz", "o", "ms"],
			props = "";
		for(var i in aPrefix){
			props = aPrefix[i] + "Transition";
			if(temp.style[props] !== undefined){
				return "-" + aPrefix[i].toLowerCase() + "-";
			}
		}
	})(document.createElement(carouselFigure));

	var carouselFigure = (function(){
		function carouselFigure(element,options){
			this.settings = $.extend(true, $.fn.carouselFigure.defaults, options || {});
			this.element = element;
			this.init();
		}

		carouselFigure.prototype = {
			/* 初始化插件 */
			init: function(){
				var me = this;
				me.selectors = me.settings.selectors;
				me.list = me.element.find(me.selectors.list);
				me.item = me.element.find(me.selectors.item);

				me.itemCount = me.itemCount();
				me.index = (me.settings.index > 0 && me.settings.index < me.itemCount) ? me.settings.index : 0;

				me.loop();
			},   
			/* 获取滑动的图片数量 */
			itemCount: function(){
				return this.item.length;
			},
			/* 获取滑动图片的宽度 */ 
			itemWidth: function(){
				return this.item.width();
			},
			loop: function(){
				var me = this;
				if(me.index < me.itemCount ){
					i++;
				}else{
					i = 1;
				}
				me.animate();
			},
			animate: function(){
				var me = this;
				me.index++;
				me.list.css({
					'left': -me.index*parseInt(me.itemWidth) + 'px'
				})

				if(me.index > me.itemCount){
					
				}
			}
		}
	});

	$(function(){
		$('[data-carouselFigure]').carouselFigure();
	})


})(jquery)

