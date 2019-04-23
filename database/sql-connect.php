<?php
	$login = 'shcher02';
	$password = '29051983era';
	$db = 'shcher02_db';
			
	define("DB_HOST", "localhost");
	define("DB_LOGIN", $login);
	define("DB_PASSWORD", $password);
	define("DATABASE", $db);
	$link = mysqli_connect(DB_HOST,DB_LOGIN,DB_PASSWORD,DATABASE) or die (mysqli_error());
	mysqli_query($link, "SET NAMES 'utf8'");
	
?>