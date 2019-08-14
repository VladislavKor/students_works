<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	if (!$dataBase) {
		echo "data base error";
	}
	else {
		$result = mysqli_query($dataBase, "select teacher_id from teachers ");

		$teachers_id = "";
		while ($row = mysqli_fetch_array($result)) {
			$teachers_id = $teachers_id.strval($row[0])."#";
		}
		$nteachers_id = rtrim($teachers_id,"#");
		echo "$nteachers_id";
	}

	// Close connection
	mysqli_close($dataBase);
?>