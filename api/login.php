<?php

session_start();

$bl_username = 'l63832sl_kvark85';
$bl_password = 'zaqwer';

$sn_user_id = "";
$sn_login = "";

if ( isset($_SESSION['sn_user_id']) ) {
    $sn_user_id = $_SESSION['sn_user_id'];
} else if( isset($_COOKIE['sn_user_id']) ) {
    $sn_user_id = $_COOKIE['sn_user_id'];
};

if ( isset($_SESSION['sn_login']) ) {
    $sn_login = $_SESSION['sn_login'];
} else if( isset($_COOKIE['sn_login']) ) {
    $sn_login = $_COOKIE['sn_login'];
};


if ( $sn_user_id != "" && $sn_login != "" ) {
    $query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id' and login = '$sn_login'";
} else {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $sn_login = $data['login'];
    $password = $data['password'];

    $query = "SELECT * FROM sn_user WHERE login = '$sn_login' and password = sha('$password')";
}

$dbc = mysqli_connect('localhost', $bl_username, $bl_password, 'l63832sl_kvark85') or die ('Error: no connect without MySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

if( mysqli_num_rows($result) == 1 ) {
    $_SESSION['sn_user_id'] = mysqli_fetch_array($result)['user_id'];
    $_SESSION['sn_login'] = $sn_login;
    setcookie('sn_user_id', $_SESSION['sn_user_id'], time() + (60*60*24));
    setcookie('sn_login', $sn_login, time() + (60*60*24));
    echo '{"acces": "Ok"}';
} else {
    header('HTTP/1.0 401 Unauthorized');
}
exit;

?>
