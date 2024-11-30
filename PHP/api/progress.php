<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    $subject = $_POST['subject'];
    $username = $_POST['username'];
    $score = $_POST['score'];
    $response = [];
    $previouScore = 0;
    // $id = null;
    // $subj_id = null;
    $response["subj"] = $subject;
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
        $sql4 = "UPDATE progress SET marks = $score WHERE sid = $id AND subj_id = $subj_id";
        if( $query4 = $conn -> query($sql4)){
            $response["progress"] = "Progress updated!";
            $response["msg"]= "select * from progress where sid=".$id." and subj_id=".$subject;
        }
        else{
            $response["progress"] = "Progress not updated";
        }
    }
    else{
        $response["msg"]="insert into progress(sid, marks,subj_id) values(".$id.",".$score.",".$subj_id.")";
        $sql5 = "insert into progress(sid, marks,subj_id) values(".$id.",".$score.",".$subj_id.")";
        if( $query5 = $conn -> query($sql5)){
            $response["progress"] = "Progress updated!";
             
        }
        else{
            $response["progress"] = "Progress not updated";
        }
    }


    $sql6 = "select * from progress where sid=".$id;
    $query6 = $conn -> query($sql6);
    if($query6 ->num_rows >0){
       while($row = $query6 -> fetch_assoc()){
            $previouScore = $row["marks"];
            $response["previouScore"] = $previouScore; 
        }
                    
    }

    echo json_encode($response);  
    

?>