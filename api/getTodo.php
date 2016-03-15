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

$query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE user_id = '$sn_user_id' and login = '$sn_login' ORDER BY todo_id ASC";
$dbc = mysqli_connect('localhost', $bl_username, $bl_password, 'l63832sl_kvark85') or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

$strResponse = "[";
while ($row = mysqli_fetch_array($result)) {
    if( isset($row['todo_id']) ) {
        $strResponse = $strResponse . '{"todo_id": "' . $row['todo_id'] . '", "todo": "' . $row['title'] . '","completed": "' . $row['completed'] . '"},';
    }
}
if (substr($strResponse, -1) == ',' ) {         // если в конце запроса есть ","
    $strResponse = substr($strResponse, 0, -1); // удаляем ее
}
$strResponse = $strResponse . ']';

echo $strResponse;

?>
