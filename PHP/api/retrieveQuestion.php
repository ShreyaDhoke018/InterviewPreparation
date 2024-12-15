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

    // $oldFname = basename($subject . "_data.csv");
    // $oldFilePath = $target_dir . $oldFname;

    // $file = fopen("files/Dsa_data.csv","r");
   
    

    // if($dblink){
    //     $query_select = "SELECT question, option1, option2, option3, option4, answer FROM question";
    //     $result = $dblink->query($query_select);

    //     if ($result->num_rows > 0) {
    //         while ($row = mysqli_fetch_array($result)) {
    //              $question_data = [
    //                 "question" => $row["question"],
    //                 "option1" => $row["option1"],
    //                 "option2" => $row["option2"],
    //                 "option3" => $row["option3"],
    //                 "option4" => $row["option4"],
    //                 "answer" => $row["answer"]
    //             ];
    //             $response[] = $question_data;
    //             // $response["question"] = $row["question"];
    //             // $response["option1"] = $row["option1"];
    //             // $response["option2"] = $row["option2"];
    //             // $response["option3"] = $row["option3"];
    //             // $response["option4"] = $row["option4"];
    //             // $response["answer"] = $row["answer"];
    //             // echo json_encode($response);
                
    //         }
    //         echo json_encode($response);
    //     }
    //     else {
    //          echo json_encode(["message" => "No questions found"]);
    //     }
        
    // }

// echo json_encode($response);

?>