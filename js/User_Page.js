$(document).ready(function(){


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
                console.log(JSON.parse(response))
            },
            error: function(response){
                console.log("error!");
                console.log(response);
            }
       });
    };

    CheckUsers();
});