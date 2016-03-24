<?php
require_once('appvars.php');
require_once('startsession.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ( $sn_user_id != "" ) {
    setcookie('sn_user_id', '', time() - 3600);
    unset($_SESSION['sn_user_id']);
}

header('Location: http://' . ADDRESS);
?>
