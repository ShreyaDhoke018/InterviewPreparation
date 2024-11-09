<?php
    header('Access-Control-Allow-Origin: *'); // Ensure it matches the React app port
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: *');
    // // phpinfo();
    
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $response = [];
    $con = mysqli_connect("localhost:3306","root","","webproj") or die("failed to connect ");
     $email = mysqli_real_escape_string($con, $email);
    $password = mysqli_real_escape_string($con, $password);
    if($con){
        $response['connection']= "connection successful<br>";
        $sqlValues = "('".$email."','".$username."','".$password."')";
        if(!empty($sqlValues)){
            $query_select = "SELECT gmail FROM student WHERE gmail='".$email."';";
            $result = $con->query($query_select);

            if ($result->num_rows > 0) {
                $response['message'] = "Already registered";
            }
            else {
                $query_chkUsername = "SELECT username FROM student WHERE username='".$username."';";
                $result_username = $con->query($query_chkUsername);

                if ($result_username->num_rows > 0) {
                    $response['message'] = "Username exists please try something else";
                }else{
                     $query = "INSERT INTO student(gmail, username, password) VALUES " . $sqlValues;
                    if(mysqli_query($con, $query)){
                        $response['message'] = "Registered successfully";
                    } else {
                        $response['message'] = "Registration unsuccessful";
                    }
                }
               
            }
        }
    }

 
echo json_encode($response);  

?>
 