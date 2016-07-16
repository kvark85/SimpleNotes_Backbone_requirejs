<?php
require_once('startsession.php');
require_once('appvars.php');
require_once('connectvars.php');
require_once('functions.php');

$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : "";
$first_name = isset($_REQUEST['first_name']) ? $_REQUEST['first_name'] : "";
$photo_rec = isset($_REQUEST['photo_rec']) ? $_REQUEST['photo_rec'] : "";
$hash = isset($_REQUEST['hash']) ? $_REQUEST['hash'] : "";

if ($hash == md5(APIID . $uid . SECRETKEY)) {
    setcookie('sn_user_id', '', time() - 3600); // отчищаем куки
    unset($_SESSION['sn_user_id']); // отчищаем id в сессии

    $query = "SELECT user_id FROM sn_user WHERE vk_user_id = '$uid'";
    $result = sqlAction($query);

    if (mysqli_num_rows($result)) { //пользователь авторизован, просто пересоздадим куки
        $row = mysqli_fetch_array($result);

        $query = "UPDATE sn_user SET name = '$first_name', photo_rec = '$photo_rec' WHERE vk_user_id =  '$uid' LIMIT 1";
        $result = sqlAction($query);

        $_SESSION['sn_user_id'] = $row['user_id'];
        setcookie('sn_user_id', $row['user_id'], time() + (60 * 60 * 24 * 1));
    } else { //добавим запись в таблицу пользователей
        $query = "INSERT INTO sn_user (name, photo_rec, vk_user_id, registration_date) VALUES ('$first_name', '$photo_rec', '$uid', CURDATE())";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        if (mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"')) {
            $last_id = mysqli_insert_id($dbc);
        }
        $_SESSION['sn_user_id'] = $last_id;
        setcookie('sn_user_id', $last_id, time() + (60 * 60 * 24 * 1));
    }

    header("Location: /#");
    exit;
}

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

if ($id == "" && $regNum == "" && $login != "" && $email != "") {
    $query = "SELECT * FROM sn_user WHERE login = '$login'";
    $result = sqlAction($query);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        if (!(isset($row['regNum']) && $row['regNum'] != "")) {
            echo '{"message": {"type": "warning", "textAlert": "Пользователь с таким логином уже зарегистрирован."}}';
            exit;
        }
    }

    $query = "SELECT * FROM sn_user WHERE email = '$email'";
    $result = sqlAction($query);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        if (!(isset($row['regNum']) && $row['regNum'] != "")) {
            echo '{"message": {"type": "warning", "textAlert": "Пользователь с такой электронной почтой уже зарегистрирован."}}';
            exit;
        }
    }

    $query = "SELECT * FROM sn_user WHERE email = '$email'";
    $result = sqlAction($query);
    $regNum = (string)mt_rand();
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        if (isset($row['user_id'])) {
            $user_id = $row['user_id'];
            // если раньше с таким email уже пробловали залогиниться
            if ($name == "") {
                $query = "UPDATE sn_user SET login = '$login', email = '$email', regNum = '$regNum' WHERE user_id = $user_id"; //пользователь не ввел имя
            } else {
                $query = "UPDATE sn_user SET login = '$login', name = '$name', email = '$email', regNum = '$regNum' WHERE user_id = $user_id"; //пользователь ввел и имя
            }
        }
    } else {
        // если с таким email логинятся в первый раз
        if ($name == "") {
            $query = "INSERT INTO sn_user(login, email, regNum) VALUES ('$login', '$email', '$regNum')"; //пользователь не ввел имя
        } else {
            $query = "INSERT INTO sn_user(login, name, email, regNum) VALUES ('$login', '$name', '$email', '$regNum')"; //пользователь ввел и имя
        }
    }

    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    if (mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"')) {
        $last_id = mysqli_insert_id($dbc);
    }

    if(isset($user_id)) {
        $last_id = $user_id;
    }

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
    $resultMail = snMail($email, $subject, $message);
    if ($resultMail == false) {
        echo '{"step": 1, "message": {"type": "warning", "textAlert": "При отправке электронной почты что-то пошло не так."}}';
    } else {
        echo '{"step": 2, "resultMail": ' . $resultMail . ',
            "message": {"type": "success", "textAlert": "Вам будет отправлено электронное письмо, перейдите по ссылке из письма для завершения процеса регистрации."}}';
    }
    exit;
}

if ($id != "" && $regNum != "") {
    $query = "SELECT * FROM sn_user WHERE user_id = $id AND regNum= $regNum";
    $result = sqlAction($query);
    if (mysqli_num_rows($result) != 0) {
        $row = mysqli_fetch_array($result);
        echo '{"id": ' . $row['user_id'] . ', "login": "' . $row['login'] . '", "name": "' . $row['name'] . '",
            "step": 4, "email": "' . $row['email'] . '" , "password": "", "repetPassword": "", "regId": "", "regNum": "",
            "message": {"type": "success", "textAlert": "Регистрация почти закончена, осталось ввести какой вы хотите себе пароль."}}';
    } else {
        echo '{"login": "", "name": "", "step": 3, "email": "", "password": "", "repetPassword": "", "regId": "", "regNum": "", "message": {"type": "warning", "textAlert": "Ошибка при регистрации, если вы хотите пользоваться данным сервисом, перерегистрируйтесь."}}';
    };
    exit;
}

if ($step == 4) {
    $query = "UPDATE sn_user SET regNum = '', password = sha('$password'), registration_date = CURDATE() WHERE user_id  = $id";
    sqlAction($query);
    echo '{"step": 5, "message": {"type": "success", "textAlert": "Регистрация прошла успешно. Залогинтесь и пользуйтесь сервисом с удовольствием."}}';
    exit;
}
?>
