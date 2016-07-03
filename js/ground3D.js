function ground3D(target,count){
	this.target=target;
	this.count=count;
	this.init();
	}
ground3D.prototype.init=function(){
	var that=this;
	var frame=$('<div class="ground3D">'+
    '<div class="frame">'+
    '</div>'+
  '</div>').appendTo("#"+that.target);
that.roll=$('<div class="roll"></div>')
frame.find(".frame").append(that.roll);
for(var i=0;i<that.count;i++){
  var point=$('<div class="point" point="'+i+'"></div>').appendTo(that.roll);
}
this.offset=0;
//this.run();
/*var delay=setInterval(function(){
	that.offset++;
	that.run();
	},100);*/
	}
ground3D.prototype.right=function(){
	this.offset-=30;
	this.run();
}
ground3D.prototype.left=function(){
	this.offset+=30;
	this.run();
}
ground3D.prototype.set=function(pointArry){
		var that=this;
		$.each(pointArry,function(i,n){
			var point2=$('<img class="point2" deg="'+n.r+'" src="'+n.src+'" pname="'+n.name+'"/>').appendTo(that.roll);
				point2.css({
					top:n.y+"px",
					"transform": "rotateY("+n.r+"deg) translateZ("+100+"px)",
					width:n.w||"auto",
					left:(n.w/2)||(point2.width()/2)
				});
				point2.unbind("click").bind("click",function(){
					alert($(this).attr("pname"));
				});
		});
}
ground3D.prototype.run=function(){
	var that=this;
	var Z=500*that.count/12;
	var w=((Z*12)/(335*that.count))*181;
	var l=(750-w)/2;
	var b=-30*(that.count/12);
	var h=2121*(Math.sqrt(that.count)/Math.sqrt(12));
	$(".point").each(function(){
		var i=Number($(this).attr("point"));
		var o="none";
  var deg=(i*(360/that.count))+that.offset;
  var oDeg=deg%360;
  if(oDeg<0){
	  oDeg+=360;
	  }
  if(oDeg>=90&&oDeg<=270){
    o="block";
  }
  $(this).css({
    "transform": "rotateY("+deg+"deg) translateZ("+Z+"px)",
    "width":w+"px",
    "display":o,
    "background-position":-(i*w)+"px 0px",
    "background-size": w*that.count+"px 100%",
	"left":l+"px",
	"bottom":b+"%",
	"height":h+"px"
  });
		});
	$(".point2").each(function(){
		var o="none";
  var deg=Number($(this).attr("deg"))+that.offset;
  var oDeg=deg%360;
  if(oDeg<0){
	  oDeg+=360;
	  }
  if(oDeg>=90&&oDeg<=270){
    o="block";
  }
		$(this).css({
			"transform": "rotateY("+deg+"deg) translateZ("+(Z-500)+"px)",
			"display":o,
			"left":$(this).width()/2
		});
	});
	}
    /*自适应处理*/
    function resize(){
    
    var size=function(){
        var w=$(window).width();
        return w/750;
    };
    var getH=function(){
            return $(window).height()/1334;
    }
    
        $("html").css({
        "-webkit-transform":"scale("+size()+","+getH()+")",
        "transform":"scale("+size()+","+getH()+")"
        });
    }
    $(document).ready(function(){
    	resize()
    })
    $(window).resize(function(){
    	resize()
    })
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
