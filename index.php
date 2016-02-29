<?php
	define('SERVER_ROOT', dirname(_FILE_));
	/*define('SITE_ROOT', 'http://www.rookiewan.wang/vacationGo');*/
	define('SITE_ROOT', 'http://localhost/webProject/');
	define('CSS_URL',SITE_ROOT.'css/');
	define('IMG_URL',SITE_ROOT.'img/');
	define('JS_URL',SITE_ROOT.'js/');
	require_once(SERVER_ROOT.'/controller/'.'router.php');
?>