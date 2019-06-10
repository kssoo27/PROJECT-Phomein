$(function(){
/* header 기본설정 */
	$("header").mouseleave(function(){
		$(this).removeClass("active");
		$(".depth").removeClass("active");
		$("nav ul li").removeClass("active");
	});
/* 2depth */
	var menuIndex;
/* 메뉴 선택시 2depth 기본설정 */
	$(".gnb li").mouseenter(function(){
		if($(this).hasClass("active")==true){
			return false;
		}
		menuIndex=$(this).index();
		$("header").addClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(".depth").show();
		$(".depth_first > li").eq(menuIndex).siblings().hide();
		$(".depth_first > li").eq(menuIndex).siblings().find(".exp").hide();
		$(".depth_first > li").eq(menuIndex).show();
		$(".depth_first > li").eq(menuIndex).find("li").eq(0).addClass("active");
		$(".depth_first > li").eq(menuIndex).find("li").eq(0).find(".exp").show();
	});
/* 2depth */
	$(".depth_second li").mouseenter(function(){
		$(this).siblings().find(".exp").hide()	;
		$(this).find(".exp").show();
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
/* depth event */
	$(".event > ul li").eq(0).addClass("on");
	$(".event > ul li").mouseenter(function(){
		var bannerIndex=$(this).index();
		bannerPos=bannerIndex*(-1)*100;
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(".banner ul").css({"left":bannerPos+"%"});
	});
/* advertisement */
	var advertiseIndex=0;
	var advertiseLength=$(".advertiseList ul li").length;
	var advertiseFirst=$(".advertiseList ul li").first().html();
// 자동 구현 
	setInterval(function(){
		advertiseIndex++;
		if(advertiseIndex==advertiseLength){
			$(".advertiseList ul").append("<li>"+advertiseFirst+"</li>");
		}
		advertisePos=-advertiseIndex*50;
		$(".advertiseList ul").animate({top:advertisePos}, 500, function(){
			if(advertiseIndex==advertiseLength){
				$(".advertiseList ul").css({top:0});
				$(".advertiseList ul li").last().remove();
				advertiseIndex=0;
			}
		});
	},4000);
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
/* footer */	
/* family site */
	$(".f_site > a").click(function(e){
		e.preventDefault();
		if($(".f_site ul").is(":visible")==false){
			$(".f_site ul").slideDown(200);
		}
		else{
			$(".f_site ul").slideUp(200);
		}
	});
});