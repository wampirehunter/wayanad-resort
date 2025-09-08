<?php
define('SMTP_HOST', 'smtp.gmail.com');      // e.g., 'smtp.gmail.com'
define('SMTP_PORT', 587);                   // 587 for TLS, 465 for SSL
define('SMTP_USER', 'your-email@gmail.com'); // Your SMTP username
define('SMTP_PASS', 'your-app-password');   // Your SMTP password or app password
define('SMTP_SECURE', 'tls');               // 'ssl' or 'tls'

define('MAIL_TO_PRIMARY', 'info@wayanadhiltop.com');
define('MAIL_TO_SECONDARY', 'booking@wayanadhiltop.com');
define('MAIL_FROM', 'noreply@wayanadhiltop.com'); // This should be your verified domain email
define('MAIL_FROM_NAME', 'Wayanad Hilltop Inquiry');
?>