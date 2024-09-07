window.onload=function(){
    var upload = document.getElementById("upload");
    

    upload.onchange=function(){
        var file= this.files[0];
        var name = file.name;
        var Size  = ((file.size/1000)/1000).toFixed(2);
        var url = URL.createObjectURL(file);


        //Declare tool bars
        var playIcon = document.getElementById("play-icon");
        var muteIcon =document.getElementById("mute-icon");
        var loopIcon =document.getElementById("loop-icon");


        
        var title = document.getElementById("title");
        title.innerHTML = name;

        var size = document.getElementById("size");
        size.innerHTML = "Size:"+Size+"Mb";

        var audio = document.createElement("audio");
        audio.src= url;
        audio.play();
        playIcon.className ="ri-pause-mini-fill";

        var toolbars = document.getElementsByClassName("toolbar");
        for(var i=0; i<toolbars.length; i++)
        {
           toolbars[i].disabled =false
        }


        var playBtn = document.getElementById("play-btn");
        playBtn.onclick = function()
        {
            if(audio.paused){
                playIcon.className ="ri-pause-mini-fill";
                audio.play();
            }
            else{
                playIcon.className ="ri-play-mini-fill";
                audio.pause();
            }
        }

        var muteBtn =document.getElementById("mute-btn");
        muteBtn.onclick = function()
        {
            if(audio.muted)
            {
                muteIcon.className ="ri-volume-up-fill";
                audio.muted =false;
            }
            else{
                muteIcon.className ="ri-volume-mute-fill";
                audio.muted =true;
            }
        }

        var loopBtn = document.getElementById("loop-btn");
        loopBtn.onclick = function()
        {
           if(audio.loop)
           {
              loopIcon.className ="ri-repeat-2-fill";
              audio.loop = false;
           }
           else{
            loopIcon.className ="ri-repeat-one-fill";
            audio.loop = true;
           }
        }

        var forwardBtn =document.getElementById("forward-btn");
        forwardBtn.onclick = function()
        {
            audio.currentTime = audio.currentTime + 10;
        }

        var backwardBtn =document.getElementById("backward-btn");
        backwardBtn.onclick = function()
        {
            audio.currentTime = audio.currentTime - 10;
        }

        audio.onloadedmetadata = function(){
            var duration = audio.duration;
            var minutes = Math.floor(duration/60);
            var seconds = Math.floor(duration%60);
            var fullDuration = document.getElementById("full-duration");
            fullDuration.innerHTML = minutes+":"+seconds;
          }

          audio.ontimeupdate = function(){
            var totalDuration = audio.duration;
            var duration = audio.currentTime;
            var minutes = Math.floor(duration/60);
            var seconds = Math.floor(duration%60);
            var currentDuration = document.getElementById("current-duration");
            currentDuration.innerHTML = minutes+":"+seconds;
            var percentage = Math.floor((duration/totalDuration)*100)
            var progressBar =document.getElementById("progress-bar");
            progressBar.style.width = percentage+"%";
          }

          var progress = document.getElementById("progress");
          progress.onclick =function(event){
            var mainProgress = progress.getBoundingClientRect();
            var clickMarginFromLeftSide = event.clientX;
            var progressMarginFromLeftSide = mainProgress.left;
            var offsetX = clickMarginFromLeftSide - progressMarginFromLeftSide;
            var approxDuration = offsetX/mainProgress.width;
            var newTime = approxDuration*audio.duration;
            audio.currentTime = newTime;
            audio.play()
          }



    }
    
      

  
}