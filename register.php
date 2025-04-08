<?php
// Include database connection
require_once 'connection.php';

// Start session
session_start();

// Set response header to JSON
header('Content-Type: application/json');

// Check if form is submitted via POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $full_name = $conn->real_escape_string(trim($_POST['full_name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $password = $_POST['password']; // Will be hashed, not escaped
    
    $response = array();
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = "Invalid email format";
        echo json_encode($response);
        exit;
    }
    
    // Validate password (minimum 8 characters with at least one letter and one number)
    if (strlen($password) < 8 || !preg_match('/[A-Za-z]/', $password) || !preg_match('/[0-9]/', $password)) {
        $response['success'] = false;
        $response['message'] = "Password must be at least 8 characters long and contain both letters and numbers";
        echo json_encode($response);
        exit;
    }
    
    // Check if email already exists
    $check_email = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($check_email);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = "Email already registered";
        echo json_encode($response);
        $stmt->close();
        exit;
    }
    $stmt->close();
    
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $insert_query = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param("sss", $full_name, $email, $hashed_password);
    
    if ($stmt->execute()) {
        // Get the new user's ID
        $user_id = $stmt->insert_id;
        
        // Create session for the user
        $_SESSION['user_id'] = $user_id;
        $_SESSION['full_name'] = $full_name;
        $_SESSION['email'] = $email;
        $_SESSION['logged_in'] = true;
        
        $response['success'] = true;
        $response['message'] = "Registration successful";
        $response['redirect'] = "dashboard.php";
    } else {
        $response['success'] = false;
        $response['message'] = "Registration failed: " . $stmt->error;
    }
    
    $stmt->close();
    
    echo json_encode($response);
} else {
    // Not a POST request
    $response['success'] = false;
    $response['message'] = "Invalid request method";
    echo json_encode($response);
}

$conn->close();
?>