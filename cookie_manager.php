<?php

$USER = "User";

function SetUser($userId, $userGroupId){
    global $USER;
    
    if(isset($userId) && isset($userGroupId)){
        $user_content -> userId = $userId;
        $user_content -> userGroupId = $userGroupId;
        setcookie($USER, base64_encode(json_encode($user_content)), 0, "/");
    }
}

function DeleteUser(){
    global $USER;
    if(CheckUser() === 'true'){ 
        setcookie($USER, "", time()-60); 
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

function GetUser(){
    global $USER;
    if(CheckUser() === 'true'){ 
        return base64_decode($_COOKIE[$USER]);
    } else {
        return "User not exist";
    }
}

function GetUserId(){
    $user_content = GetUser();
    if (strpos($user_content, 'User not exist') !== true){
        $user_content = json_decode($user_content);
        if(isset($user_content->userId)){
            return $user_content->userId;
        }
    }
    return "User not exist";
}

function GetUserGroupId(){
    $user_content = GetUser();
    if (strpos($user_content, 'User not exist') !== true){
        $user_content = json_decode($user_content);
        if(isset($user_content->userGroupId)){
            return $user_content->userGroupId;
        }
    }
    return "User not exist";
}

function GetMainPageUserId(){
    $user_content = GetUser();
    if (strpos($user_content, 'User not exist') !== true){
        $user_content = json_decode($user_content);
        if(isset($user_content->mainPageUserId)){
            return $user_content->mainPageUserId;
        }
    }
    return "User not exist";
}

function SetMainPageUser($mainPageUserId, $mainPageUserPictUrl){
    global $USER;
    
    if(isset($mainPageUserId) && isset($mainPageUserPictUrl)){
        $user_content = GetUser();
        if (strpos($user_content, 'User not exist') !== true){
            $user_content = json_decode($user_content);
            $user_content -> mainPageUserId = $mainPageUserId;
            $user_content -> mainPageUserPictUrl = $mainPageUserPictUrl;
            setcookie($USER, base64_encode(json_encode($user_content)), 0, "/");
            return 'true';
        } 
        else
            return 'false';
    }
}

function GetMainPageUserPictUrl(){
    $user_content = GetUser();
    if (strpos($user_content, 'User not exist') !== true){
        $user_content = json_decode($user_content);
        if(isset($user_content->mainPageUserPictUrl)){
            return $user_content->mainPageUserPictUrl;
        }
    }
    return "User not exist";
}

?>