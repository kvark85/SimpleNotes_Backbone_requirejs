<?php
session_start();
//Если переменные сессии не установлены, попытка установить их с использованием куки
if(!isset($_SESSION['sn_user_id'])) {
    if(isset($_COOKIE['sn_user_id'])) {
        $_SESSION['sn_user_id'] = $_COOKIE['sn_user_id'];
    }
}
?>
