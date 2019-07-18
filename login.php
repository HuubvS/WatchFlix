<?php
include 'db_connection.php';
include 'cookie_manager.php';

if(isset($_POST['checkUser']) && $_POST['checkUser'] === 'true'){
    if(CheckUser() === 'true'){
        echo 'true';
    } else {
        echo 'false';
    }
}

if(isset($_POST['username']) && isset($_POST['password'])){
    $pass = md5($_POST['password']);

    try {
        $conn = OpenCon();
    
        $call = $conn->prepare('CALL UserLogin(?, ?, @userId, @userGroupId)');
        $call->bind_param('ss', $_POST['username'], $pass);
        $call->execute();

        $select = $conn->query('SELECT @userId, @userGroupId') ;
        $result = $select->fetch_assoc() or die($conn->error);

        $userId = $result['@userId'];
        $userGroupId = $result['@userGroupId'];
        SetUser($userId, $userGroupId);
        echo $userId;

        CloseCon($conn);
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
}

?>