<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$response = [];
$target_dir ="files/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

$dblink = mysqli_connect("localhost", "root", "", "webproj");
    

if (isset($_FILES["file"]) && $_FILES["file"]["error"] == UPLOAD_ERR_OK) {
    if($imageFileType != "csv") {
        $response["extn_type"] = "Only CSV files are allowed";
    }
    else{
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $file = fopen($target_file, "r");
        $data = [];
        //  fgetcsv() function parses a line from an open file, checking for CSV fields.
        $headers = fgetcsv($file);    

        while (($row = fgetcsv($file)) !== false) {
            $data[] = $row;
            $question = $row[0];
            $option1 = $row[1];
            $option2 = $row[2];
            $option3 = $row[3];
            $option4 = $row[4];
            $answer = $row[5];

            $sqlValues = "('".$question."','".$option1."','".$option2."','".$option3."','".$option4."','".$answer."')";

            // Use $dblink instead of $db to execute the query
            if(!empty($sqlValues)){
               $query = "INSERT INTO question(question,option1,option2,option3,option4,answer) VALUES". $sqlValues;
                if(mysqli_query($dblink, $query)){
						echo $successmsg="Record inserted successfully";
					 }else{
						echo $errormsg="Database Error";
					 }
            }
        }
        fclose($file);

        $response["status"] = "success";
        $response["data"] = $data;
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to move uploaded file.";
            $response["file"] = $target_file;
        }
    }
    
} else {
    $response["status"] = "error";
    $response["message"] = "No file uploaded or upload error.";
    $response["file"] = $target_file;
}

echo json_encode($response);
?>
