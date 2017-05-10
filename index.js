import style from './style.css'
import $ from 'jquery'

let endX,startX;
let index = 1;
let $list = $('.list'), $items = $('.item'), $dots = $('li');

$list.css('width', $items.length * 640 + 'px');

$('.list').on('touchstart',function(e){
	startX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;
}).on('touchmove',function(e){
	endX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;
}).on('touchend',function(){
	if( endX - startX > 50 && index > 1){  // 向右滑
		index--;
		animate(index);
	}else if( startX - endX > 50 && index < $items.length){   // 向左滑
		index++;
		animate(index);
	}
});

function animate(index){
	$list.css({
		'transform':`translateX(${(index-1)*(-640)}px)`,
		'-webkit-transform':`translateX(${(index-1)*(-640)}px)`
	})
	$('li.index'+index).addClass('active').siblings().removeClass('active');
}