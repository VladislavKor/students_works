<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$student_id = $_POST['student_id'];
	$subject_id = $_POST['subject_id'];


	$student_count = mysqli_fetch_array(mysqli_query($dataBase, "select count(*) from students where student_id=$student_id"));
	$subject_id = mysqli_fetch_array(mysqli_query($dataBase, "select count(*) from subjects where subject_id=$subject_id"));

	if ($student_count[0] == 0 && $subject_id[0] == 0 ) 
	{
		echo "Отчетов таких студентов или по таким предметам нету";
	}


	/*$counter = mysqli_fetch_array(mysqli_query($dataBase, "select count(*) from reports where report_id=$report_id"));

	if ($counter[0] == 0) {
		echo "Ошибка: отчета с таким номером не существует.";
	}
	else
	{
		$result = mysqli_query($dataBase, "select * from reports where report_id=$report_id");

		$row = mysqli_fetch_array($result);

		$data = strval($row[0])."#".strval($row[1])."#".strval($row[2])."#".strval($row[4]);
	
		echo "$data";
	}
*/


	// Close connection
	mysqli_close($dataBase);
?>