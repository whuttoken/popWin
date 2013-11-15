// JavaScript Document
var flag = 1;
function pop_win(){
	//初始化弹窗位置
	function setPop()
	{
		w_width = $(window).width();
		d_height = $(document.body).height();
		p_width = $("#pop_win").width();
		p_height = $("#pop_win").height();
		$("#mask").css("height",d_height +"px");
		$("#pop_win").css({"left":(w_width - $("#pop_win").width())/2 +"px","top":"100px"});
		$("#pop_title").css("width",p_width - 20 +"px");
	}
	//适应浏览器
	$(window).bind("resize",function(){
		setPop();
	});
	//关闭弹窗
	$("#close_dot").bind("click",function(){
		$("#mask").fadeOut();
		$("#pop_win").fadeOut();
	});
	//打开弹窗
	$(".pop_button").bind("click",function(){
		$("#mask").fadeIn();
		setPop();
		$("#pop_win").fadeIn();
	});
	//移动弹窗
	$("#pop_title_mask").bind("mousedown",function(e){
		flag = 1;
		w_width = $(window).width();
		w_height = $(document).outerHeight();
		p_width = $("#pop_win").width();
		p_height = $("#pop_win").height();
		var c_point = {x:parseInt(e.pageX),y:parseInt(e.pageY)};
		var w_point = {x:parseInt($(this).parent().css("left")),y:parseInt($(this).parent().css("top"))};
		$(document).mousemove(function(e){
			if(flag)
			{
				var n_point = {x:parseInt(e.pageX),y:parseInt(e.pageY)};
				new_x = w_point.x + n_point.x - c_point.x;
				new_y = w_point.y + n_point.y - c_point.y;
				if(new_x < 15)
				{
					new_x = 15;
					$("#pop_win").css("left",new_x +"px");
				}
				if(new_y < 15)
				{
					new_y = 15;
					$("#pop_win").css("top",new_y +"px");
				}
				if((w_width - new_x - p_width) < 15)
				{
					new_x = w_width - p_width - 15;
					$("#pop_win").css("left",new_x +"px");
				}
				if((w_height - new_y - p_height) < 15)
				{
					new_y = w_height - p_height - 15;
					$("#pop_win").css("top",new_y +"px");
				}
				$("#data1").text(new_x+" "+new_y);
				$("#pop_win").css({"left":new_x +"px","top":new_y +"px"});
			}
		})
	});
	$(document).bind("mouseup",function(){
		flag = 0;
	});
}