<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_num = $_POST['group_num'];

	$sql = "SELECT * FROM schedule WHERE group_num=$group_num";

	$result = mysqli_query($dataBase, $sql);

	$data = "";

	while ($row = mysqli_fetch_assoc($result)) 
	{
		$data = "$data".strval($row['group_num'])."#".strval($row['subject_id'])."#".strval($row['teacher_id'])."/";
	}

	echo "$data";

	// Close connection
	mysqli_close($dataBase);
?>