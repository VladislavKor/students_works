<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$group_number = $_POST['group_num'];

	$sql = "DELETE FROM groups WHERE group_num=$group_number";
	if(mysqli_query($dataBase, $sql)){
   		echo "Группа успешна удалена";
	} else {
    	echo "При удалении группы произошла ошибка.";
	}

	// Close connection
	mysqli_close($dataBase);
?>