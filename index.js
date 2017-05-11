import style from './style.css'
import $ from 'jquery'

let endX,startX;
let index = 1;
let $list = $('.list'), $items = $('.item'), $dots = $('li');
let timer;

// $list.css('width', $items.length * 640 + 'px');  // 动态配置父元素的宽度

function loop(i){   // 循环向左
	if( i < $items.length ){  
		i++
	}else{
		i = 1;
	}
	timer = setTimeout(function() {
		animate(i)
		loop(i);
	}, 2000);
}

// loop(index);

$('.list').on('touchstart',function(e){
	// clearTimeout(timer);
	startX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;

}).on('touchmove',function(e){

	endX = ( e.touches && e.touches[0] ? e.touches[0] : e ).pageX;

}).on('touchend',function(){
	// loop(index);
	if( endX - startX > 50 ){   // 向右滑
		if(index > 1){
			index--;
		}else{                 // 第一个图片位置，向右滑，回到最后一个图片位置
			index = $items.length;
		}
		animateRight();
	}else if( startX - endX > 50 ){   // 向左滑
		if(index < $items.length){
			index++;
		}else{               // 最后一个位置向左滑，回到第一个图片位置
			index = 1;
		}
		animateLeft();
	}
});

let j = 0;
let l = $items.length, 
	w = $('.item').css('width');
function animateLeft(){
	j++;
	$list.css({
		'left': -j*parseInt(w) + 'px'
	});
	
	if(j > l-1){
		var index = j % l + 1,
			totalLeft = -parseInt($list.css('left'));
		$('.item'+index).css({
			'left': totalLeft + parseInt(w) + 'px'
		});
		$('span.index'+index).addClass('active').siblings().removeClass('active');
	}else{
		$('span.index'+(j+1)).addClass('active').siblings().removeClass('active');
	}
	
}
function animateRight(){
	j--;
	if(j < 0 ){
		var index = j % l == 0 ? 1 : j % l + (l+1),
			totalLeft = parseInt($list.css('left'));
		$('.item'+index).css({
			'left': -(totalLeft + parseInt(w)) + 'px'
		});
		$('span.index'+index).addClass('active').siblings().removeClass('active');
		$list.css({
			'left': -j*parseInt(w) + 'px'
		});	
	}else{
		console.log(j)
		$list.css({
			'left': -j*parseInt(w) + 'px'
		});	
		var index = j % l + 1,
			totalLeft = -parseInt($list.css('left'));
		$('.item'+index).css({
			'left': totalLeft + parseInt(w) + 'px'
		});
		$('span.index'+(j+1)).addClass('active').siblings().removeClass('active');
	}
			
}

