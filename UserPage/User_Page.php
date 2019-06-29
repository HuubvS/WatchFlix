<?php
include '../cookie_manager.php';
include '../db_connection.php';

if(isset($_POST['checkUsers']))
{
    if($_POST['checkUsers'] === 'true'){
        $userGroupId = GetUserGroupId();

        if(isset($userGroupId)){
            if(strpos($userGroupId, 'User not exist') !== true){
                $conn = OpenCon();
    
                $call = $conn->prepare('CALL GetUsersByGroupId(?)');
                $call->bind_param('i', $userGroupId);
                $call->execute();
                $result = $call->get_result();
                if($result->num_rows === 0){
                    echo 0;
                    CloseCon($conn);
                    return;
                }

                $array = array();
                while($row = $result->fetch_assoc()){
                    $user = new stdClass();
                    $user -> userId = $row['Id'];
                    $user -> userName = $row['Username'];
                    $user -> age = $row['Age'];
                    
                    $array[] = $user;
                }
                echo json_encode($array);
                $call->close();
                CloseCon($conn);
            } else {

            }
        }
    }
};


?>