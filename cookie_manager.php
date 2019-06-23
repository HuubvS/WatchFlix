<?php

$USER = "User";

function SetUser($userId){
    global $USER;
    if(isset($userId)){
        setcookie($USER, $userId);
    }
}

function DeleteUser(){
    global $USER;
    if(CheckUser() === 'true'){ 
        setcookie($USER, "", time()-60); 
    }
}

function GetUser(){
    global $USER;
    if(CheckUser() === 'true'){ 
        return $_COOKIE[$USER];
    } else {
        return "User not exist";
    }
}

function CheckUser(){
    global $USER;
    if(isset($_COOKIE[$USER])){ 
        return 'true';
    } else {
        return 'false';
    }
}

?>