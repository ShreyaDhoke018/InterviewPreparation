<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$subject = $_POST['subject'];
$id = "";
$response = [];
$response["debug"] = "Subject: " . $subject;


$dblink = mysqli_connect("localhost", "root", "", "webproj");
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
    while($row = mysqli_fetch_array($result2)){
        $filePath = $row["fname"];
        $response["fname"] = $row["fname"];
        if (file_exists($filePath)) {
            $response["success"] = true;
            $response["fileContent"] = file_get_contents($filePath);
            $response["fileName"] = basename($filePath);
        } else {
            $response["success"] = false;
            $response["message"] = "File not found on server.";
        }
    }
}


echo json_encode($response);


?>