<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$subject = $_POST['subject'];
$image = $_FILES["subjImg"]["name"];
$subj_des = $_POST['subjDes'];
$ext = $_POST['ext'];
$response = [];
$target_dir ="D:/WebTechProj/FrontEnd_React/src/assets/images/";
$target_file = $target_dir . basename($_FILES["subjImg"]["name"]);
// $oldFname = basename($subject . "_pic.".$ext);
// $oldFilePath = $target_dir . $oldFname;

$dblink = mysqli_connect("localhost", "root", "", "webproj");


if (file_exists($target_file)) {
    if (move_uploaded_file($_FILES["subjImg"]["tmp_name"], $target_file)) {
        $sql = "UPDATE subject SET subj_image = '$target_file' WHERE subj_name = '$subject'";
        $response['msg'] = mysqli_query($dblink, $sql) ? "Subject updated!" : "Failed to update subject.";
    } else {
        $response["msg"] = "Failed to upload file.";
    }
} else {
    if (move_uploaded_file($_FILES["subjImg"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO subject (subj_name, subj_image, subj_des) VALUES ('".$subject."', '".$target_file."', '".$subj_des."')";
        $response['msg'] = mysqli_query($dblink, $sql) ? "Subject created!" : "Failed to create subject.";
    } else {
        $response["msg"] = "Failed to upload file.";
    }
}

echo json_encode($response);


?>