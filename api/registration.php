<?php
require_once('startsession.php');
require_once('appvars.php');
require_once('connectvars.php');

$needForgot = "0";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = isset($data['id']) ? $data['id'] : "";
$login = isset($data['login']) ? $data['login'] : "";
$name = isset($data['name']) ? $data['name'] : "";
$step = isset($data['step']) ? $data['step'] : "";
$email = isset($data['email']) ? $data['email'] : "";
$password = isset($data['password']) ? $data['password'] : "";
$repetPassword = isset($data['repetPassword']) ? $data['repetPassword'] : "";
$regNum = isset($data['regNum']) ? $data['regNum'] : "";

if ($id == "" && $regNum == "") {
    $query = "SELECT * FROM sn_user WHERE login = '$login'";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    if (mysqli_num_rows($result) != 0 && mysqli_fetch_array($result)['regNum'] == "") {
        mysqli_close($dbc);
        echo '{"message": {"type": "warning", "textAlert": "Пользователь с таким логином уже зарегистрирован."}}';
        exit;
    };

    $query = "SELECT * FROM sn_user WHERE email = '$email'";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    if (mysqli_num_rows($result) != 0 && mysqli_fetch_array($result)['regNum'] == "") {
        mysqli_close($dbc);
        echo '{"message": {"type": "warning", "textAlert": "Пользователь с такой электронной почтой уже зарегистрирован."}}';
        exit;
    };

    $regNum = (string)mt_rand();
    if ($name == "") {
        $query = "INSERT INTO sn_user(login, email, regNum) VALUES ('$login', '$email', '$regNum')"; //пользователь не ввел имя
    } else {
        $query = "INSERT INTO sn_user(login, name, email, regNum) VALUES ('$login', '$name', '$email', '$regNum')"; //пользователь ввел и имя
    }
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    if (mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"')) {
        $last_id = mysqli_insert_id($dbc);
    }
    mysqli_close($dbc);

    echo '{"step": 2}';

    $subject = "Подтверждения электронного адресса на сервисе SimpleNotes";
    $message = "
        <html>
            <head>
             <title>Подтверждения электронного адресса</title>
            </head>
            <body>
              Если вы действительно хотите зарегистрироваться на сервисе SimpleNotes,<br />
              перейдите пожалуйста по ссылке
              <a href=\"http://" . ADDRESS . "/#!/registration/$last_id/$regNum\">
                " . ADDRESS . "/#!/registration/$last_id/$regNum
              </a>
            </body>
        </html>
    ";
    $headers = "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=utf-8-1" . "\r\n";
    mail($email, $subject, $message, $headers);
    exit;
}

if ($id != "" && $regNum != "") {
    $query = "SELECT * FROM sn_user WHERE user_id = $id AND regNum= $regNum";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    mysqli_close($dbc);
    if (mysqli_num_rows($result) != 0) {
        $row = mysqli_fetch_array($result);
        echo '{"id": ' . $row['user_id'] . ', "login": "' . $row['login'] . '", "name": "' . $row['name'] . '", "step": 4, "email": "' . $row['email'] . '" , "password": "", "repetPassword": "", "regId": "", "regNum": ""}';
    } else {
        echo '{"login": "", "name": "", "step": 3, "email": "", "password": "", "repetPassword": "", "regId": "", "regNum": "", "message": {"type": "warning", "textAlert": "Ошибка при регистрации, если вы хотите пользоваться данным сервисом, перерегистрируйтесь."}}';
    };
    exit;
}

if ($step == 4) {
    $query = "UPDATE sn_user SET regNum = '', password = sha('$password') WHERE user_id  = $id";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    mysqli_close($dbc);
    echo '{"step": 5}';
    exit;
}
?>
