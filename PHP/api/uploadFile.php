<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$fname = $_FILES["file"]["name"];
$subject = $_POST['subject'];
$response = [];

$data = [];
$target_dir ="files/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$dblink = mysqli_connect("localhost", "root", "", "webproj");
$oldFname = basename($subject . "_data.csv");
$oldFilePath = $target_dir . $oldFname;

if(isset($fname)){
    if(!file_exists($oldFilePath)){
        $target_file = $oldFilePath;
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                $response["msg"] = "File uploaded successfully with the name: " . $oldFname;
                $response["file"] = $oldFname; // Return the new file name

                $query = "select id from subject where subj_name='".$subject."';";
                $result = $dblink->query($query);
                if($result -> num_rows > 0){
                    while($row = mysqli_fetch_array($result))
                    {
                        $id = $row["id"];
                    }
                }
                $query2 = "insert into file(fname, subj_id) values ('".$target_file."','".$id."');";
                $result2 = $dblink -> query($query2);
                if($result2 -> num_rows >0){
                    $response["success"] = "File uploaded!";
                }else{
                    $response["success"] = "File not uploaded!";
                }

        } else {
           $response["success"] = "File not uploaded!";
        }
    
    }
    else{
        if(move_uploaded_file($_FILES['file']['tmp_name'], $target_file)){
            $response["msg"] = "hello";
            $file = fopen($target_file, "r");
            $file2 = fopen($oldFilePath, "a");
            $file3 = fopen($oldFilePath, "r");

            $existing_data = [];
            $headers_file = fgets($file);
            while(($line = fgets($file3))!== false){
                $existing_data[] = trim($line);
                // echo $existing_data;
            }

            while (!feof($file)) {
                $line = fgets($file);
                if ($line !== false) { // Ensure line is valid
                    $line = trim($line);
                    if(!in_array($line,$existing_data)){
                        //$data = $line; // Store the current line
                        fwrite($file2, $line. PHP_EOL);
                    }else{
                        continue;
                    }
                }   
            }
            

            // while (($row = fgetcsv($file)) !== false) {
            //         $question = $row[0];
            //         $option1 = $row[1];
            //         $option2 = $row[2];
            //         $option3 = $row[3];
            //         $option4 = $row[4];
            //         $answer = $row[5];
            // }
            fclose($file);
            fclose($file2);
            $response["success"] = "File uploaded!";
            $response["status"] = "success";
            $response["data"] = $data;
        }

         unlink($target_file);   
    }
}else {
    $response["status"] = "error";
    $response["success"] = "File not uploaded!";
    $response["file"] = $target_file;
}

echo json_encode($response);


?>