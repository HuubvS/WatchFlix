<?php
include '../cookie_manager.php';
include '../db_connection.php';

if(isset($_POST['checkUsers']))
{
    if($_POST['checkUsers'] === 'true'){
        $mainPageUserId = GetMainPageUserId();
        $mainPageUserPictUrl = GetMainPageUserPictUrl();

        if(isset($mainPageUserId) && isset($mainPageUserPictUrl)){
            if(strpos($mainPageUserId, 'User not exist') !== true && strpos($mainPageUserPictUrl, 'User not exist') !== true){
                $conn = OpenCon();
    
                $call = $conn->prepare('CALL GetUserByUserId(?)');
                $call->bind_param('i', $mainPageUserId);
                $call->execute();
                $result = $call->get_result();
                if($result->num_rows === 0){
                    echo 0;
                    CloseCon($conn);
                    return;
                }

                $row = $result->fetch_assoc();
                $user = new stdClass();
                $user -> userId = $row['Id'];
                $user -> userName = $row['Username'];
                $user -> age = $row['Age'];

                $user -> pictUrl = $mainPageUserPictUrl;

                echo json_encode($user);
                $call->close();
                CloseCon($conn);
            } else {

            }
        }
    }
};

?>