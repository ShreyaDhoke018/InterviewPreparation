<?php

//     phpinfo();
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

//     error_reporting(E_ALL);
// ini_set('display_errors', 1);
    
//     $dblink = mysqli_connect("localhost", "root", "", "webproj");
    
//     // Check if the connection was successful
//     if (!$dblink) {
//         die("Database connection failed: " . mysqli_connect_error());
//     }
//     else{
//         $email = $_POST['email'];
//         $password = $_POST['password'];
//         $confirm_password = $_POST['confirm_password'];
//         $sqlValues = "('".$email."','".$password."')";
//         if($password === $confirm_password){
//             if(!empty($sqlValues)){
//                 $query = "insert into student(gmail,password) values" . $sqlValues;
//                 if(mysqli_query($dblink, $query)){
//                         echo "Registered successfully";
//                 }else{
//                     echo "Registration unsuccessfull";
//                 }
//             }
//         }else{
//             echo "password doesnt match!";
//         }
//     }

//     mysqli_close($dblink);

    // phpinfo();
    $con = mysqli_connect("localhost:3306","root","") or die("failed to connect ");
    if($con){
        echo "connection successful";
    }
    echo "<br>";

    

    

?>