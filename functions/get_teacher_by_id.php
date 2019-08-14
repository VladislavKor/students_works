<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$teacher_id = $_POST['teacher_id'];

	$result = mysqli_query($dataBase, "select * from teachers where teacher_id=$teacher_id");

	$row = mysqli_fetch_array($result);

	$data = strval($row[0])."#".strval($row[1])."#".strval($row[2])."#".strval($row[3])."#".strval($row[4])."#".strval($row[5]);

	$uresult = mysqli_query($dataBase, "SELECT login, password FROM users WHERE user_id=$row[6]");

	$urow = mysqli_fetch_array($uresult);

	$data = "$data"."#".strval($urow[0])."#".strval($urow[1]);

	echo "$data";
	// Close connection
	mysqli_close($dataBase);
?>