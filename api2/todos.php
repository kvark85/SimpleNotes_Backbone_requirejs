<?php

//Открытие сессии
require_once('startsession.php');

//Загрузка переменных для коннекта с базой данных
require_once('connectvars.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ( $sn_user_id == "" ) {
    header('HTTP/1.0 401 Unauthorized');
}

$query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE user_id = '$sn_user_id' ORDER BY todo_id ASC";
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
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
