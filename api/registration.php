<?php
require_once('startsession.php');
require_once('appvars.php');
require_once('connectvars.php');

$needForgot = "0";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$login = $data['login'];
$password = $data['password'];
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$repetPassword = $data['repetPassword'];

$query = "SELECT * FROM sn_user WHERE login = '$login'";
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');

if (mysqli_num_rows($result) != 0) {
    mysqli_close($dbc);
    echo '{"message": {"type": "warning", "textAlert": "Пользователь с таким логином уже зарегистрирован."}}';
    exit;
};

$query = "SELECT * FROM sn_user WHERE email = '$email'";
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');

if (mysqli_num_rows($result) != 0) {
    mysqli_close($dbc);
    echo '{"message": {"type": "warning", "textAlert": "Пользователь с такой электронной почтой уже зарегистрирован."}}';
    exit;
};

$regNum = (string)mt_rand();

//sha('$password'),

if ($name == "") {
    //пользователь не ввел имя
    $query = "INSERT INTO sn_user(login, email, regNum) VALUES ('$login', '$email', '$regNum')";
} else {
    //пользователь ввел и имя
    $query = "INSERT INTO sn_user(login, name, email, regNum) VALUES ('$login', '$name', '$email', '$regNum')";
}

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
if (mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"')) {
    $last_id = mysqli_insert_id($dbc);
}
mysqli_close($dbc);

echo '{"step": 2}';


mail($email,
    "Подтверждения электронного адресса",
    "Если вы действительно хотите зарегистрироваться на сервисе SimpleNotes,\n" .
    "перейдите пожалуйста по ссылке http://" . ADDRESS . "/#registration/$last_id/$regNum/");

//mail("kavrk85@google.com",
//    "Подтверждения электронного адресса",
//    "Если вы действительно хотите зарегистрироваться на сервисе SimpleNotes\n".
//    "(тоесть, для завершения процеса регистрации),\n".
//    "перейдите пожалуйста по ссылке http://" . ADDRESS . "/#registration/$regNum",
//    "From: " . EMAILFROM . " \r\n".
//    "X-Mailer: PHP/" . phpversion());


exit;
?>
