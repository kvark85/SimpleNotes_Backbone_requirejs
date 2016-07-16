<?php
require_once('startsession.php');
require_once('connectvars.php');
require_once('functions.php');

$sn_user_id = isset($_SESSION['sn_user_id']) ? $_SESSION['sn_user_id'] : "";

if ( $sn_user_id == "" ) {
    header('HTTP/1.0 401 Unauthorized');
    exit;
}

$requestUri = $_SERVER['REQUEST_URI'];

// ----- 1 Изменить состояние одной заметки Start ----------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] == "PUT" && preg_match( "/\d+$/", $requestUri, $matches ))
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $todo = $data['todo'];
    $completed = ($data['completed'] == true) ? 'true' : 'false';
    $intCompleted = ($completed == 'true') ? '1' : '0';
    $idFromUrl = $matches[0];

    $query = "UPDATE sn_todo SET title = '$todo',completed = '$intCompleted' WHERE todo_id = $idFromUrl";
    $result = sqlAction($query);

    echo '{"id": "' . $idFromUrl . '", "todo": "' . $todo . '","completed": ' . $completed . '}';
    exit;
// ----- 2 Удалить заметку Start ---------------------------------------------------------------------------------------
} else if ($_SERVER['REQUEST_METHOD'] == "DELETE" && preg_match( "/\d+$/", $requestUri, $matches ))
{
    $idFromUrl = $matches[0];

    $query = "DELETE FROM sn_todo  WHERE todo_id = $idFromUrl";
    $result = sqlAction($query);

    echo '{"id": "", "todo": "","completed": ""}';
    exit;
// ----- 3 Сохранить одну заметку Start --------------------------------------------------------------------------------
} else if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $todo = $data['todo'];

    $query = "INSERT INTO sn_todo(user_id, title) VALUES ('$sn_user_id', '$todo')";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ('Error: no connect without NySQL-server');
    if (mysqli_query ($dbc, $query) or die ('Error on step "mysqli_query"')) {
        $last_id = mysqli_insert_id($dbc);
    }

    echo '{"id": "' . $last_id . '", "todo": "' . $todo . '","completed": false}';
    exit;
// ----- 4 Получить коллекцию заметок Start ----------------------------------------------------------------------------
} else if ($_SERVER['REQUEST_METHOD'] == "GET")
{
    $query = "SELECT * FROM sn_user LEFT OUTER JOIN sn_todo using(user_id) WHERE user_id = '$sn_user_id' ORDER BY todo_id ASC";
    $result = sqlAction($query);

    $strResponse = "[";
    while ($row = mysqli_fetch_array($result)) {
        if (isset($row['todo_id'])) {
            $boolCompleted = ($row['completed'] == 1) ? "true" : "false";
            $strResponse = $strResponse . '{"id": "' . $row['todo_id'] . '", "todo": "' . $row['title'] . '","completed": ' . $boolCompleted . '},';
        }
    }
    if (substr($strResponse, -1) == ',') { //если в конце запроса есть ","
        $strResponse = substr($strResponse, 0, -1); //удаляем ее
    }
    $strResponse = $strResponse . ']';

    echo $strResponse;
    exit;
}
?>
