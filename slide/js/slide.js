   function slideFn(id){
        var slide = document.getElementById(id);
        var aChild = slide.children;
        var iNow = 0;
       slide.innerHTML += slide.innerHTML;
        slide.style.height = 100*aChild.length + '%';
        for(var i=0; i<aChild.length; i++){
            aChild[i].style.height = 100/aChild.length + '%';
        }
        //重置ul的位置使无缝连接
        function place(){
            if(iNow == 0){
                iNow = aChild.length/2;
            }else if(iNow == aChild.length - 1){
                iNow = aChild.length/2 - 1;
            }
            y = -iNow*aChild[0].offsetHeight;
            
            slide.style.WebkitTransform = "translateY("+ y +"px)";
        };

        var disY = 0, startY = 0, y = 0, bReady = true;

        function touchStart(event){
            if(!bReady) return;
            bReady = false;

            var touch = event.touches[0];
            startY = touch.pageY;
            disY = startY - y;

            slide.addEventListener("touchmove", touchMove, false);
            slide.addEventListener("touchend", touchEnd, false);
        }

        function touchMove(event){
            var touch = event.touches[0];
            y = touch.pageY - disY;
            if(y<50) return;
            if(Math.abs(touch.pageY - startY) > 30){
                slide.style.WebkitTransform = "translateY("+ y +"px)";
            }


            event.preventDefault();
        }

        function touchEnd(event){
            var EndY = event.changedTouches[0].pageY;
            if (Math.abs(EndY - startY)<50)return;
            if(Math.abs(EndY - startY) > 80){
                if(EndY > startY){
                    iNow--;
                }else{
                    iNow++;
                }
            }
            //iNow = (iNow + aLi.length) % aLi.length;
            y = -iNow*aChild[0].offsetHeight;

            slide.style.transition = ".3s all linear";
            slide.style.WebkitTransform = "translateY("+ y +"px)";

	    setTimeout(function(){
                slide.style.transition = "";
                place();
                bReady = true;
            },300);
            
            slide.removeEventListener("touchmove", touchMove, false);
            slide.removeEventListener("touchend", touchEnd, false);
        }

        place();
        slide.addEventListener("touchstart", touchStart, false);
    };


    function slideXFn(obj){
        console.log(obj);
        var oUl = obj.querySelectorAll('.slide')[0];
        var aLi = oUl.children;
        oUl.style.width = aLi.length * 100 + "%";
        
        for(var i=0; i<aLi.length; i++){
            aLi[i].style.width = 100/aLi.length + "%";
        }

        var startX, disX, tX = 0, iNow = 0;
        
        //动画结束后删除transition定义
        function fnTransitionEnd(){
            oUl.style.transition = "";
            place();
            oUl.removeEventListener("webkitTransitionEnd", fnTransitionEnd, false);
        };

        //重置ul的位置使无缝连接
        function place(){
            if(iNow == 0){
                iNow = aLi.length/2;
            }else if(iNow == aLi.length - 1){
                iNow = aLi.length/2 - 1;
            }
            tX = -aLi[0].offsetWidth * iNow;
            if(iNow == 0){
                iNow = aLi.length/2;
            }else if(iNow == aLi.length - 2){
                iNow = aLi.length/2 - 2;
            }else if(iNow == 1){
                iNow = aLi.length/2 + 1;
            }
            oUl.style.left = -100*iNow + "%";
        };

        function fnStart(ev){
            startX = ev.targetTouches[0].pageX;
            disX = startX - tX;
            oUl.addEventListener("touchmove", fnMove, false);
            oUl.addEventListener("touchend", fnEnd, false);
        };

        function fnMove(ev){
            ev.preventDefault();
        };

        function fnEnd(ev){
            
            var EndX = ev.changedTouches[0].pageX;
            
            if(Math.abs(EndX - startX) > 80){
                if(EndX > startX){
                    iNow--;
                }else{
                    iNow++;
                }

                oUl.style.transition  = ".3s all linear";
                oUl.style.left = -100 * iNow + "%";
		        setTimeout(function(){
                    oUl.style.transition  = "";
                    place();
                }, 300);


            }
            
            oUl.removeEventListener("touchmove", fnMove, false);
            oUl.removeEventListener("touchend", fnEnd, false);
        };

        place();
        oUl.addEventListener("touchstart", fnStart, false);
    }; 
    
