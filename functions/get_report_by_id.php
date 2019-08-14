<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$report_id = $_POST['report_id'];

	if (strval($report_id) == "") {
		echo "Ошибка: отчета с таким номером не существует.";
	}
	else
	{
		$counter = mysqli_fetch_array(mysqli_query($dataBase, "select count(*) from reports where report_id=$report_id"));

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
	}
	// Close connection
	mysqli_close($dataBase);
?>