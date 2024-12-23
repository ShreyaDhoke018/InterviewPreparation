<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');
    
    $subject = $_POST['subject'];
    $response = [];
    $id = "";
    // $response2 = [];
    $target_dir ="files/";
    $dblink = mysqli_connect("localhost", "root", "", "webproj");
    // $response["subject"] = $subject;
    $query = "select id from subject where subj_name='".$subject."';";
    $result = $dblink->query($query);
    if($result -> num_rows > 0){
        while($row = mysqli_fetch_array($result))
        {
            $id = $row["id"];
            // $response["id"] = $id;
            
        }
   

    $query2 = "select fname from file where subj_id=".$id.";";
    $result2 = $dblink->query($query2);
    if($result2 -> num_rows > 0){
        while($row = mysqli_fetch_array($result2))
        {
            $fname = $row["fname"];
            
        }
        // $response["fname"] = $fname;
         $file = fopen($fname,"r");
            // $file = fopen($oldFilePath,"r");

            if($file){
                $headers= fgetcsv($file);
                while(($row = fgetcsv($file))!==false){
                    $question_data = [
                                    "question" => $row[0],
                                    "option1" => $row[1],
                                    "option2" => $row[2],
                                    "option3" => $row[3],
                                    "option4" => $row[4],
                                    "answer" => $row[5]
                                ];
                            $response[] = $question_data;          
                }

            echo json_encode($response);
            }
    }
    else{
        $response['msg'] = "Questions not available";
    }

   }
?>