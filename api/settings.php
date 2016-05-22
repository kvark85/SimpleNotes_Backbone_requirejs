<?php
require_once('startsession.php');
require_once('connectvars.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ($sn_user_id == "") {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$storedParameter = $data['storedParameter'];
$newName = $data['newName'];
$newEmail = $data['newEmail'];
$changePassNew = $data['changePassNew'];
$confirmDelete = $data['confirmDelete'];
$passForDelete = $data['passForDelete'];

switch ($storedParameter) {
    case "name":
        $query = "UPDATE sn_user SET name = '$newName' WHERE user_id = '$sn_user_id'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);
        echo '{
        "success": true,
        "name": "' . $newName . '",
        "storedParameter": "",
        "newName": "",
        "newEmail": "",
        "changePassOld": "",
        "changePassNew": "",
        "confirmChangePassNew": "",
        "confirmDelete": "",
        "passForDelete": "",
        "message": {"type": "success", "textAlert": "Изменение имени прошло успешно. Теперь вы \"' . $newName . '\"."}}';
        break;
    case "email":
        $query = "UPDATE sn_user SET name = '$newName' WHERE user_id = '$sn_user_id'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);
        echo '{
        "success": true,
        "name": "' . $newName . '",
        "storedParameter": "",
        "newName": "",
        "newEmail": "",
        "changePassOld": "",
        "changePassNew": "",
        "confirmChangePassNew": "",
        "confirmDelete": "",
        "passForDelete": "",
        "message": {"type": "success", "textAlert": "Запрос на изменения электронной почты принят, для подтверждения что это действительно ваш злектронный адрес, проверьте почту \"' . $newEmail . '\"."}}';
        break;
        break;
    case "password":
        break;
    case "delete":
        break;
    default:
        $query = "SELECT * FROM sn_user WHERE user_id = '$sn_user_id'";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
        $result = mysqli_query($dbc, $query) or die ('Error on step "mysqli_query"');
        mysqli_close($dbc);

        $rowFromDb = mysqli_fetch_array($result);
        $nameForOutput = ($rowFromDb['name'] != "") ? $rowFromDb['name'] : $rowFromDb['login'];
        $fromSocialNet = (isset($rowFromDb['vk_user_id'])) ? "true" : "false";
        echo '{"name": "' . $nameForOutput . '", "storedParameter": "", "photo_rec": "' . $rowFromDb['photo_rec'] . '", "fromSocialNet": ' . $fromSocialNet . '}';
        exit;
}


?>
