$(document).ready(function(){
  console.log("xd")
   $("#file_upload1").change(function(e){
       var r=new FileReader();
       
        r.onload=function(){
           $('#picture_container1 img').attr('src', r.result);
               
           $('#zoom_container1 img').attr('src', r.result);
       }
        
       r.readAsDataURL(e.target.files[0]);
   });
    
   $("#input").val(1);
   $("#picture_container1").mouseenter(function(){
       $("#picture_item1").stop().fadeIn(500);
       $("#zoom_container1 img").stop().hide().fadeIn(500);
   }); 
   $("#picture_container1").mouseleave(function(){
       $("#picture_item1").stop().fadeOut(200);
       $("#zoom_container1 img").stop().fadeOut(500);
   });
    
    var K=1; //Skala
    $("#input1").keyup(function(){
        var val1=$(this).val();
        if(val1==""){
            K=1;
            return false;
        }
        if(!$.isNumeric(val1)||val1<1){
            alert("Skala musi być liczbą (niekoniecznie całkowitą) większą od 1");
        }
        else K=$(this).val();
    });
    $("#picture_container1").mousemove(function(evt){
       
        var Ximg1=$("#picture_container1 img").width();
        var Yimg1=$("#picture_container1 img").height();
        var Ximg2=$("#zoom_container1 img").width();
        var Yimg2=$("#zoom_container1 img").height();
        
        var Kx=Ximg2/Ximg1;
        var Ky=Yimg2/Yimg1;
		
		console.log(Ximg2, Ximg1)
        var Kx2=Kx/K;
        var Ky2=Ky/K;
        if(Kx2>1) Kx2=K/Kx;
        if(Ky2>1) Ky2=K/Ky;
       
        $("#picture_item1").css("width", (Ximg1/Kx)*Kx2);
        $("#picture_item1").css("height", (Yimg1/Ky)*Ky2);
        var rob1=$("#zoom_container1 img").width();
        var rob2=$("#zoom_container1 img").height();
        
        if(Kx/K<1) $("#zoom_container1 img").css("width",rob1+(rob1*(1-Kx2)));
        else $("#zoom_container1 img").css("width",rob1-(rob1*(1-Kx2)));
       
        if(Ky/K<1) $("#zoom_container1 img").css("height",rob2+(rob2*(1-Ky2)));
        else $("#zoom_container1 img").css("height",rob2-(rob2*(1-Ky2)));
                      
        var left=$("#zoom_container1").css("margin-left");
        var top=$("#container1").css("top");
        left=left.substr(0,left.length-2);
        top=top.substr(0,top.length-2);
        var Xcon=$("#picture_container1").width();
        var Ycon=$("#picture_container1").height();
        var Xit=$("#picture_item1").width();
        var Yit=$("#picture_item1").height();
        var rob1=$(window).width();
        var Xpos;
        if(0.1*rob1+2*Xcon<rob1){
            Xpos=evt.pageX-(rob1-(0.1*rob1+2*Xcon))/2;
        }
        else Xpos=evt.pageX;
        var Ypos=evt.pageY-top;

        if(Xpos<Xcon-Xit/2){
            if(Xpos>Xit/2) $("#picture_item1").css("left", Xpos-Xit/2);
            else $("#picture_item1").css("left",0);
        }
        else $("#picture_item1").css("left",Xcon-Xit);
        
        if(Ypos<Ycon-Yit/2){
            if(Ypos>Yit/2) $("#picture_item1").css("top", Ypos-Yit/2);
            else $("#picture_item1").css("top",0);
            
        }
        else $("#picture_item1").css("top",Ycon-Yit);
       
        var Xl=$("#picture_item1").css("left");
        var Yl=$("#picture_item1").css("top");
        Xl=Xl.substr(0,Xl.length-2);
        Yl=Yl.substr(0,Yl.length-2);
		
        $("#zoom_container1 img").css("margin-left", -Xl*Kx);
        $("#zoom_container1 img").css("margin-top", -Yl*Ky);
       
    });
});