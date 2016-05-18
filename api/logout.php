<?php

require_once('startsession.php');
require_once('connectvars.php');

setcookie('sn_user_id', '', time() - 3600);
unset($_SESSION['sn_user_id']);

header("Location: /#");
exit;

?>
