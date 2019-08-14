<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	if (!$dataBase) {
		echo "data base error";
	}
	else 
	{
		$group_num = $_POST['group_num'];

		$result = mysqli_query($dataBase, "SELECT student_id FROM students WHERE  group_num=$group_num");

		$students_id = "";
		while ($row = mysqli_fetch_array($result)) {
			$students_id = $students_id.strval($row[0])."#";
		}
		$nstudents_id = rtrim($students_id,"#");
		echo "$nstudents_id";
	}

	// Close connection
	mysqli_close($dataBase);
?>