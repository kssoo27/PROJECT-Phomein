/* header 기본설정 */
$(function(){
	$("#gnb ul li").hover(function(){
		$("header").addClass("active");
		$(".depth").addClass("active");
		$("nav ul li").removeClass("active");
		$(this).addClass("active");
	});
	
	$("header").mouseleave(function(){
		$("header").removeClass("active");
		$(".depth").removeClass("active");
		$("nav ul li").removeClass("active");
		depthN=6;
	});

/* 2depth ------------------------------------------------------------- */
/* 메뉴 선택시 2depth 기본설정 */
	var menuN;
	var depthN;
	$(".gnb li").mouseenter(function(){
		menuN=$(this).index();
		$(".depth_first > li").mouseenter(function(){
			depthN=$(this).index();
			console.log(depthN);
		});
		console.log(menuN);
		if (menuN == depthN) return false;
		$(".depth_second li").removeClass("active");
		$(".depth_second li:first-child").addClass("active");
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:first-child .exp").addClass("active");
	});	

	$(".gnb li").hover(function(){
		n=$(this).index();
		$(".depth_first > li").removeClass("active");
		$(".depth_first > li").eq(n).addClass("active");
	});

/*-------------------------------------------*/
/* 2depth */

	$(".depth_second li:nth-child(1)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(1) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});

	$(".depth_second li:nth-child(2)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(2) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".depth_second li:nth-child(3)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(3) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".depth_second li:nth-child(4)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(4) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".depth_second li:nth-child(5)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(5) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".depth_second li:nth-child(6)").hover(function(){
		$(".depth_second li .exp").removeClass("active");
		$(".depth_second li:nth-child(6) .exp").addClass("active");
		$(".depth_second li").removeClass("active");
		$(this).addClass("active");
	});

/*-----------------------------------------------------------*/
/* depth event  */	
	$(".event > ul li").hover(function(){
		$(".event > ul li").removeClass("on");
		$(this).addClass("on");
		var n=0;
		var pos;
		n=$(this).index();
		console.log(n);
		pos = n*(-1)*100;
		$(".banner ul").css({"left":pos+"%"});
	});

/*---------------------------------------------------------*/
/* advertisement */
	
	var adN=0;
	
	$(".advertise ul li").eq(0).show();
	$(".advertise ul li").eq(0).addClass("in");		
		
//		$(".advertise ul li").eq(adN).addClass("out");
//		$(".advertise ul li").eq(adN+1).addClass("in");


// 자동 구현 
	setInterval(function(){
		if (adN<2){
			$(".advertise ul li").eq(adN).slideUp(500);
			$(".advertise ul li").eq(adN+1).slideDown(0);
		}
		else if (adN==2){
			$(".advertise ul li").eq(adN).slideUp(500);
			$(".advertise ul li").eq(0).slideDown(0);
		}
		
		if (adN==0){
			$(".advertise ul li").eq(2).removeClass();
			$(".advertise ul li").eq(0).addClass("out");
			$(".advertise ul li").eq(1).addClass("in");
		}
		else if(adN==1){
			$(".advertise ul li").eq(0).removeClass();
			$(".advertise ul li").eq(1).addClass("out");
			$(".advertise ul li").eq(2).addClass("in");
		}
		else if(adN==2){
			$(".advertise ul li").eq(1).removeClass();
			$(".advertise ul li").eq(2).addClass("out");
			$(".advertise ul li").eq(0).addClass("in");
		}
		adN=(adN+1)%3;
	},4000);

	
/*--------------------------------------------------------*/
/* lnb */
	var ver=0;
	
	$(window).scroll(function(){
		scT=$(window).scrollTop();
		lnbT=$(".lnb").offset().top;

		ftT=$("#footer").offset().top;
		lnbH=$(".lnb").height();
//		lnbT 좌표 > 풋터의 좌표 - lnb height
		if (lnbT>=ftT-lnbH) {
			$(".lnb").css({"top":ftT-lnbH-340+"px"});
		}
		else {
			$(".lnb").css({"top":scT+"px"});
		}
});



/*---------------------------------------------------------*/
/* conts */
	$(".lnb li:first-child").addClass("active");
	$(".type li:first-child").addClass("active");
	$(".conts:first-child").show();
	
	var typeN=0;
	$(".type li a").click(function(e){
		e.preventDefault();
		typeN=$(this).parent().index();
		$(".type li").removeClass("active");
		$(this).parent().addClass("active");
		$(".conts").hide();
		$(".conts").eq(typeN).show();
	});

/*----------------------------------------------------------*/
/* footer */	
/* family site */
	var fN=0;
	
	$(".f_site > a").click(function(e){
		e.preventDefault();
		fN=fN+1;
		if (fN==1) {
			$(".f_site ul").slideDown(200);}
		else if (fN>1) {
			$(".f_site ul").slideUp(200);
			fN=0; }
	});

});