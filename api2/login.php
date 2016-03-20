<?php
//Открытие сессии
require_once('startsession.php');

//Загрузка переменных для коннекта с базой данных
require_once('connectvars.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ( $sn_user_id != "" ) {
    $query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id'";
} else {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $sn_login = $data['login'];
    $password = $data['password'];

    $query = "SELECT * FROM sn_user WHERE login = '$sn_login' and password = sha('$password')";
}

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without MySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

if( mysqli_num_rows($result) == 1 ) {
    $_SESSION['sn_user_id'] = mysqli_fetch_array($result)['user_id'];
    setcookie('sn_user_id', $_SESSION['sn_user_id'], time() + (60*60*24));
    echo '{"acces": "Ok"}';
} else {
    header('HTTP/1.0 401 Unauthorized');
}
exit;
?>
