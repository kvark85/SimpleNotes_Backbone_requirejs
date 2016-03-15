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


if ( $sn_user_id != "" && $sn_login != "" ) {\

    setcookie('sn_user_id', '', time() - 3600);
    setcookie('sn_login', '', time() - 3600);

    unset($_SESSION['sn_user_id']);
    unset($_SESSION['sn_login']);

    header('Location: http://localhost');
}

?>
