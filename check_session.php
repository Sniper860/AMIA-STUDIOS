<?php
// Start session
session_start();

// Set response header to JSON
header('Content-Type: application/json');

$response = array();

// Check if user is logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    $response['logged_in'] = true;
    $response['user'] = array(
        'id' => $_SESSION['user_id'],
        'full_name' => $_SESSION['full_name'],
        'email' => $_SESSION['email']
    );
} else {
    $response['logged_in'] = false;
}

echo json_encode($response);
?>