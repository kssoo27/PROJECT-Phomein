window.addEventListener("load", function(){
/* 화면 비율 조정 */
	$(window).resize(function(){
		bannerWidth=mainBannerList[0].clientWidth;
		mainBanner.classList.add("transNone");
		mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
	})
/* header */
// search 검색기능
	$(".search > a").click(function(e){
		e.preventDefault();
		$(".search_box").slideDown(300);
		$(".header_op").fadeIn(300);
	});
	$(".search_close").click(function(e){
		e.preventDefault();
		$(".search_box").slideUp(300);
		$(".header_op").fadeOut(300);
	});
/* Mobile */
// 메뉴 텝 클릭시 ----------------------------------
	$(".tab").click(function(e){
		e.preventDefault();
		$(".mobile").addClass("active");
		$(".search_box").slideUp(300);
		$(".dim").fadeIn(300);
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
	$(".menu_close").click(function(e){
		e.preventDefault();
		$(".mobile").removeClass("active");
		$(".gnb > li > a").removeClass("active");
		$(".dim").fadeOut(300);
		$(".depth").slideUp();
		$("body").removeClass("fixed");
	});
// 메뉴 밖 검은 화면
	$(".dim").click(function(){
		$(".mobile").removeClass("active");
		$(".gnb > li > a").removeClass("active");
		$(".dim").fadeOut(300);
		$(".depth").slideUp();
		$(".search_box").slideUp(300);
		$("body").removeClass("fixed");
	});
	
/* keyvisual 메인 배너 */
	var body=document.querySelector("body");
// 초기 설정
	var mainBanner=document.querySelector(".mainBanner ul");
	var mainBannerList=document.querySelectorAll(".mainBanner ul li");
// 슬라이드 개수
	var keyTotal=mainBannerList.length;
	for(i=0; i<keyTotal; i++){
		mainBannerList[i].style.width=100/(keyTotal+2)+"%";
	}
	mainBanner.style.width=(keyTotal+2)*100+"%";
	var bannerWidth=mainBannerList[0].clientWidth;
	var mainBannerFirst=mainBannerList[0].cloneNode(true);
	var mainBannerLast=mainBanner.lastElementChild.cloneNode(true);
	mainBanner.appendChild(mainBannerFirst);
	mainBanner.insertBefore(mainBannerLast, mainBannerList[0]);
	mainBanner.style.left="-100%";
// controller 컨트롤러
	var keyIndex=0;
	var keyControl=document.querySelectorAll(".controller a");
	keyControl[0].classList.add("on");

	for(i=0; i<keyControl.length; i++){
		keyControl[i].index=i;
		keyControl[i].addEventListener("click", function(e){
			e.preventDefault();
			// if(bannerFlag){return false;}
			for(j=0; j<keyControl.length; j++){
				keyControl[j].classList.remove("on");
			}
			this.classList.add("on");
			keyIndex=this.index;
			mainBanner.classList.remove("transNone");
			mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		});
	}
	
	// keyvisual 드래그 슬라이드
	var bannerAmount=null;
	//터치 시작
	mainBanner.addEventListener("touchstart", function(e){
		prevX=event.touches[0].screenX;
		prevY=event.touches[0].screenY;
	});
	// 터치 움직임
	mainBanner.addEventListener("touchmove", function(e){
		moveX=event.touches[0].screenX;
		moveY=event.touches[0].screenY;
		bannerAmount=moveX-prevX;
		
		body.classList.add("fixed");
		mainBanner.classList.add("transNone");
		mainBanner.style.transform="translateX("+(keyIndex*-bannerWidth+bannerAmount)+"px)";

	});
	//터치 끝
	mainBanner.addEventListener("touchend", function(e){
		nextX=event.changedTouches[0].screenX;	
		body.classList.remove("fixed");
		// console.log(nextX);
		if(prevX-nextX> 50){ // 우측으로 슬라이드	
			keyIndex++;
		}
		else if(nextX-prevX> 50){ // 좌측으로 슬라이드
			keyIndex--;
		}
		mainBanner.classList.remove("transNone");
		mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		if(keyIndex<0){
			keyIndex=keyTotal-1;
		}
		else if(keyIndex==keyTotal){
			keyIndex=0;
		}
		for(i=0; i<keyControl.length; i++){
			keyControl[i].classList.remove("on");
		}
		keyControl[keyIndex].classList.add("on");
		body.classList.remove("fixed");
	});
	mainBanner.addEventListener("transitionend", function(){
		mainBanner.classList.add("transNone");
		mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		setTimeout(function(){	
			mainBanner.classList.remove("transNone");
		},300);	
	});
	
/* menu */
	$(".food_type li").eq(0).addClass("active");
// menu 카테고리 선택
	var menuIndex=0;
	var menuTotal=$(".food_type li").length;
	var menuWidth=$(".sub").width();
	var	menuDistance=null;
	var menuAmount;

	$(".food_type li").click(function(e){
		e.preventDefault();
		if($(".sub_group").is(":animated")==true){
			return false;
		}
		
		$(".sub_group").css({transform:"translateX(0)"});
		$(".sub_group").css({left:menuDistance+menuAmount});
		menuAmount=0;
		
		menuIndex=$(this).index();
		menuDistance=menuIndex*-menuWidth;
		
		$(".food_type li").removeClass("active");
		$(this).addClass("active");
		$(".menu_scroll span").css({left:menuIndex*25+"%"});
		$(".sub_group").animate({left:menuDistance},300);
	});	
	
//포메인메뉴 스크롤 이벤트
	var nonpix=null; // px 제거
	
	$(".sub").each(function(){ // 모든 그룹마다 설정됩니다.
		$(this).on("touchstart", function(e){
			evt=e.originalEvent;
			prevX=evt.touches[0].screenX;
		});
	//스크롤 동작
		 $(this).on("touchmove", function(e){
			if($(".sub_group").is(":animated")==true){
				return false;
			}
			evt=e.originalEvent;
			moveX=evt.touches[0].screenX;
			menuAmount=moveX-prevX;
			if(menuAmount!=0){
				$("body").addClass("fixed");
			}
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

/* footer */
// family site
	$(".family_site > a").click(function(e){
		e.preventDefault();
		if($(this).next().is(":visible")==true){
			$(this).removeClass("active");
			$(this).next().stop().slideUp();
		}
		else{
			$(this).addClass("active");
			$(this).next().stop().slideDown();
		}
	});
});