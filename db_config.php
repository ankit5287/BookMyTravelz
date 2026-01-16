<?php
    $connection = mysqli_connect('localhost' , 'root' , '' , 'book_db');

    if(!$connection){
        die('Connection failed: ' . mysqli_connect_error());
    }
?>
