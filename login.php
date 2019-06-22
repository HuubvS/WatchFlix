<?php
include 'db_connection.php';

if(isset($_POST['username']) && isset($_POST['password'])){
$pass = md5($_POST['password']);

try {
    $conn = OpenCon();
    
    $call = $conn->prepare('CALL UserLogin(?, ?, @userId)');
    $call->bind_param('ss', $_POST['username'], $pass);
    $call->execute();

    $select = $conn->query('SELECT @userId') ;
    $result = $select->fetch_assoc() or die($conn->error);
    echo $result['@userId'];

    CloseCon($conn);
} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
}
}

?>