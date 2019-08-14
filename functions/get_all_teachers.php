<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	

	$sql = "SELECT * FROM teachers";

	$result = mysqli_query($dataBase, $sql);

	$data = "";

	while ($row = mysqli_fetch_assoc($result)) 
	{
		$data = "$data".strval($row['teacher_id'])."#".strval($row['surname'])."#".strval($row['name'])."#".strval($row['patronymic'])."/";
	}

	echo "$data";

	// Close connection
	mysqli_close($dataBase);
?>