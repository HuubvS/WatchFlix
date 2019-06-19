$(document).ready(function(){
    var poster1 = $('#poster1');
    var poster2 = $('#poster2');
    var poster3 = $('#poster3');
    var poster4 = $('#poster4');
    var poster5 = $('#poster5');
    var maxIndex = 5;
    var indexPoster2 = poster2.css("z-index");
    var indexPoster3 = poster3.css("z-index");
    var indexPoster4 = poster4.css("z-index");
    var indexPoster5 = poster5.css("z-index");

    poster1.on("click", function(){
        posterClicked(1);
    });
    poster2.on("click", function(){
        posterClicked(2);
    });
    poster3.on("click", function(){
        posterClicked(3);
    });
    poster4.on("click", function(){
        posterClicked(4);
    });
    poster5.on("click", function(){
        posterClicked(5);
    });

    poster1.mouseenter(function(){
        poster1.css('cursor','pointer');
    });
    
    poster2.mouseenter(function(){
        poster2.css('cursor','pointer');
        poster2.css("z-index", maxIndex);
    }).mouseleave(function(){
        poster2.css("z-index", indexPoster2);
    });

    poster3.mouseenter(function(){
        poster3.css('cursor','pointer');
        poster3.css("z-index", maxIndex);
    }).mouseleave(function(){
        poster3.css("z-index", indexPoster3);
    });

    poster4.mouseenter(function(){
        poster4.css('cursor','pointer');
        poster4.css("z-index", maxIndex);
    }).mouseleave(function(){
        poster4.css("z-index", indexPoster4);
    });
    
    poster5.mouseenter(function(){
        poster5.css('cursor','pointer');
        poster5.css("z-index", maxIndex);
    }).mouseleave(function(){
        poster5.css("z-index", indexPoster5);
    });
});

posterClicked = function(id){
    if (id === 1)
        window.open("https://www.youtube.com/watch?v=TcMBFSGVi1c");
    else if (id === 2)
        window.open("https://www.youtube.com/watch?v=M7XM597XO94");
    else if (id === 3)
        window.open("https://www.youtube.com/watch?v=1-q8C_c-nlM");
    else if (id === 4)
        window.open("https://www.youtube.com/watch?v=frdj1zb9sMY");
    else if (id === 5)
        window.open("https://www.youtube.com/watch?v=tUcrbUCWKQc");
}