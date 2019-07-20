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

    SetRSPosterImg = function(){
        for(i = 1 ; i < 22; i++){
            if(i > 22)
                $('#rs_poster_'+i).css('background-image','url(image/poster_scroll_1.jpg)');
            else
                $('#rs_poster_'+i).css('background-image','url(image/poster_scroll_' + i + '.jpg)');
        }
    }
    SetRSPosterImg();

    SetTrendPosterImg = function(){
        for(i = 1 ; i < 12; i++){
            if(i > 22)
                $('#trend_poster_'+i).css('background-image','url(image/poster_scroll_1.jpg)');
            else
                $('#trend_poster_'+i).css('background-image','url(image/poster_scroll_' + (23 - i) + '.jpg)');
        }
    }
    SetTrendPosterImg();

    

    // SetNewPosterImg();

    $("#rs_scroll_next").mouseenter(function(){
        $("#rsNext").hide();
        $("#rsNextHover").show();
    }).mouseleave(function(){
        $("#rsNext").show();
        $("#rsNextHover").hide();
    });

    $("#rs_scroll_prev").mouseenter(function(){
        $("#rsPrev").hide();
        $("#rsPrevHover").show();
    }).mouseleave(function(){
        $("#rsPrev").show();
        $("#rsPrevHover").hide();
    });

    $("#rs_scroll_next").on("click", function(){
        var leftPos = $('#rs_scroll_poster').scrollLeft();
        $('#rs_scroll_poster').animate({scrollLeft: leftPos + 1450}, 1000);
    });

    $("#rs_scroll_prev").on("click", function(){
        var leftPos = $('#rs_scroll_poster').scrollLeft();
        $('#rs_scroll_poster').animate({scrollLeft: leftPos - 1450}, 1000);
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