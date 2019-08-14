<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$student_id = $_POST['student_id'];

	$counter = mysqli_fetch_array(mysqli_query($dataBase, "select count(*) from reports where student_id=$student_id"));

		if ($counter[0] == 0) {
			echo "У студента еще нету отчетов.";
		}
		else
		{
			$sql = "SELECT * FROM reports WHERE student_id=$student_id";

			$result = mysqli_query($dataBase, $sql);

			$data = "";

			while ($row = mysqli_fetch_assoc($result)) 
			{
				$data = "$data".strval($row['report_id'])."#".strval($row['student_id'])."#".strval($row['subject_id'])."#".strval($row['link)'])."/";
			}

			echo "$data";
		}
	// Close connection
	mysqli_close($dataBase);
?>