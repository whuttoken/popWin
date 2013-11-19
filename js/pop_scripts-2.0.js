// JavaScript Document

function popWin(fill,custom){
	sHeight = $(document).scrollTop();
	this._popId = "popWin";
	this._maskId = "popMask";
	this._clsBtnId = "popClsBtn";
	this._clsDotId = "popClsDot";
	this._titleId = "popTitle";
	this._ttMaskId = "popTtMask";
	this._contentId = "popContent";
	this._pWidth = 0;
	this._pHeight = 0;
	this._cPoint = {x:0 ,y:0 };
	this._wPoint = {x:0 ,y:0 };
	this._nPoint = {x:0 ,y:0 };
	this._isPress = false;
	this._isCreate = false;
	this.createPop = function(){
		if(this._isCreate){alert("pop has exist!");return;}
		var stylePop = "min-height:"+ custom.minHeight +"px;max-height:"+ custom.maxHeight +";min-width:"+ custom.minWidth +"px;max-width:"+ custom.maxWidth +"px;background-color:"+ custom.bgColor +";position:absolute;top:100px;display:none;color:"+ custom.fontColor +";font-family:'微软雅黑', '黑体', '宋体';font-size:18px;z-index:1001;";
		var styleMask = "background-color:"+ custom.maskColor +";position:absolute;left:0;top:0;display:none;z-index:1000;";
		var styleClsBtn = "	width:20px;height:20px;-webkit-border-radius: 40px;-moz-border-radius: 40px;-ms-border-radius: 40px;-o-border-radius: 40px;border-radius: 40px;position:absolute;right:-8px;top:-8px;background-color:"+ custom.bgColor +";";
		var styleClsDot = "width:14px;height:14px;margin:2px;-webkit-border-radius: 28px;-moz-border-radius: 28px;-ms-border-radius: 28px;-o-border-radius: 28px;border-radius: 28px;border:1px solid #666;background-color:#666;cursor:pointer;";
		var styleTitle = "width:auto;height:40px;text-align:center;margin:10px;line-height:40px;border-bottom:"+ custom.titleBorder +";";
		var styleTtMask = "outline:none;width:100%;height:40px;text-align:center;position:absolute;top:10px;border:none;background:rgba(0,0,0,0);z-index:1002;";
		var styleContent = "width:auto;margin:10px;font-size:14px;display:block;position:relative;overflow:hidden;";
		if(custom.popShadow){
			stylePop += "box-shadow: 0 0 10px "+ custom.popShadowColor +";-webkit-box-shadow: 0 0 10px "+ custom.popShadowColor +";-moz-box-shadow: 0 0 10px "+ custom.popShadowColor +";";
			styleClsBtn += "box-shadow: 0 0 10px "+ custom.popShadowColor +";-webkit-box-shadow: 0 0 10px "+ custom.popShadowColor +";-moz-box-shadow: 0 0 10px "+ custom.popShadowColor +";";	
			}
		else{
			stylePop += "border:1px solid "+ custom.popShadowColor +";";
			styleClsBtn += "border:1px solid "+ custom.popShadowColor +";";
		}
		if(custom.popRadius){
			stylePop += "-webkit-border-radius: "+ custom.popRadiusValue +"px;-moz-border-radius: "+ custom.popRadiusValue +"px;-ms-border-radius: "+ custom.popRadiusValue +"px;-o-border-radius: "+ custom.popRadiusValue +"px;border-radius: "+ custom.popRadiusValue +"px;";
			}
		if(custom.enableMove){
			styleTtMask +="cursor:move;";
		}
		$('<div />',{
			id:this._popId = exist(this._popId),
			style:stylePop,
			}).appendTo("body");
		$('<div />',{
			id:this._maskId = exist(this._maskId),
			style:styleMask,
			}).appendTo("body");
		$('<div />',{
			id:this._clsBtnId = exist(this._clsBtnId),
			style:styleClsBtn,
			}).appendTo("#"+this._popId);
		$('<div />',{
			id:this._clsDotId = exist(this._clsDotId),
			style:styleClsDot,
			}).appendTo("#"+this._clsBtnId);
		$('<div />',{
			id:this._titleId = exist(this._titleId),
			style:styleTitle,
			html:"Title",
			}).appendTo("#"+this._popId);
		$('<input />',{
			id:this._ttMaskId = exist(this._ttMaskId),
			type:"button",
			style:styleTtMask,
			}).appendTo("#"+this._popId);
		$('<div />',{
			id:this._contentId = exist(this._contentId),
			style:styleContent,
			html:"Contents",
			}).appendTo("#"+this._popId);
		this._pWidth = $("#"+this._popId).width();
		this._pHeight = $("#"+this._popId).height();
		this._isCreate = true;
	};
	this.setPop = function(){
		dWidth = $(document).width();
		wWidth = $(window).width();
		dHeight = $(document).height();
		$("#"+this._maskId).css({"height":dHeight +"px","width":dWidth +"px"});
		$("#"+this._popId).css({"left":(wWidth - this._pWidth)/2 +"px","top":sHeight + 150 +"px"});
		$("#"+this._titleId).css("width",this._pWidth - 20 +"px");
	};
	this.fillPop = function(){
		$("#"+this._titleId).html($(fill).children().eq(0).html());
		$("#"+this._contentId).html($(fill).children().eq(1).html());
		this._pWidth = $("#"+this._popId).width();
		this._pHeight = $("#"+this._popId).height();
	}
	this.openPop = function(){
		this.fillPop();
		this.setPop();
		$("#"+this._popId).fadeIn();
		$("#"+this._maskId).fadeIn();
	};
	this.destroyPop = function(){
		$("#"+this._popId).detach();
		$("#"+this._maskId).detach();
		this._isCreate = false;
	};
	this.closePop = function(){
		$("#"+this._popId).fadeOut();
		var Obj = this;
		$("#"+this._maskId).fadeOut("fast",function(){
            Obj.destroyPop();
		});
	};
	this.movePop = function(){
		var Obj = this;
		$("#"+this._ttMaskId).bind("mousedown",function(e){
			Obj._isPress = true;
			var _cPoint = {x:parseInt(e.pageX),y:parseInt(e.pageY)};
			var _wPoint = {x:parseInt($("#"+Obj._popId).css("left")),y:parseInt($("#"+Obj._popId).css("top"))};
			$(document).mousemove(function(e){
				if(Obj._isPress)
				{
					var _nPoint = {x:parseInt(e.pageX),y:parseInt(e.pageY)};
					new_x = _wPoint.x + _nPoint.x - _cPoint.x;
					new_y = _wPoint.y + _nPoint.y - _cPoint.y;
					if(new_x < 15)
					{
						new_x = 15;
						$("#"+Obj._popId).css("left",new_x +"px");
					}
					if(new_y < 15)
					{
						new_y = 15;
						$("#"+Obj._popId).css("top",new_y +"px");
					}
					if((dWidth - new_x - Obj._pWidth) < 15)
					{
						new_x = dWidth - Obj._pWidth - 15;
						$("#"+Obj._popId).css("left",new_x +"px");
					}
					if((dHeight - new_y - Obj._pHeight) < 15)
					{
						new_y = dHeight - Obj._pHeight - 15;
						$("#"+Obj._popId).css("top",new_y +"px");
					}
					$("#"+Obj._popId).css({"left":new_x +"px","top":new_y +"px"});
				}
			})
		});
		$(document).bind("mouseup",function(){
			Obj._isPress = 0;
		});
	};
	this.initPop = function(){
			this.createPop();
			this.openPop();
			var Obj = this;
			$("#"+this._clsDotId).click(function(){
				Obj.closePop();
			});
			if(custom.enableMaskClick)
			{
				$("#"+this._maskId).click(function(){
					Obj.closePop();
				});
			}
			if(custom.enableMove)
			{
				this.movePop();
			}
			$(window).bind("resize",function(){
				Obj.setPop();
			});
	}
	function exist(id){
		var e = document.getElementById(id);
		if(e)
		{
			id = id+"_e";
			exist(id);
		};
		return id;
	}
}


