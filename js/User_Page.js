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
    var userPictures = new Array();

    GetUserPictUrl = function () {
        var random = Math.floor(Math.random() * Math.floor(5));
        var result = "";
        switch(random) {
            case 0:
                result = 'user_icon1.jpg';
                break;
            case 1:
                result = 'user_icon2.jpg';
                break;
            case 2:
                result = 'user_icon3.jpg';
                break;
            case 3:
                result = 'user_icon4.jpg';
                break;
            case 4:
                result = 'user_icon5.jpg';
                break;
            default:
                break;
        }
        userPictures.push(result);
        return result;
    }

    SetUser = function(user, name, data){

        user.css("background-color","transparent");
        user.css("background-image","url(../image/" + GetUserPictUrl() + ")");
        user.css("background-size","cover");
        user.css("background-repeat","no-repeat");
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
                if(response != 0){
                    users = JSON.parse(response);
                    
                    var userTotal = users.length;
                    var i = 1;
                    while(i <= userTotal){
                        if(i == 1){
                            SetUser(UserA, NameA, users[0]);
                            userAExist = true;
                        } else if(i == 2){
                            SetUser(UserB, NameB, users[1]);
                            userBExist = true;
                        } else if(i == 3){
                            SetUser(UserC, NameC, users[2]);
                            userCExist = true;
                        } else if(i == 4){
                            SetUser(UserD, NameD, users[3]);
                            userDExist = true;
                        } else if(i == 5){
                            SetUser(UserE, NameE, users[4]);
                            userEExist = true;
                        }
                        i++;
                    }
                    
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

    UserClicked = function(userIndex){
        body.addClass("loading");

        var mainPageUser = "";
        var mainPageUserPictUrl = "";

        mainPageUser = users[userIndex].userId;
        if(userPictures != null && userPictures.length >= userIndex + 1)
            mainPageUserPictUrl = userPictures[userIndex];

        if(mainPageUser != ""){
            $.ajax({
                type: "POST",
                url: 'User_Page.php',
                data: {
                    mainPageUser: mainPageUser,
                    mainPageUserPictUrl: mainPageUserPictUrl
                },
                success: function(response)
                {
                    body.removeClass("loading");

                    if(response != 'false'){
                        window.location.replace("../divs.html");
                    }
                },
                error: function(response){
                    body.removeClass("loading");
                    console.log("error!");
                    console.log(response);
                }
            });
        }
    }

    UserA.on("click", function(){
        if(users != null && users.length >= 1)
            UserClicked(0);
    });

    UserB.on("click", function(){
        if(users != null && users.length >= 2)
            UserClicked(1);
        
    });

    UserC.on("click", function(){
        if(users != null && users.length >= 3)
            UserClicked(2);
        
    });

    UserD.on("click", function(){
        if(users != null && users.length >= 4)
            UserClicked(3);
        
    });

    UserE.on("click", function(){
        if(users != null && users.length >= 5)
            UserClicked(4);
        
    });
});