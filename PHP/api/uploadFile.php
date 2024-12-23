<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$fname = $_FILES["file"]["name"];
$subject = $_POST['subject'];
$response = [];
$headers = "Question,Option1,Option2,Option3,Option4,Answer";
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

                $file = fopen($target_file, "r");
                $headers_file = fgets($file);
                
                $headers_file = trim($headers_file, "\r\n");

                $response['headers'] = $headers_file;
                $response['headers2'] = $headers;
                if($headers_file != $headers){
                    $response['msg'] = "Column name doesnt match!Please enter the column Names as mentioned!";
                    unlink($target_file);
                }
                else{
                    $query = "select id from subject where subj_name='".$subject."';";
                    $result = $dblink->query($query);
                    if($result -> num_rows > 0){
                        while($row = mysqli_fetch_array($result))
                        {
                            $id = $row["id"];
                        }
                    }
                    $query2 = "insert into file(fname, subj_id) values ('".$target_file."','".$id."');";
                    
                    if($result2 = $dblink -> query($query2)){
                        $response["msg"] = "File uploaded!";
                    }else{
                        $response["msg"] = "File not uploaded!";
                    }
                    fclose($file);
                }
            
                

        } else {
           $response["msg"] = "File not uploaded!";
        }
    
    }
    else{
        if(move_uploaded_file($_FILES['file']['tmp_name'], $target_file)){
            $file = fopen($target_file, "r");
            $file2 = fopen($oldFilePath, "a");
            $file3 = fopen($oldFilePath, "r");

            $existing_data = [];
            $headers_file = fgets($file);
            $headers_file = trim($headers_file, "\r\n");
            $response['headers'] = $headers_file;
            if($headers_file != $headers){
                    $response['msg'] = "Column name doesnt match!Please enter the column Names as mentioned!";
                    unlink($target_file);
            }
            else{
                 while(($line = fgets($file3))!== false){
                    $existing_data[] = trim($line);
                    $response['existing_data'] = $existing_data;
                    // echo $existing_data;
                }
            
                while (!feof($file)) {
                    $line = fgets($file);
                    if ($line !== false) { // Ensure line is valid
                        $line = trim($line);
                        $response['line'] = $line;
                        if(!in_array($line,$existing_data)){
                            //$data = $line; // Store the current line
                            fwrite($file2, $line. PHP_EOL);
                        }else{
                            continue;
                        }
                    }   
                }
                $response["msg"] = "File uploaded!";
                fclose($file);
                fclose($file2);
                unlink($target_file); 
            }
           
            
            
            
        }

           
    }
}else {
    $response["msg"] = "error";
}

echo json_encode($response);


?>