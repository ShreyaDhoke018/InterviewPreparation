<?php
    header('Access-Control-Allow-Origin: *'); // Ensure it matches the React app port
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: *');
    // // phpinfo();
    
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $id = $_POST['id'];
    
    $response = [];
    $con = mysqli_connect("localhost:3306","root","","webproj") or die("failed to connect ");
   
    if($con){
        $response['connection']= "connection successful<br>";
        if($username != ""){
            $sql = "Update student set username='".$username."' where id=".$id.";";
            if($result = $con ->query($sql)){
                $response['msg']="Profile updated!!";
                echo json_encode($response);
            }
            else{
                $response['msg']="Profile not updated!";
            }
        }
         
        if($password != ""){
            $sql = "Update student set password='".$password."' where id=".$id.";";
            if($result = $con ->query($sql)){
                $response['msg']="Profile updated!!";
            }
            else{
                $response['msg']="Profile not updated!";
            }
        }
    }

 
echo json_encode($response);  

?>
 