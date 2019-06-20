$(document).ready(function(){
    var poster1 = $('#poster1');
    var poster2 = $('#poster2');
    var poster3 = $('#poster3');
    var poster4 = $('#poster4');
    var poster5 = $('#poster5');
    var nowPlayingPoster1 = $('#nowPlayingPoster1');
    var nowPlayingPoster2 = $('#nowPlayingPoster2');
    var nowPlayingPoster3 = $('#nowPlayingPoster3');
    var nowPlayingPoster4 = $('#nowPlayingPoster4');
    var nowPlayingPoster5 = $('#nowPlayingPoster5');
    var maxIndex = 5;
    var indexPoster2 = poster2.css("z-index");
    var indexPoster3 = poster3.css("z-index");
    var indexPoster4 = poster4.css("z-index");
    var indexPoster5 = poster5.css("z-index");
    var loginContent = $('#loginContent');
    var videoContent = $('#videoContent');
    var video = $('#video');
    var poster1Clicked = false;
    var poster2Clicked = false;
    var poster3Clicked = false;
    var poster4Clicked = false;
    var poster5Clicked = false;

    poster1.on("click", function(){
        nowPlayingPoster1.show();
        poster1Clicked = true;
        posterClicked(1);
    });
    poster2.on("click", function(){
        nowPlayingPoster2.show();
        poster2Clicked = true;
        posterClicked(2);
    });
    poster3.on("click", function(){
        nowPlayingPoster3.show();
        poster3Clicked = true;
        posterClicked(3);
    });
    poster4.on("click", function(){
        nowPlayingPoster4.show();
        poster4Clicked = true;
        posterClicked(4);
    });
    poster5.on("click", function(){
        nowPlayingPoster5.show();
        poster5Clicked = true;
        posterClicked(5);
    });

    poster1.mouseenter(function(){
        poster1.css('cursor','pointer');
    });
    
    poster2.mouseenter(function(){
        poster2.css('cursor','pointer');
        poster2.css("z-index", maxIndex);
    }).mouseleave(function(){
        if(poster2Clicked === false)
            poster2.css("z-index", indexPoster2);
    });

    poster3.mouseenter(function(){
        poster3.css('cursor','pointer');
        poster3.css("z-index", maxIndex);
    }).mouseleave(function(){
        if(poster3Clicked === false)
            poster3.css("z-index", indexPoster3);
    });

    poster4.mouseenter(function(){
        poster4.css('cursor','pointer');
        poster4.css("z-index", maxIndex);
    }).mouseleave(function(){
        if(poster4Clicked === false)
            poster4.css("z-index", indexPoster4);
    });
    
    poster5.mouseenter(function(){
        poster5.css('cursor','pointer');
        poster5.css("z-index", maxIndex);
    }).mouseleave(function(){
        if(poster5Clicked === false)
            poster5.css("z-index", indexPoster5);
    });

    posterClicked = function(id){
        var videoLink = "";
        if (id === 1)
            videoLink = "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1";
        else if (id === 2)
            videoLink = "https://www.youtube.com/embed/M7XM597XO94?autoplay=1";
        else if (id === 3)
            videoLink = "https://www.youtube.com/embed/1-q8C_c-nlM?autoplay=1";
        else if (id === 4)
            videoLink = "https://www.youtube.com/embed/frdj1zb9sMY?autoplay=1";
        else if (id === 5)
            videoLink = "https://www.youtube.com/embed/tUcrbUCWKQc?autoplay=1";
        
        if(videoLink.length > 0){
            video.attr('src', videoLink);
            loginContent.hide();
            videoContent.show();
        }
    };

    $(document).on("click", function(e){
        if ((poster1Clicked === true && !poster1.is(e.target) && poster1.has(e.target).length === 0)){
            if(!(poster2Clicked === true || poster3Clicked === true || poster4Clicked === true || poster5Clicked === true)){
                video.attr('src', '');
                loginContent.show();
                videoContent.hide();
            }
            poster1Clicked = false;
            nowPlayingPoster1.hide();
            
        } else if (poster2Clicked === true && !poster2.is(e.target) && poster2.has(e.target).length === 0){
            if(!(poster1Clicked === true || poster3Clicked === true || poster4Clicked === true || poster5Clicked === true)){
                video.attr('src', '');
                loginContent.show();
                videoContent.hide();
            }
            nowPlayingPoster2.hide();
            poster2.css("z-index", indexPoster2);
            poster2Clicked = false;
        } else if (poster3Clicked === true && !poster3.is(e.target) && poster3.has(e.target).length === 0){
            if(!(poster1Clicked === true || poster2Clicked === true || poster4Clicked === true || poster5Clicked === true)){
                video.attr('src', '');
                loginContent.show();
                videoContent.hide();
            }
            nowPlayingPoster3.hide();
            poster3.css("z-index", indexPoster3);
            poster3Clicked = false;
        } else if (poster4Clicked === true && !poster4.is(e.target) && poster4.has(e.target).length === 0){
            if(!(poster1Clicked === true || poster2Clicked === true || poster3Clicked === true || poster5Clicked === true)){
                video.attr('src', '');
                loginContent.show();
                videoContent.hide();
            }
            nowPlayingPoster4.hide();
            poster4.css("z-index", indexPoster4);
            poster4Clicked = false;
        } else if (poster5Clicked === true && !poster5.is(e.target) && poster5.has(e.target).length === 0){
            if(!(poster1Clicked === true || poster2Clicked === true || poster3Clicked === true || poster4Clicked === true)){
                video.attr('src', '');
                loginContent.show();
                videoContent.hide();
            }
            nowPlayingPoster5.hide();
            poster5.css("z-index", indexPoster5);
            poster5Clicked = false;
        }
    });
});