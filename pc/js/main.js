$(function(){
	/* header 기본설정 */
	$("header").mouseleave(function(){
		$(this).removeClass("active");
		$(".depth").removeClass("active");
		$("nav ul li").removeClass("active");
	});
/* 2depth ------------------------------------------------------------- */
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
/*--------------------------------------------------------------*/
/* keyvisual */
/* video */
	var mainv=document.getElementById("mainv");
	mainv.muted=true;
	mainv.play();
	var movie=new Array();
	movie[0]="movie/roll_a.mp4";
	movie[1]="movie/roll_b.mp4";
	movie[2]="movie/roll_c.mp4";
	var total=movie.length;
	var moveNum=0;
	
	mainv.addEventListener("ended", function(){
		if(moveNum < (total-1)){
			moveNum++;
		}else{
			moveNum=0;
		}
		$("#mainv").attr({src:movie[moveNum]});
		mainv.play();
	});
/* recommend_menu */
	$(".icon").click(function(e){
		e.preventDefault();
		$(this).hide();
		$(".recom_menu").slideDown(0);
		$(".dim").fadeIn(300);
	});
	$(".close").click(function(e){
		e.preventDefault();
		$(".recom_menu").slideUp(300, function(){
			$(".icon").show();
		});
		$(".dim").fadeOut(300);
	});
/*----------------------------------------------------*/
/* brand story */
	$(".brand_cont").hover(
		function(){
			$(this).addClass("on");
			$(this).find(".more").fadeIn(300);
		},
		function(){
			$(this).removeClass("on");
			$(this).find(".more").stop().fadeOut(300);
		}
	);
/*-----------------------------------------------------*/
/* Phomein's menu */
	var foodScrollNum=0;	// 스크롤 index
	var foodListMin=0;		// 음식 리스트 최소
	var foodListMax=3;		// 음식 리스트 최대
	var controllerIndex=0;	// .food_type index
	
	// Food STYLE CSS
	$(".control_direct li").eq(0).addClass("on");
	$(".foodReturn").hide();
	
	$.getJSON("data/food.json", function(food){
		$.each(food, function(foodType, foodGroup){
			// console.log(foodType);
			// console.log(foodGroup);
			
			$(".food_box").append('<ul class="'+foodType+'_type food_type"></ul>');
			$(".food_type").eq(0).show();
			for(var i=foodListMin; i<foodListMax; i++){
				var foodName=foodGroup[i][0];
				var explain=foodGroup[i][1];
				var photo=foodGroup[i][2];
				
				$(".food_type").each(function(){
					if($(this).attr("class")== foodType+"_type food_type"){
						$(this).append('<li><a href=""><img src="images/'+photo+'.png" alt="'+foodName+'"><dl><dt>'+foodName+'</dt><dd>'+explain+'</dd></dl></a></li>');
					}
				});
			}
		});
	});
// 음식 더보기
	$(".foodMore").click(function(e){
		e.preventDefault();	
		foodListMin+=3;
		foodListMax+=3;

		$.getJSON("data/food.json", function(food){
			$.each(food, function(foodType, foodGroup){
				for(var i=foodListMin; i<foodListMax&&i<foodGroup.length; i++){
					var foodName=foodGroup[i][0];
					var explain=foodGroup[i][1];
					var photo=foodGroup[i][2];
					
					$(".food_type").each(function(){
						if($(this).attr("class")== foodType+"_type food_type"){
							$(this).append('<li><a href=""><img src="images/'+photo+'.png" alt="'+foodName+'"><dl><dt>'+foodName+'</dt><dd>'+explain+'</dd></dl></a></li>');
						}
					});
				}
				if($(".food_type").eq(controllerIndex).attr("class")== foodType+"_type food_type"){
					if(foodListMax >= foodGroup.length){
						$(".foodMore").hide();
						$(".foodReturn").show();
					}
				}
			});
		});
	});
// 음식 갯수 줄이기
	$(".foodReturn").click(function(e){
		e.preventDefault();
		$.getJSON("data/food.json", function(food){
			$.each(food, function(foodType, foodGroup){
				$(".food_type").each(function(){
					for(var i=3; i<foodListMax; i++){
						$(this).children("li").eq(i).remove();
					}
					
				});
			});
			foodListMin=0;
			foodListMax=3;
			$(".foodReturn").hide();
			$(".foodMore").show();
		});
	});
// 다이렉트 버튼
	$(".control_direct a").click(function(e){
		e.preventDefault();

		controllerIndex=$(this).parent().index();
		
		$(this).parent().siblings("li").removeClass("on");
		$(this).parent().addClass("on");
		$(".food_type").eq(controllerIndex).siblings(".food_type").hide();
		$(".food_type").eq(controllerIndex).show();
		
		$.getJSON("data/food.json", function(food){
			$.each(food, function(foodType, foodGroup){
				if($(".food_type").eq(controllerIndex).attr("class")== foodType+"_type food_type"){
					if(foodListMax>=foodGroup.length){
						$(".foodMore").hide();
						$(".foodReturn").show();
					}
					else{
						$(".foodMore").show();
						$(".foodReturn").hide();
					}
				}	
			});
		});
	});
/* quick_bar */	
// 좌표 식 재 구성
// document 높이 - 풋터의 높이 = 풋터의 시작좌표
// scT + window 높이 + (-150) > 풋터의 시작좌표
// 퀵 바 위치 = scT + window 높이 + (-150) + (-window 높이) + (+250)
	$(window).scroll(function(){			
		var scT=0;
		scT=$(window).scrollTop();
		ver=scT+250;

		ftT=$("#footer").offset().top;
		winH=$(window).height();
		
		qbH=$(".quick_bar").height();
		qbT=$(".quick_bar").offset().top;
		
		if (qbT >= ftT-qbH-30) {
			$(".quick_bar").css({"top":ftT-qbH-30+"px"});
		}
		else {
			if (scT < 700) {
				$(".quick_bar").css({"top":"950px"});
			}	
			else if (scT < ftT-winH+70) {
				$(".quick_bar").css({"top":ver+"px"});
			}
			else {
				$(".quick_bar").css({"top":ftT-winH+320+"px"});
			}
		}
		takeT=$(".delivery").offset().top;
		if (scT>=takeT-winH+200) {
			$(".delivery_inner").addClass("active");
		}
	});
	$(window).trigger("scroll");
/* footer */	
// family Site
	$(".f_site > a").click(function(e){
		e.preventDefault();
		if($(".f_site ul").is(":visible")!=true){
			$(".f_site ul").slideDown(200);}
		else{
			$(".f_site ul").slideUp(200);
		}
	});

});