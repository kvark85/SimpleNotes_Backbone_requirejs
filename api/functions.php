<?php
function snMail($email, $subject, $message)
{
    $headers = "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=utf-8-1" . "\r\n";
    return mail($email, $subject, $message, $headers);
}

function sqlAaction($query)
{
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without MySQL-server');
    $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    mysqli_close($dbc);
    return $result;
}

?>
