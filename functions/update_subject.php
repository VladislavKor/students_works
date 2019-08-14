<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$subject_id = $_POST['subject_id'];
	$subject_name = $_POST['subject_name'];

	$sql = "UPDATE subjects SET subject_name='$subject_name' WHERE subject_id=$subject_id";
	if(mysqli_query($dataBase, $sql)){
   		echo "Записи обновлены успешно";
	} else {
    	echo "При обновлении информации произошла ошибка.";
	}
 
	// Close connection
	mysqli_close($dataBase);
?>