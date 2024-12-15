<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    // Get POST data
    $subject = $_POST['subject'];
    $question = $_POST['questions'];
    $q = explode(",", $question); // Convert questions into an array
    $response = [];

    // Connect to database
    $dblink = mysqli_connect("localhost", "root", "", "webproj");

    // Get the subject ID
    $query = "SELECT id FROM subject WHERE subj_name='" . $subject . "';";
    $result = $dblink->query($query);
    if ($result && $result->num_rows > 0) {
        $row = mysqli_fetch_array($result);
        $id = $row["id"];
        $response['id'] = $id;
    } else {
        echo json_encode(["error" => "Subject not found"]);
        exit;
    }

    // Get the file name from the database
    // Get the file name from the database
    $query2 = "SELECT fname FROM file WHERE subj_id=" . $id . ";";
    $result2 = $dblink->query($query2);
    if ($result2 && $result2->num_rows > 0) {
        $row = mysqli_fetch_array($result2);
        $fname = $row["fname"];
    } else {
        echo json_encode(["error" => "File not found"]);
        exit;
    }
    unlink($fname);
    $query3 = "DELETE FROM file WHERE subj_id=" . $id . ";";
    $result3 = $dblink->query($query3);
    if ($result3) {
        $response['msg'] = "File deleted!";
        echo json_encode($response);
    } else {
        $response['msg'] = "File not deleted!";
        echo json_encode($response);
        exit;
    }

   
    echo json_encode($response);
?>
