<?php
	$query = "SELECT * FROM `production`";
	$data = mysqli_query($link, $query);
	for($all_prod = array(); $row = mysqli_fetch_assoc($data); $all_prod[] = $row);
	shuffle($all_prod);
?>