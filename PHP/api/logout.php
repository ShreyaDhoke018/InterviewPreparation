    <?php
        header('Access-Control-Allow-Origin: *'); // Ensure it matches the React app port
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');

        session_start();

        $response = [];
        if(isset($_SESSION['email'])){
            unset($_SESSION['email']);

            session_destroy();
            $response['session'] = "Session destroyed";
        }else{
            $response['session'] = "No active session";
        }
                  

        echo json_encode($response);  
    ?>
