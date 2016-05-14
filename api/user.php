<?php
require_once('startsession.php');
require_once('connectvars.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$needLogout = isset($data['needLogout']) ? $data['needLogout'] : false;

// ----- Logout -----
if ( $needLogout == true ) {
    setcookie('sn_user_id', '', time() - 3600);
    unset($_SESSION['sn_user_id']);
    exit;
}

if ( $sn_user_id == "" ) {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

//$query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE user_id = '$sn_user_id' ORDER BY todo_id ASC";
$query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id'";
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

$rowFromDb = mysqli_fetch_array($result);
$nameForOutput = ($rowFromDb['name'] != "") ? $rowFromDb['name'] : $rowFromDb['login'];
$strResponse = '{"name": "' . $nameForOutput . '", "photo_rec": "' . $rowFromDb['photo_rec'] . '"}';

echo $strResponse;
exit;
?>
