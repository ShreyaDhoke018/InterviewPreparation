<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$response = [];
$dblink = mysqli_connect("localhost", "root", "", "webproj");
$subj_name = "";
$subj_img = "";
$subj_des = "";


$sql = "select subj_name, subj_image, subj_des from subject";
$result = $dblink -> query($sql);
if($result -> num_rows > 0){
    while($row = mysqli_fetch_array($result))
    {
        $subj_data = [
                    "subj_name" => $row["subj_name"],
                    "subj_img" => $row['subj_image'],
                    "subj_des" => $row['subj_des']
                ];
        $response['subj_data'][] = $subj_data;   
        // $subj_name = $row["subj_name"];
        // $subj_img = $row['subj_image'];
        // $subj_des = $row['subj_des'];
        // $response['subj_name'][] = $subj_name;
        // $response['subj_img'][] = $subj_img;
        // $response['subj_des'][] = $subj_des;
        
    }
    
}
echo json_encode($response);
?>