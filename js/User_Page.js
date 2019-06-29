$(document).ready(function(){
    var body = $('body');
    body.addClass("loading");

    var UserA = $('.User_A');
    var UserB = $('.User_B');
    var UserC = $('.User_C');
    var UserD = $('.User_D');
    var UserE = $('.User_E');
    var NameA = $('#Name_A');
    var NameB = $('#Name_B');
    var NameC = $('#Name_C');
    var NameD = $('#Name_D');
    var NameE = $('#Name_E');
    var userAExist = false;
    var userBExist = false;
    var userCExist = false;
    var userDExist = false;
    var userEExist = false;
    $('.User').css("background-color","rgba(226, 227, 227, 0.76)");

    var users = new Array();

    SetUser = function(user, name, data){
        user.css("background-color","transparent");
        user.css("background-image","url('../image/dolby.png')");
        name.html(data.userName);
    }

    CheckUsers = function(){
        $.ajax({
            type: "POST",
            url: 'User_Page.php',
            data: {
                checkUsers : 'true'
            },
            success: function(response)
            {
                console.log(response);
                users = JSON.parse(response);
                
                var userTotal = users.length;
                switch(userTotal) {
                    case 5:
                      SetUser(UserE, NameE, users[4]);
                      userEExist = true;
                    case 4:
                      SetUser(UserD, NameD, users[3]);
                      userDExist = true;
                    case 3:
                      SetUser(UserC, NameC, users[2]);
                      userCExist = true;
                    case 2:
                      SetUser(UserB, NameB, users[1]);
                      userBExist = true;
                    case 1:
                      SetUser(UserA, NameA, users[0]);
                      userAExist = true;
                    default:
                      break;
                }

                body.removeClass("loading");
            },
            error: function(response){
                body.removeClass("loading");
                console.log("error!");
                console.log(response);
            }
       });
    };

    CheckUsers();

    UserA.mouseenter(function(){
        if(userAExist)
            UserA.addClass('User-hover');
        else
            UserA.addClass('Add-user');
    }).mouseleave(function(){
        UserA.removeClass('User-hover');
        UserA.removeClass('Add-user');
    });

    UserB.mouseenter(function(){
        if(userBExist)
            UserB.addClass('User-hover');
        else
            UserB.addClass('Add-user');
    }).mouseleave(function(){
        UserB.removeClass('User-hover');
        UserB.removeClass('Add-user');
    });

    UserC.mouseenter(function(){
        if(userCExist)
            UserC.addClass('User-hover');
        else
            UserC.addClass('Add-user');
    }).mouseleave(function(){
        UserC.removeClass('User-hover');
        UserC.removeClass('Add-user');
    });

    UserD.mouseenter(function(){
        if(userDExist)
            UserD.addClass('User-hover');
        else
            UserD.addClass('Add-user');
    }).mouseleave(function(){
        UserD.removeClass('User-hover');
        UserD.removeClass('Add-user');
    });

    UserE.mouseenter(function(){
        if(userEExist)
            UserE.addClass('User-hover');
        else
            UserE.addClass('Add-user');
    }).mouseleave(function(){
        UserE.removeClass('User-hover');
        UserE.removeClass('Add-user');
    });
});