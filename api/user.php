<?php
require_once('startsession.php');
require_once('connectvars.php');
require_once('functions.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ( $sn_user_id == "" ) {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id'";
$result = sqlAction($query);

$rowFromDb = mysqli_fetch_array($result);
$nameForOutput = ($rowFromDb['name'] != "") ? $rowFromDb['name'] : $rowFromDb['login'];
$fromSocialNet = (isset($rowFromDb['vk_user_id'])) ? "true" : "false";
$strResponse = '{"name": "' . $nameForOutput . '", "photo_rec": "' . $rowFromDb['photo_rec'] . '", "fromSocialNet": ' . $fromSocialNet . '}';

echo $strResponse;
exit;
?>
