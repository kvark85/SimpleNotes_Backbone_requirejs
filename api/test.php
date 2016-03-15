<?php

$bl_username = 'root';
$bl_password = '';

$sn_user_id = "l63832sl_kvark85";
$sn_login = "zaqwer";
$query = "";
if ( isset($_SERVER['sn_user_id']) || isset($_COOKIE['sn_user_id'])) { $login = $_SERVER['sn_user_id']; } else {  $login = $_COOKIE['sn_user_id']; };
if ( isset($_SERVER['sn_login']) || isset($_COOKIE['sn_login'])) { $login = $_SERVER['sn_login']; } else { $login = $_COOKIE['sn_login']; };

if ( $sn_user_id != "" && $sn_login != "" ) {
    $query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE user_id = '$sn_user_id' and login = '$sn_login' ORDER BY todo_id ASC";
} else {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $login = $data['login'];
    $password = $data['password'];

    $query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE login = '$login' and password = sha('$password') ORDER BY todo_id ASC";
}

$dbc = mysqli_connect('localhost', $bl_username, $bl_password, 'sn_simplenotes') or die ('Error: no connect without NySQL-server');

$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
$userId = mysqli_fetch_array($result)['user_id'];

if(!isset($userId)) {
    mysqli_close($dbc);
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE login = '$login' and password = sha('$password') ORDER BY todo_id ASC";
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

$strResponse = "{\"user_id\": \"'$userId'\", \"login\": \"'$login'\", \"password\": \"'$password'\", \"notes\": [";
while ($row = mysqli_fetch_array($result)) {
    if( isset($row['todo_id']) ) {
        $strResponse = $strResponse . '{"todo_id": "' . $row['todo_id'] . '", "todo": "' . $row['title'] . '","completed": "' . $row['completed'] . '"},';
    }
}
if (substr($strResponse, -1) == ',' ) {         // если в конце запроса есть ","
    $strResponse = substr($strResponse, 0, -1); // удаляем ее
}
$strResponse = $strResponse . ']}';

echo $strResponse;

?>
