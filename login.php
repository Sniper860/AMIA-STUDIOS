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
    $email = $conn->real_escape_string(trim($_POST['email']));
    $password = $_POST['password']; // Will be verified, not escaped
    
    $response = array();
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = "Invalid email format";
        echo json_encode($response);
        exit;
    }
    
    // Check if user exists and get their data
    $login_query = "SELECT id, full_name, email, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($login_query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, create session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['logged_in'] = true;
            
            $response['success'] = true;
            $response['message'] = "Login successful";
            $response['redirect'] = "dashboard.php";
        } else {
            // Password is incorrect
            $response['success'] = false;
            $response['message'] = "Invalid email or password";
        }
    } else {
        // User not found
        $response['success'] = false;
        $response['message'] = "Invalid email or password";
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