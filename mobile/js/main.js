window.addEventListener("load", function(){
/* 화면 비율 조정 */
	var windowHeight;
	var windowWidth;
	$(window).resize(function(){
		windowHeight=$(window).height();
		windowWidth=$(window).width();
	}).trigger("resize");

/*스크롤 이벤트 */
/*	$(window).scroll(function(){
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
*/
/* Mobile */
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
	var mainBanner=document.querySelector(".mainBanner ul");
	var mainBannerList=document.querySelectorAll(".mainBanner ul li");
// 슬라이드 개수
	var keyTotal=mainBannerList.length;
	for(i=0; i<keyTotal; i++){
		mainBannerList[i].style.width=100/(keyTotal+1)+"%";
	}
	mainBanner.style.width=(keyTotal+1)*100+"%";
	var mainBannerFirst=mainBannerList[0].cloneNode(true);
	var mainBannerLast=mainBanner.lastElementChild.cloneNode(true);
	
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
			mainBanner.style.left=keyIndex*-100+"%";
		});
	}
	
	// keyvisual 드래그 슬라이드
	var bannerAmount=null;
	//터치 시작
/*	$(".mainBanner ul").on("touchstart", function(e){
		var evt=e.originalEvent;
		prevX=evt.touches[0].screenX;
	//	console.log(prevX);
	});*/
	mainBanner.addEventListener("touchstart", function(e){
		prevX=event.touches[0].screenX;
		mainBanner.classList.add("transNone");
		// console.log(prevX);
	});
	// 터치 움직임
	mainBanner.addEventListener("touchmove", function(e){
		moveX=event.touches[0].screenX;
		bannerAmount=moveX-prevX;
		if(keyIndex==keyTotal-1){
			mainBanner.appendChild(mainBannerFirst);
		}
		else if(keyIndex==0){
			mainBanner.insertBefore(mainBannerLast, mainBannerList[0]);
			mainBanner.style.left=-100+"%";
		}
		mainBanner.style.transform="translateX("+bannerAmount+"px)";
	});
/*	$(".mainBanner ul").on("touchmove", function(e){
		evt=e.originalEvent;
		moveX=evt.touches[0].screenX;
		amount=moveX-prevX;
		if(menuIndex==menuTotal-1 && amount<0){
			
		}
		else if(menuIndex==0 && amount > 0){
			
		}
		$(".sub_group").css({left:nonpix+amount});
	});*/
	
	//터치 끝
	mainBanner.addEventListener("touchend", function(e){
		nextX=event.changedTouches[0].screenX;
		// console.log(nextX);
		if(prevX-nextX> 100){ // 우측으로 슬라이드
			keyIndex++;
		}
		else if(nextX-prevX>100){ // 좌측으로 슬라이드
			if(keyIndex==0){
				
			}
			keyIndex--;
		}
		mainBanner.style.left=bannerAmount+"px";
		mainBanner.style.transform="translateX(0)";
		mainBanner.classList.remove("transNone");
		mainBanner.style.left=keyIndex*-100+"%";
		this.addEventListener("transitionend", function(){
			if(keyIndex==keyTotal){
				mainBanner.classList.add("transNone");
				mainBanner.style.left=0;
				mainBanner.classList.remove("transNone");
				mainBanner.removeChild(mainBanner.lastElementChild);
				keyIndex=0;
			}
			else if(keyIndex==0){

				// mainBanner.classList.remove("transNone");
				// mainBanner.removeChild(mainBanner.firstElementChild);
				// keyIndex=0;
			}
		});
	});
	
/*	$(".mainBanner ul").on("touchend", function(e){
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
	});*/

/*	$(this).on("touchend", function(e){
		evt=e.originalEvent;
		nextX=evt.changedTouches[0].screenX;
		
		if(prevX-nextX>$(this).width()/2){ // 우측으로 슬라이드
			if(menuIndex==menuTotal-1){
				return false;
			}
			else{
				menuIndex++;
			}
		}
		else if(nextX-prevX>$(this).width()/2){ // 좌측으로 슬라이드
			if(menuIndex==0){
				return false;
			}
			else{
				menuIndex--;
			}
		}
		$(".food_type li").eq(menuIndex).trigger("click");
	});*/
// menu --------------------------------------------------------------------
	$(".food_type li").eq(0).addClass("active");
	
	// menu 카테고리 선택
	var menuIndex=0;
	var menuTotal=$(".food_type li").length;
	var menuWidth=$(".sub").width();
	var	menuDistance=null;
	var menuAmount;

	$(".food_type li").click(function(e){
		e.preventDefault();
		
		$(".sub_group").css({transform:"translateX(0)"});
		$(".sub_group").css({left:menuDistance+menuAmount});
		menuAmount=0;
		
		menuIndex=$(this).index();
		menuDistance=menuIndex*-menuWidth;
		
		$(".food_type li").removeClass("active");
		$(this).addClass("active");
		$(".menu_scroll span").css({left:menuIndex*25+"%"});
		$(".sub_group").animate({left:menuDistance},500);
	});	
	
	//포메인메뉴 스크롤 이벤트
	var nonpix=null; // px 제거
	
	$(".sub").each(function(){ // 모든 그룹마다 설정됩니다.
		$(this).on("touchstart", function(e){
			evt=e.originalEvent;
			prevX=evt.touches[0].screenX;
			res=$(".sub_group").css("left");
			// nonpix=parseInt($(".sub_group").css("left"));
			$("body").addClass("fixed");
		});

	//스크롤 동작
		 $(this).on("touchmove", function(e){
			if($(".sub_group").is(":animated")==true){
				return false;
			}
			evt=e.originalEvent;
			moveX=evt.touches[0].screenX;
			amount=moveX-prevX;
			if(menuIndex==menuTotal-1 && menuAmount<0){
				return false;
			}
			else if(menuIndex==0 && menuAmount > 0){
				return false;
			}
			$(".sub_group").css({transform:"translateX("+menuAmount+"px)"});
		 });

		$(this).on("touchend", function(e){
			if($(".sub_group").is(":animated")==true){
				return false;
			}
			evt=e.originalEvent;
			nextX=evt.changedTouches[0].screenX;
			
			if(prevX-nextX>$(this).width()/4){ // 우측으로 슬라이드
				if(menuIndex==menuTotal-1){
					return false;
				}
				else{
					menuIndex++;
				}
			}
			else if(nextX-prevX>$(this).width()/4){ // 좌측으로 슬라이드
				if(menuIndex==0){
					return false;
				}
				else{
					menuIndex--;
				}
			}
			$(".food_type li").eq(menuIndex).trigger("click");
			$("body").removeClass("fixed");
		});
	});

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