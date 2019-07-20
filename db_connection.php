<?php
function OpenCon()
{
    // 127.0.0.1 is faster than localhost
    $dbhost = "127.0.0.1";
    $dbuser = "huulaca";
    $dbpass = "1212";
    $db = "watchflix";
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn -> error);
 
    return $conn;
}
 
function CloseCon($conn)
{
    $conn -> close();
}
   
?>