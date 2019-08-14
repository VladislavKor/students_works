<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_number = $_POST['group_num'];
	$specialty = $_POST['specialty'];
	$direction = $_POST['direction'];
	$degree = $_POST['degree'];

	$sql = "INSERT INTO groups VALUES ($group_number, '$specialty', '$direction', '$degree')";
	if(mysqli_query($dataBase, $sql)){
   		echo "Группа успешно давлена";
	} else {
    	echo "При добавлении группы произошла ошибка. Возможно группа с таким номером уже существует.";
	}
 
	// Close connection
	mysqli_close($dataBase);
?>