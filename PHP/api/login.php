    <?php
        header('Access-Control-Allow-Origin: *'); // Ensure it matches the React app port
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');

        session_start();

        $email = $_POST["email"];
        $password = $_POST["password"]; 
        $response = [];
        
        $con = mysqli_connect("localhost:3306","root","","webproj") or die("failed to connect ");
        $email = mysqli_real_escape_string($con, $email);
        $password = mysqli_real_escape_string($con, $password);
        if($con){
            $response['connection']= "connection successful<br>";
            $sqlValues = "('".$email."','".$password."')";
            if(!empty($sqlValues)){
                $query_select = "SELECT id, gmail,username, password, role FROM student WHERE gmail='".$email."'and password='".$password."';";
                $result = $con->query($query_select);

                if ($result->num_rows > 0) {
                    while ($row = mysqli_fetch_array($result)) {
                        $response['login_status']="login successful";
                        $response['username'] = $row["username"];
                        $response['role'] = $row["role"];
                        $_SESSION["email"] = $email;
                        if(isset($_SESSION['email'])){
                            $response['session'] = "Session started";
                        }
                    }
                }
                else {
                    $response['connection']="incorrect credentials";
                }
            }
        }

    echo json_encode($response);  
    ?>
