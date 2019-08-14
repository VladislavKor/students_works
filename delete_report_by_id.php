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

			unlink(strval($row[4]).'.pdf');

			$sql = "DELETE FROM reports WHERE report_id=$report_id";
			if(mysqli_query($dataBase, $sql)){
   				echo "Отчет успешно удален";
			} else {
    			echo "При удалении отчета произошла ошибка.";
			}
		}
	}
	// Close connection
	mysqli_close($dataBase);
?>