// sub 01 ----------------------------------------------------------------

$(function(){
	//스크롤 이벤트 -----------------------------------------------------
	var winH=$(window).height();
	var winW=$(window).width();
	
	$(window).scroll(function(){
		scT=$(window).scrollTop();
		if(scT>=$(".brand").offset().top-winH){
			$("#title").addClass("on");
		}
	});
	
	$(window).trigger("scroll");

// Mobile --------------------------------------------------------------
	// 메뉴 텝 클릭시 ----------------------------------
	$(".tab").click(function(e){
		e.preventDefault();
		$(".mobile").addClass("active");
		$(".dim").addClass("active");
		$("body").addClass("fixed");
	});
	
	// a 대신 li 로 교체 해야할 수도 있음.
	$(".mobile > ul > li > a").click(function(e){
		e.preventDefault();
		if($(this).next("span").hasClass("active")){
			$(this).next("span").removeClass("active");
			$(this).nextAll(".depth").stop().slideUp();
		}
		else{
			$(".depth").slideUp();
			$(".add_btn").removeClass("active");
			$(this).next("span").addClass("active");
			$(this).nextAll(".depth").stop().slideDown();
		}
	});
	
	// 닫기버튼
	$(".close").click(function(e){
		e.preventDefault();
		$(".mobile").removeClass("active");
		$(".dim").removeClass("active");
		$(".depth").slideUp();
		$("body").removeClass("fixed");
	});
	// 메뉴 밖 검은 화면
	$(".dim").click(function(){
		$(".mobile").removeClass("active");
		$(this).removeClass("active");
		$(".depth").slideUp();
		$(".add_btn").removeClass("active");
		$("body").removeClass("fixed");
	});
	
	// 검색기능
	$(".search a").click(function(e){
		e.preventDefault();
		if($(this).next().is(":visible")){
			$(".search_box").hide();
			$(this).children().attr({src:"images/search_icon.png"});
			// 이미 header가 active 가 활성화된경우
			if(scT==0){
				$("#header").removeClass("active");
				$("#logo a img").attr({src:"images/logo1.png"});
			}
			else{
				return false;
			}
		}
		else{
			$(".search_box").slideDown();
			$(this).children().attr({src:"images/close_icon.png"});
			$("#logo a img").attr({src:"images/logo.png"});
			$("#header").addClass("active");
		}
	});

// keyvisual ----------------------------------------------------------
// 화면 비율 조정
	$(window).resize(function(){
		if(winH>winW){
			$("#title").height(winH*(0.7));
			$("#title").removeClass("row");
			$("#title").addClass("column");
		}
		else{
			$("#title").height(winH-60);
			$("#title").removeClass("column");
			$("#title").addClass("row");
		}		
	});
	
	$(window).trigger("resize");
	
// footer 
	// family site
	$(".family_site > a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next().stop().slideUp();
		}
		else{
			$(this).addClass("active");
			$(this).next().stop().slideDown();
		}
	});
	
});