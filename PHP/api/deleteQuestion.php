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
    } else {
        echo json_encode(["error" => "Subject not found"]);
        exit;
    }

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

    // Open the CSV file for reading
    $file = fopen($fname, "r");
    if (!$file) {
        echo json_encode(["error" => "Unable to open file"]);
        exit;
    }

    // Read and filter the data from CSV file
    $question_data = []; // To store updated questions
    $headers = fgetcsv($file); // Read the headers
    if ($headers === false) {
        echo json_encode(["error" => "No headers found in the file"]);
        fclose($file);
        exit;
    }

    while (($row = fgetcsv($file)) !== false) {
        $questionId = $row[0];

        // If question ID is not in the list, keep it in the question_data array
        if (!in_array($questionId, $q)) {
            $question_data[] = [
                "question" => $row[0],
                "option1" => $row[1],
                "option2" => $row[2],
                "option3" => $row[3],
                "option4" => $row[4],
                "answer"  => $row[5]
            ];
        }
    }

    fclose($file);

    //  **Write the updated data to the CSV file**
    $file2 = fopen($fname, "w");
    if (!$file2) {
        echo json_encode(["error" => "Unable to create or write to file"]);
        exit;
    }

    //  **Write the CSV headers**
    fputcsv($file2, ['question', 'option1', 'option2', 'option3', 'option4', 'answer']);

    // **Write each row from question_data**
    foreach ($question_data as $row) {
        fputcsv($file2, array_values($row)); // Convert associative array to a simple array of values
    }

    fclose($file2);

    $response['questions'] = $question_data;
    echo json_encode($response);
?>
