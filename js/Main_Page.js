$(document).ready(function(){
    var body = $('body');
    body.addClass("loading");

    var user = new Object();

    $("#imageLogo").css("background-color","rgba(226, 227, 227, 0.76)");
    $("#imageLogoText").html("");

    CreatePosterDiv = function(scrollPosterId, type, number, pictType, pict){
        $('#'+scrollPosterId).append('<div id="'+type+'_poster_'+number+'" class="poster_img"></div>');
        
        if(pictType == 'local')
            $('#'+type+'_poster_'+number).css('background-image','url(image/'+pict+')');
    }

    SetRecentPosterImg = function(){
        $.ajax({
            type: "POST",
            url: 'MainPage/Main_Page.php',
            data: {
                GetPosters : 'recent',
                UserId: user.userId,
                Age: user.age
            },
            success: function(response)
            {
                if(response != 0 && response.length > 0){
                    var json = JSON.parse(response);
                    if(json.length > 0){
                        var i = 1;
                        json.forEach(x => {
                            if(x.pictUrl.length > 0)
                                CreatePosterDiv('recent_scroll_poster', 'recent', i, 'online', x.pictUrl);
                            else if(x.pictCover.length > 0)
                                CreatePosterDiv('recent_scroll_poster', 'recent', i, 'blob', x.pictCover);
                            else if(x.pictLocalUrl.length > 0)
                                CreatePosterDiv('recent_scroll_poster', 'recent', i, 'local', x.pictLocalUrl);
                            i++;
                        });
                    }
                }
            },
            error: function(response){
                console.log("error!");
                console.log(response);
            }
       });
    };

    SetTrendPosterImg = function(){
        $.ajax({
            type: "POST",
            url: 'MainPage/Main_Page.php',
            data: {
                GetPosters : 'trend',
                Age: user.age
            },
            success: function(response)
            {
                if(response != 0 && response.length > 0){
                    var json = JSON.parse(response);
                    if(json.length > 0){
                        var i = 1;
                        json.forEach(x => {
                            if(x.pictUrl.length > 0)
                                CreatePosterDiv('trend_scroll_poster', 'trend', i, 'online', x.pictUrl);
                            else if(x.pictCover.length > 0)
                                CreatePosterDiv('trend_scroll_poster', 'trend', i, 'blob', x.pictCover);
                            else if(x.pictLocalUrl.length > 0)
                                CreatePosterDiv('trend_scroll_poster', 'trend', i, 'local', x.pictLocalUrl);
                            i++;
                        });
                    }
                }
            },
            error: function(response){
                console.log("error!");
                console.log(response);
            }
       });
    };

    SetNewPosterImg = function(){
        $.ajax({
            type: "POST",
            url: 'MainPage/Main_Page.php',
            data: {
                GetPosters : 'new',
                Age: user.age
            },
            success: function(response)
            {
                if(response != 0 && response.length > 0){
                    var json = JSON.parse(response);
                    if(json.length > 0){
                        var i = 1;
                        json.forEach(x => {
                            if(x.pictUrl.length > 0)
                                CreatePosterDiv('new_scroll_poster', 'new', i, 'online', x.pictUrl);
                            else if(x.pictCover.length > 0)
                                CreatePosterDiv('new_scroll_poster', 'new', i, 'blob', x.pictCover);
                            else if(x.pictLocalUrl.length > 0)
                                CreatePosterDiv('new_scroll_poster', 'new', i, 'local', x.pictLocalUrl);
                            i++;
                        });
                    }
                }
            },
            error: function(response){
                console.log("error!");
                console.log(response);
            }
       });
    };

    CheckUsers = function(){
        $.ajax({
            type: "POST",
            url: 'MainPage/Main_Page.php',
            data: {
                checkUsers : 'true'
            },
            success: function(response)
            {
                if(response != 0){
                    var json = JSON.parse(response);
                    user.userId = json.userId;
                    user.userName = json.userName;
                    user.age = json.age;
                    console.log("json.pictUrl");

                    if(json.pictUrl != "")
                        $("#imageLogo").css("background-image","url(image/" + json.pictUrl + ")");
                        
                    $("#imageLogoText").html(json.userName);
                }

                body.removeClass("loading");
                
                SetRecentPosterImg();
                SetTrendPosterImg();
                SetNewPosterImg();
            },
            error: function(response){
                body.removeClass("loading");
                console.log("error!");
                console.log(response);
            }
       });
    };

    CheckUsers();

    var imageResult = Array();

    GetRandomMovieImg = function () {
        var noRepeat = false;
        var random = 0;
        var result = "";
        while(!noRepeat){
            noRepeat = true;
            random = Math.floor(Math.random() * Math.floor(7));
            switch(random) {
                case 0:
                    result = 'movie_preview_main.png';
                    break;
                case 1:
                    result = 'movie_preview_1.png';
                    break;
                case 2:
                    result = 'movie_preview_2.png';
                    break;
                case 3:
                    result = 'movie_preview_3.png';
                    break;
                case 4:
                    result = 'movie_preview_4.png';
                    break;
                case 5:
                    result = 'movie_preview_5.png';
                    break;
                case 6:
                    result = 'movie_preview_6.png';
                    break;
                default:
                    break;
            }

            if(imageResult.length > 0){
                imageResult.forEach(x => {
                    if(x == result){
                        noRepeat = false;
                    }
                });
            }
        }
        imageResult.push(result);

        return result;
    }

    $(".next_uppersection").mouseenter(function(){
        $("#imageNext").hide();
        $("#imageNextHover").show();
    }).mouseleave(function(){
        $("#imageNext").show();
        $("#imageNextHover").hide();
    });

    $("#imageNextHover").on("click", function(){
        $(".left_uppersection").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#a1").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#b1").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#c1").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#d1").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#e1").css("background-image","url(image/" + GetRandomMovieImg() + ")");
        $("#f1").css("background-image","url(image/" + GetRandomMovieImg() + ")");

        imageResult.length = 0;
    });

    $("#recent_scroll_next").mouseenter(function(){
        $("#recentNext").hide();
        $("#recentNextHover").show();
    }).mouseleave(function(){
        $("#recentNext").show();
        $("#recentNextHover").hide();
    });

    $("#recent_scroll_prev").mouseenter(function(){
        $("#recentPrev").hide();
        $("#recentPrevHover").show();
    }).mouseleave(function(){
        $("#recentPrev").show();
        $("#recentPrevHover").hide();
    });

    $("#recent_scroll_next").on("click", function(){
        var leftPos = $('#recent_scroll_poster').scrollLeft();
        $('#recent_scroll_poster').animate({scrollLeft: leftPos + 1450}, 1000);
    });

    $("#recent_scroll_prev").on("click", function(){
        var leftPos = $('#recent_scroll_poster').scrollLeft();
        $('#recent_scroll_poster').animate({scrollLeft: leftPos - 1450}, 1000);
    });

    $("#trend_scroll_next").mouseenter(function(){
        $("#trendNext").hide();
        $("#trendNextHover").show();
    }).mouseleave(function(){
        $("#trendNext").show();
        $("#trendNextHover").hide();
    });

    $("#trend_scroll_prev").mouseenter(function(){
        $("#trendPrev").hide();
        $("#trendPrevHover").show();
    }).mouseleave(function(){
        $("#trendPrev").show();
        $("#trendPrevHover").hide();
    });

    $("#trend_scroll_next").on("click", function(){
        var leftPos = $('#trend_scroll_poster').scrollLeft();
        $('#trend_scroll_poster').animate({scrollLeft: leftPos + 1450}, 1000);
    });

    $("#trend_scroll_prev").on("click", function(){
        var leftPos = $('#trend_scroll_poster').scrollLeft();
        $('#trend_scroll_poster').animate({scrollLeft: leftPos - 1450}, 1000);
    });

    $("#new_scroll_next").mouseenter(function(){
        $("#newNext").hide();
        $("#newNextHover").show();
    }).mouseleave(function(){
        $("#newNext").show();
        $("#newNextHover").hide();
    });

    $("#new_scroll_prev").mouseenter(function(){
        $("#newPrev").hide();
        $("#newPrevHover").show();
    }).mouseleave(function(){
        $("#newPrev").show();
        $("#newPrevHover").hide();
    });

    $("#new_scroll_next").on("click", function(){
        var leftPos = $('#new_scroll_poster').scrollLeft();
        $('#new_scroll_poster').animate({scrollLeft: leftPos + 1450}, 1000);
    });

    $("#new_scroll_prev").on("click", function(){
        var leftPos = $('#new_scroll_poster').scrollLeft();
        $('#new_scroll_poster').animate({scrollLeft: leftPos - 1450}, 1000);
    });
});