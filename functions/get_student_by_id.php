<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$student_id = $_POST['student_id'];

	$result = mysqli_query($dataBase, "SELECT * FROM students WHERE student_id=$student_id");

	$row = mysqli_fetch_array($result);

	$data = strval($row[0])."#".strval($row[1])."#".strval($row[2])."#".strval($row[3])."#".strval($row[4])."#".strval($row[5]);

	$uresult = mysqli_query($dataBase, "SELECT login, password FROM users WHERE user_id=$row[7]");

	$urow = mysqli_fetch_array($uresult);

	$data = "$data"."#".strval($urow[0])."#".strval($urow[1])."#".strval($row[6]);

	echo "$data";
	// Close connection
	mysqli_close($dataBase);
?>