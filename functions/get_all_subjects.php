<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$sql = "SELECT * FROM subjects";

	$result = mysqli_query($dataBase, $sql);

	$data = "";

	while ($row = mysqli_fetch_assoc($result)) 
	{
		$data = "$data".strval($row['subject_id'])."#".strval($row['subject_name'])."/";
	}

	echo "$data";

	// Close connection
	mysqli_close($dataBase);
?>