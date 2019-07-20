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

if(isset($_POST['GetPosters']) && isset($_POST['Age'])){
    if($_POST['GetPosters'] === 'new' || $_POST['GetPosters'] === 'trend'){
        
        $resource = '';
        if($_POST['GetPosters'] === 'new')
            $resource = 'CALL GetNewMovieList(?)';
        if(!empty($resource)){
            $conn = OpenCon();
            $call = $conn->prepare($resource);
            $call->bind_param('i', $_POST['Age']);
            $call->execute();
            $result = $call->get_result();
            if($result->num_rows === 0){
                echo 0;
                CloseCon($conn);
                return;
            }

            $movieList = array();
            while($row = $result->fetch_assoc()){
                $movie = new stdClass();

                $movie -> movieId = $row['Id'];
                $movie -> movieName = $row['Name'];
                if(!empty($row['Picture_Url']))
                    $movie -> pictUrl = $row['Picture_Url'];
                else
                    $movie -> pictUrl = '';

                if(!empty($row['Picture_Local_Url']))
                    $movie -> pictLocalUrl = $row['Picture_Local_Url'];
                else
                    $movie -> pictLocalUrl = '';
                    
                if(!empty($row['Picture_Cover']) && $row['Picture_Cover'] != "''")
                    $movie -> pictCover = $row['Picture_Cover'];
                else
                    $movie -> pictCover = '';
                
                $movieList[] = $movie;
            }
            echo json_encode($movieList);
            $call->close();
            CloseCon($conn);
        }
    }
}

?>