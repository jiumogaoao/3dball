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
var roll=$('<div class="roll"></div>')
frame.find(".frame").append(roll);
for(var i=0;i<that.count;i++){
  var point=$('<div class="point" point="'+i+'"></div>').appendTo(roll);
}
this.offset=0;
this.run();
var delay=setInterval(function(){
	that.offset++;
	that.run();
	},100);
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
		var o=0;
  var deg=(i*(360/that.count))+that.offset;
  var oDeg=deg%360;
  if(oDeg<0){
	  oDeg+=360;
	  }
  if(oDeg>=90&&oDeg<=270){
    o=1;
  }
  $(this).css({
    "transform": "rotateY("+deg+"deg) translateZ("+Z+"px)",
    "width":w+"px",
    "opacity":o,
    "background-position":-(i*w)+"px 0px",
    "background-size": w*that.count+"px 100%",
	"left":l+"px",
	"bottom":b+"%",
	"height":h+"px"
  });
		});
	}