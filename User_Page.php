<?php
include 'cookie_manager.php';
include 'db_connection.php';

if(isset($_POST['checkUsers']))
{
    if($_POST['checkUsers'] === 'true'){
        $userGroupId = GetUserGroupId();

        if(isset($userGroupId)){
            if(strpos($userGroupId, 'User not exist') !== true){
                $conn = OpenCon();
    
                $call = $conn->prepare('CALL GetUsersByGroupId(?, @userName, @age, @userId)');
                $call->bind_param('i', $userGroupId);
                $call->execute();
                
                $select = $conn->query('SELECT @userName, @age, @userId') ;

                if($select->num_rows == 0){
                    echo 0;
                    CloseCon($conn);
                    return;
                }

                $array = array();
                while($result = $select->fetch_assoc()){
                    $user = new stdClass();
                    $user -> userId = $result['@userId'];
                    $user -> userName = $result['@userName'];
                    $user -> age = $result['@age'];

                    $array[] = $user;
                }
                echo json_encode($array);
                CloseCon($conn);
            } else {

            }
        }
    }
};


?>