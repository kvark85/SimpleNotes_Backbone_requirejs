<?php
session_start();
//���� ���������� ������ �� �����������, ������� ���������� �� � �������������� ����
if(!isset($_SESSION['sn_user_id'])) {
    if(isset($_COOKIE['sn_user_id'])) {
        $_SESSION['sn_user_id'] = $_COOKIE['sn_user_id'];
    }
}
?>
