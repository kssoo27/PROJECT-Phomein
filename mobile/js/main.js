window.addEventListener("load", function(){
// keyvisual ----------------------------------------------------------
// 화면 비율 조정

	var windowHeight;
	var windowWidth;
	var timer;
	var mainW;
	
	$(window).resize(function(){
	//	clearTimeout(timer);
	//	timer=setTimeout(function(){
			windowHeight=$(window).height();
			windowWidth=$(window).width();
			if(windowHeight>windowWidth){
			}
			else{
			}
			mainW=$(".mainBanner img").width();
			
			if(mainW<windowWidth){
				mainW=windowWidth;
			}
			else{
				mainW=960;
			}
			$("img.main").width(mainW);
			$("img.main").css({"margin-left":-mainW/2});
			
		// 포메인 메뉴 기본설정  + footer sns 이미지
			var sns;
			
			if($(window).width()<550){
			// sns 아이콘 이미지축소	
				$(".sns").addClass("small");
				$(".menu_scroll").addClass("resize");
			}
			else{
			//sns 아이콘 이미지 확대			
				$(".sns").removeClass("small");
				$(".menu_scroll").removeClass("resize");
			}
	//	},50)
	}).trigger("resize");

	//스크롤 이벤트 -----------------------------------------------------
	$(window).scroll(function(){
		scT=$(window).scrollTop();
		
		// Brand Story 스크롤 이벤트
		$(".conts > li").each(function(){
			// 각각의 컨텐츠 상단좌표
			contT=$(this).offset().top;
		//	console.log(contT-windowHeight);
		//	console.log(scT);
			if(scT>contT-windowHeight+100){
				$(this).find("img").addClass("on");
			}
		});
	}).trigger("scroll");

// Mobile --------------------------------------------------------------
	// 메뉴 텝 클릭시 ----------------------------------
	$(".tab").click(function(e){
		e.preventDefault();
		$(".mobile").addClass("active");
		$(".dim").addClass("active");
		$("body").addClass("fixed");
	});
	
	$(".gnb > li > a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next(".depth").stop().slideUp();
		}
		else{
			$(".depth").slideUp();
			$(this).parent().siblings().children("a").removeClass("active");
			$(this).addClass("active");
			$(this).next(".depth").stop().slideDown();
		}
	});
	
	// 닫기버튼
	$(".close").click(function(e){
		e.preventDefault();
		$(".mobile").removeClass("active");
		$(".gnb > li > a").removeClass("active");
		$(".dim").removeClass("active");
		$(".depth").slideUp();
		$("body").removeClass("fixed");
	});
	// 메뉴 밖 검은 화면
	$(".dim").click(function(){
		$(".mobile").removeClass("active");
		$(".gnb > li > a").removeClass("active");
		$(this).removeClass("active");
		$(".depth").slideUp();
		$("body").removeClass("fixed");
	});
	
	// 검색기능
	$(".search > a").click(function(e){
		e.preventDefault();
		if($(".search_box").is(":visible")){
			$(".search_box").hide();
			$(this).children().attr({src:"images/search_icon.png"});
		}
		else{
			$(".search_box").slideDown();
			$(this).children().attr({src:"images/close_icon.png"});
			$("#header").addClass("active");
		}
	});

/* keyvisual 메인 배너 */
	// 초기 설정
	var keyIndex=0;
	// 슬라이드 개수
	var mainBanner=document.querySelector(".mainBanner ul");
	var keyTotal=$("#keyvisual ul li").length;
	// controller 컨트롤러
	var keyControl=document.querySelectorAll(".controller a");
	keyControl[0].classList.add("on");
	
	for(i=0; i<keyControl.length; i++){
		keyControl[i].index=i;
		keyControl[i].addEventListener("click", function(e){
			e.preventDefault();
			for(j=0; j<keyControl.length; j++){
				keyControl[j].classList.remove("on");
			}
			this.classList.add("on");
			keyIndex=this.index;
			mainBanner.style.left=keyIndex*-100+"%"
		});
	}
	
	// keyvisual 드래그 슬라이드
	//터치 시작
	$("#keyvisual ul").on("touchstart", function(e){
		var evt=e.originalEvent;
		prevX=evt.touches[0].screenX;
	//	console.log(prevX);
	});
	//터치 끝
	$(".mainBanner ul").on("touchend", function(e){
		var evt=e.originalEvent;
		nextX=evt.changedTouches[0].screenX;
	//	console.log(nextX);
		if($(this).is(":animated")==true) return false
		
		if(prevX-nextX>50){ // 우측으로 슬라이드 
			$(this).animate({left:"-100%"},300, function(){
				$(this).append($(this).children().first());
				$(this).css({left:"0"});
			});
		}
		else if(nextX-prevX>50){ // 좌측으로 슬라이드
			$(this).prepend($(this).children().last());
			$(this).css({left:"-100%"});
			$(this).animate({left:0},300);
		}
		else{
			return false;
		}
	});
// menu --------------------------------------------------------------------
	$(".food_type li").eq(0).addClass("active");
	
	// menu 카테고리 선택
	var menuN;
	
	$(".food_type li").click(function(e){
		e.preventDefault();
		menuN=$(this).index();
		move=menuN*25;
		
		$(".food_type li").removeClass("active");
		$(this).addClass("active");
		$(".menu_scroll span").css({left:move+"%"});
		$(".sub_group").css({left:-move*4+"%"});
	});
	
	// 포메인메뉴 스크롤 이벤트
	// var nonpix=0;
	// $(".sub").each(function(){ // 모든 그룹마다 설정됩니다.		
		// $(this).on("touchstart", function(e){
			// evt=e.originalEvent;
			// prevX=evt.touches[0].screenX;
			// res=$(".sub.active").css("left");
			
			// nonpix=parseInt($(".sub.active").css("left"));
		// });

// 스크롤 동작
/*		 $(this).on("touchmove", function(e){
			 evt=e.originalEvent;
			 moveX=evt.touches[0].screenX;
			 amount=moveX-prevX;

			 $(".sub.active").css({left:nonpix+amount});
		 });
*/
		// $(this).on("touchend", function(e){
			// evt=e.originalEvent;
			// nextX=evt.changedTouches[0].screenX;
			
			// if(prevX-nextX>$(this).children().width()/5){ // 우측으로 슬라이드
				// $(".next").trigger("click");
			// }
			// else if(nextX-prevX>$(this).children().width()/5){ // 좌측으로 슬라이드
				// $(".prev").trigger("click");
			// }
			// else{
				// return false;
			// }
		// });
	// });

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