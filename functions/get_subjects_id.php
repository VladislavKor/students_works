<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	if (!$dataBase) {
		echo "data base error";
	}
	else {
		$result = mysqli_query($dataBase, "select subject_id from subjects ");

		$subject_id = "";
		while ($row = mysqli_fetch_array($result)) {
			$subject_id = $subject_id.strval($row[0])."#";
		}
		$nsubject_id = rtrim($subject_id,"#");
		echo "$nsubject_id";
	}

	// Close connection
	mysqli_close($dataBase);
?>