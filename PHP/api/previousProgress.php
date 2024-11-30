<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    $subject = $_POST['subject'];
    $username = $_POST['username'];
    $response = [];
    $score = 0;
    // $id = null;
    // $subj_id = null;
    $conn = mysqli_connect("localhost","root","","webproj");

    $sql1 = "select id from student where username='".$username."';";
    $query1 = $conn -> query($sql1);
    
    if($query1 -> num_rows >0){
        while($row = $query1 -> fetch_assoc()){
            $id = $row["id"];
        }
    }

    $sql2 = "select id from subject where subj_name='".$subject."';";
    $query2 = $conn -> query($sql2);
    
    if($query2 -> num_rows >0){
        while($row = $query2 -> fetch_assoc()){
            $subj_id = $row["id"]; 
        }
        
    }

    $sql3 = "select * from progress where sid=".$id;
    $query3 = $conn -> query($sql3);
    if($query3 ->num_rows >0){
       while($row = $query3 -> fetch_assoc()){
            $score = $row["marks"];
            $response["score"] = $score; 
        }
                    
    }


    echo json_encode($response);  
    

?>