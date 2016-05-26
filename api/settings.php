<?php
require_once('startsession.php');
require_once('appvars.php');
require_once('connectvars.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ($sn_user_id == "") {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = isset($data['id']) ? $data['id'] : "";
$storedParameter = isset($data['storedParameter']) ? $data['storedParameter'] : "";
$newName = isset($data['newName']) ? $data['newName'] : "";
$newEmail = isset($data['newEmail']) ? $data['newEmail'] : "";
$changePassOldl = isset($data['changePassOld']) ? $data['changePassOld'] : "";
$changePassNew = isset($data['changePassNew']) ? $data['changePassNew'] : "";
$confirmDelete = isset($data['confirmDelete']) ? $data['confirmDelete'] : "";
$passForDelete = isset($data['passForDelete']) ? $data['passForDelete'] : "";
$emailNum = isset($data['emailNum']) ? $data['emailNum'] : "";

if ($id != "" && $emailNum != "") {
    $query = "SELECT * FROM sn_user WHERE user_id = $id AND emailNum= $emailNum";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
    mysqli_close($dbc);
    if (mysqli_num_rows($result) != 0) {
        $row = mysqli_fetch_array($result);

        $query = "UPDATE sn_user SET email = '" . $row['new_email'] . "', new_email = '', emailNum = '0' WHERE user_id = " . $id;
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);

        $_SESSION['sn_user_id'] = $id;
        echo '{"storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $row['name'] . '", "email": "' . $row['new_email'] . '", "newName": "",
                "newEmail": "", "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "", "fromSocialNet": false,
                "message": {"type": "success", "textAlert": "Электронная почта успешно изменена. В текущий момент к анкете привязан E-mail \"' . $row['new_email'] . '\"."}}';
        exit;
    };
}

$query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id'";
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
$result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
mysqli_close($dbc);

$firstRowFromDb = mysqli_fetch_array($result);
$nameForOutput = ($firstRowFromDb['name'] != "") ? $firstRowFromDb['name'] : $firstRowFromDb['login'];
$fromSocialNet = (isset($firstRowFromDb['vk_user_id'])) ? "true" : "false";
$finishString = '{"name": "' . $firstRowFromDb['name'] . '", "email": "' . $firstRowFromDb['email'] . '", "storedParameter": "", "photo_rec": "' . $firstRowFromDb['photo_rec'] . '", "fromSocialNet": ' . $fromSocialNet . '}';

switch ($storedParameter) {
    case "name":
        $query = "UPDATE sn_user SET name = '$newName' WHERE user_id = '$sn_user_id'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);
        echo '{
        "storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $newName . '", "newName": "", "newEmail": "",
        "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "",
        "message": {"type": "success", "textAlert": "Изменение имени прошло успешно. Теперь вы \"' . $newName . '\"."}}';
        break;
    case "email":
        $emailNum = (string)mt_rand();

        $query = "SELECT * FROM sn_user WHERE email = '$newEmail'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        if (mysqli_num_rows($result) != 0) {
            echo '{
                "storedParameter": "' . $storedParameter . '", "success": false, "name": "' . $firstRowFromDb['name'] . '", "newName": "",
                "newEmail": "", "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "",
                "message": {"type": "warning", "textAlert": "Данный электронный адресс уже зарегистрирован в системе."}}';
        }


        $query = "UPDATE sn_user SET new_email = '$newEmail', emailNum = '$emailNum' WHERE user_id = '$sn_user_id'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);

        $subject = "Запрос на смену E-mail на сервисе SimpleNotes";
        $message = "
            <html>
                <head>
                 <title>Подтверждение смены E-mail</title>
                </head>
                <body>
                  Если вы действительно хотите изменить E-mail на на сервисе SimpleNotes,<br />
                  перейдите пожалуйста по ссылке
                  <a href=\"http://" . ADDRESS . "/#!/settings/$sn_user_id/$emailNum\">
                    " . ADDRESS . "/#!/settings/$sn_user_id/$emailNum
                  </a>
                </body>
            </html>
            ";
        $headers = "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=utf-8-1" . "\r\n";
        $resultMail = mail($newEmail, $subject, $message, $headers);
        if ($resultMail == false) {
            echo '{
                "storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $firstRowFromDb['name'] . '", "newName": "",
                "newEmail": "' . $newEmail . '", "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "",
                "message": {"type": "warning", "textAlert": "При отправке электронной почты, для подтверждения нового Email, что-то пошло не так."}}';
        } else {
            echo '{
                "storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $firstRowFromDb['name'] . '", "newName": "",
                "newEmail": "", "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "",
                "message": {"type": "success", "textAlert": "Запрос на изменения электронной почты принят, для подтверждения что это действительно ваш злектронный адрес будет оптравлено письмо. Проверьте почту \"' . $newEmail . '\"."}}';
            break;
        }
    case "password":
        $query = "SELECT password FROM sn_user WHERE user_id = $sn_user_id";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        $row = mysqli_fetch_array($result);

        if (sha1($changePassOldl) == $row['password']) {
            $query = "UPDATE sn_user SET password = sha('$changePassNew') WHERE user_id  = $sn_user_id";
            $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
            $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
            mysqli_close($dbc);
            echo '{
                "storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $firstRowFromDb['name'] . '", "newName": "",
                "newEmail": "", "changePassOld": "", "changePassNew": "", "confirmChangePassNew": "", "confirmDelete": "", "passForDelete": "",
                "message": {"type": "success", "textAlert": "Пароль изменен."}}';
        } else {
            echo '{
                "storedParameter": "' . $storedParameter . '", "success": true, "name": "' . $firstRowFromDb['name'] . '", "newName": "",
                "newEmail": "", "changePassOld": "' . $changePassOldl . '", "changePassNew": "' . $changePassNew . '", "confirmChangePassNew": "' . $changePassNew . '", "confirmDelete": "", "passForDelete": "",
                "message": {"type": "warning", "textAlert": "Вы неправильно ввели старый пароль."}}';
        }


        break;
    case "delete":
        break;
    default:
        echo $finishString;
        exit;
}
?>
