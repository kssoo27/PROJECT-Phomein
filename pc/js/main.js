$(function(){
	/* header 기본설정 */
	$("#gnb ul li").hover(function(){
		$("header").addClass("active");
		$(".depth").addClass("active");
		$("nav ul li").removeClass("active");
		$(this).addClass("active");
	});
	
	$("header").mouseleave(function(){
		$(this).removeClass("active");
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
		});
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
	$(".depth_second li").mouseenter(function(){
		$(".exp").removeClass("active");
		$(this).find(".exp").addClass("active");
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
		pos = n*(-1)*100;
		$(".banner ul").css({"left":pos+"%"});
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
	var n=0;
	
	mainv.addEventListener("ended", function(){
		// console.log("ended!");
		if(n < (total-1)){
			n=n+1;
		}else{
			n=0;
		}

		// console.log("list : "+movie[n]);
		$("#mainv").attr({src:movie[n]});
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
	$("#brand_story").addClass("box1");

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
	
/*--------------------------------------------------------*/
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
/* ------------------------------------------------------- */	
/* footer */	
/* family site */

	$(".f_site > a").click(function(e){
		e.preventDefault();
		if($(".f_site ul").is(":visible")!=true){
			$(".f_site ul").slideDown(200);}
		else{
			$(".f_site ul").slideUp(200);
		}
	});

});