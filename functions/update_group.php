<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_number = $_POST['group_num'];
	$specialty = $_POST['specialty'];
	$direction = $_POST['direction'];
	$degree = $_POST['degree'];

	$sql = "UPDATE groups SET specialty='$specialty', direction='$direction', degree='$degree' WHERE group_num=$group_number";
	if(mysqli_query($dataBase, $sql)){
   		echo "Записи обновлены успешно";
	} else {
    	echo "При обновлении информации произошла ошибка.";
	}
 
	// Close connection
	mysqli_close($dataBase);
?>