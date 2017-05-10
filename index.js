import style from './style.css'
import $ from 'jquery'

let endX,startX;
let index = 1;
let $list = $('.list'), $items = $('.item'), $dots = $('li');
let timer;

$list.css('width', $items.length * 640 + 'px');  // 动态配置父元素的宽度

$('.list').on('touchstart',function(e){

	startX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;

}).on('touchmove',function(e){

	endX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;

}).on('touchend',function(){

	if( endX - startX > 50 ){   // 向右滑
		if(index > 1){
			index--;
		}else{                 // 第一个图片位置，向右滑，回到最后一个图片位置
			index = $items.length;
		}
	}else if( startX - endX > 50 ){   // 向左滑
		if(index < $items.length){
			index++;
		}else{               // 最后一个位置向左滑，回到第一个图片位置
			index = 1;
		}
	}
	animate(index);
});

function animate(i){
	$list.css({
		'transform':`translate3d(${(i-1)*(-640)}px,0,0)`,
		'-webkit-transform':`translate3d(${(i-1)*(-640)}px,0,0)`
	})
	$('span.index'+i).addClass('active').siblings().removeClass('active');
}

function loop(i){   // 循环向左
	if( i < $items.length ){  
		i++
	}else{
		i = 1;
	}
	animate(i)
	timer = setTimeout(function() {
		loop(i);
	}, 3000);
}

loop(index)