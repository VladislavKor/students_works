<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$subject_id = $_POST['subject_id'];

	$sql = "DELETE FROM subjects WHERE subject_id=$subject_id";
	if(mysqli_query($dataBase, $sql)){
   		echo "Учебная дисциплина успешна удалена";
	} else {
    	echo "При удалении учебной дисциплины произошла ошибка.";
	}

	// Close connection
	mysqli_close($dataBase);
?>