$.fn.popWin = function(custom){
		$(this).children("div").hide();
		$(this).click(function(){
			dft = {
				minWidth : 200,
				maxWidth : 600,
				minHeight : 200,
				maxHeight : "auto",
				bgColor : "#fefefe",
				maskColor : "rgba(255,255,255,0.5)",
				fontColor : "#000",
				popShadow : false,
				popShadowColor : "#ccc",
				popRadius : false,
				popRadiusValue : 5,
				titleBorder : "1px dotted #ccc",
				enableMaskClick : true,
				enableMove : false,
			}
			if(custom !== undefined)
			{
				if(custom.minWidth !== undefined)dft.minWidth = custom.minWidth;
				if(custom.maxWidth !== undefined)dft.maxWidth = custom.maxWidth;
				if(custom.minHeight !== undefined)dft.minHeight = custom.minHeight;
				if(custom.maxHeight !== undefined)dft.maxHeight = custom.maxHeight;
				if(custom.bgColor !== undefined)dft.bgColor = custom.bgColor;
				if(custom.maskColor !== undefined)dft.maskColor = custom.maskColor;
				if(custom.fontColor !== undefined)dft.fontColor = custom.fontColor;
				if(custom.popShadow !== undefined)dft.popShadow = custom.popShadow;
				if(custom.popShadowColor !== undefined)dft.popShadowColor = custom.popShadowColor;
				if(custom.popRadius !== undefined)dft.popRadius = custom.popRadius;
				if(custom.popRadiusValue !== undefined)dft.popRadiusValue = custom.popRadiusValue;
				if(custom.titleBorder !== undefined)dft.titleBorder = custom.titleBorder;
				if(custom.enableMaskClick !== undefined)dft.enableMaskClick = custom.enableMaskClick;
				if(custom.enableMove !== undefined)dft.enableMove = custom.enableMove;
			}
			var _popWin = new popWin(this,dft);
			_popWin.initPop();
		}); 
} 
