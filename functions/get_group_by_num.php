<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_number = $_POST['group_num'];

	$result = mysqli_query($dataBase, "select * from groups where group_num=$group_number");

	$row = mysqli_fetch_array($result);

	$data = strval($row[0])."#".strval($row[1])."#".strval($row[2])."#".strval($row[3]);
	
	echo "$data";
?>