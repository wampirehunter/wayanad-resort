<?php
// Make sure to install PHPMailer via Composer or download the files.
// composer require phpmailer/phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Path to your Composer autoload.php

// Load configuration from a separate file
require 'config.php';

// Sanitize and validate inputs
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Redirect function
function redirect_with_status($status) {
    header("Location: contact.html?status=" . $status);
    exit();
}

// Check for POST request and honeypot
if ($_SERVER["REQUEST_METHOD"] != "POST" || !empty($_POST['honeypot'])) {
    redirect_with_status("error");
}

$name = sanitize_input($_POST['name']);
$email = filter_var(sanitize_input($_POST['email']), FILTER_VALIDATE_EMAIL);
$phone = sanitize_input($_POST['phone']);
$checkin = sanitize_input($_POST['checkin']);
$checkout = sanitize_input($_POST['checkout']);
$guests = sanitize_input($_POST['guests']);
$message = sanitize_input($_POST['message']);

if (!$name || !$email || !$message) {
    redirect_with_status("error");
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = 0; // Set to 2 for debugging
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;

    // Recipients
    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO_PRIMARY);
    if (!empty(MAIL_TO_SECONDARY)) {
        $mail->addAddress(MAIL_TO_SECONDARY);
    }
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Inquiry - Wayanad Hill Top Holiday Home';
    
    $body = "
    <html>
    <head>
        <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { font-size: 10px; color: #999; margin-top: 20px; }
        </style>
    </head>
    <body>
        <h2>New Inquiry from Website</h2>
        <table>
            <tr>
                <th>Name</th>
                <td>{$name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{$email}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{$phone}</td>
            </tr>
            <tr>
                <th>Check-in Date</th>
                <td>{$checkin}</td>
            </tr>
            <tr>
                <th>Check-out Date</th>
                <td>{$checkout}</td>
            </tr>
            <tr>
                <th>Number of Guests</th>
                <td>{$guests}</td>
            </tr>
            <tr>
                <th>Message</th>
                <td>{$message}</td>
            </tr>
        </table>
        <div class='footer'>
            <p>IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>
            <p>User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "</p>
        </div>
    </body>
    </html>
    ";

    $mail->Body = $body;

    $mail->send();
    redirect_with_status("success");

} catch (Exception $e) {
    error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    redirect_with_status("error");
}

/*
// Fallback mail() version (uncomment and use if SMTP is unavailable)
// You may need to configure your server's php.ini for this to work.
//
// $to = MAIL_TO_PRIMARY . ', ' . MAIL_TO_SECONDARY;
// $subject = 'New Inquiry - Wayanad Hill Top Holiday Home';
// $headers = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\n";
// $headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
// $headers .= "MIME-Version: 1.0\r\n";
// $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
//
// $body = "HTML content here...";
//
// if (mail($to, $subject, $body, $headers)) {
//     redirect_with_status("success");
// } else {
//     redirect_with_status("error");
// }
*/
?>