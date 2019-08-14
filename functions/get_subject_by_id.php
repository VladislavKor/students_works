<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$subject_id = $_POST['subject_id'];

	$result = mysqli_query($dataBase, "select * from subjects where subject_id=$subject_id");

	$row = mysqli_fetch_array($result);

	$data = strval($row[0])."#".strval($row[1]);
	
	echo "$data";
?>