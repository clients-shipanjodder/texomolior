
	$(document).ready(function(){
	var fadespeed = 500;
	var count = 1;
	
	$('.customslider #slider-list').each(function(i){
		$(this).addClass('slide-number-' + (i+1));
	});
	
	var i = 1;
	$('.slide-number-1').addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);

	$( ".next" ).click(function(){
		var disableN =  $(this);
		if ($(disableN).hasClass("next-b")){
			var counter = $('.customslider #slider-list').length;
			if(count == 1) {		
				count = 2;
				if(i == counter ){
					i=1;}
				else{
					++i;}
				$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
				clearInterval(interval);
				timer();
			}
			else if(count == 2) {
				count = 1;
				if(i == counter ){
					i=1;}
				else{
					++i;}
				$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
				clearInterval(interval);
				timer();
			}
			$(disableN).removeClass("next-b");
			function enable(){
				$(disableN).addClass("next-b");
				}
			setTimeout(enable, 1000);
		};	
	});

	$( ".prev-b" ).click(function(){
		var disableP =  $(this);
		if ($(disableP).hasClass("prev-b")){
			var counter = $('.customslider #slider-list').length;
			if(count == 1) {		
				count = 2;
				if(i == 1 ){
					i = counter;}
				else{
					--i;}
				$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
				console.log(i);
				clearInterval(interval);
				timer();
			}else if(count == 2) {
				count = 1;
				if(i == 1 ){
					i = counter;}
				else{
					--i;}
				$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
				console.log(i);
				clearInterval(interval);
				timer();
			}
			$(disableP).removeClass("prev-b");
			function enable(){
				$(disableP).addClass("prev-b");
				}
			setTimeout(enable, 1000);
		};
	});
	
	
	function transition() {
		var counter = $('.customslider #slider-list').length;
		if(count == 1) {	
			count = 2;
			if(i == counter ){
				i=1;}
			else{
				++i;}
			$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
			console.log(i);
		}else if(count == 2) {
			count = 1;
			if(i == counter ){
				i=1;}
			else{
				++i;}
			$('.slide-number-' + (i)).addClass("active").fadeIn( fadespeed ).siblings().removeClass("active").fadeOut(fadespeed);
		}
						
	}
	
	var interval;
	var timer = function(){
	interval = setInterval(transition, 100000);
	};
	timer();

	});