<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$teacher_id = $_POST['teacher_id'];

	$result = mysqli_query($dataBase, "SELECT user_id  FROM teachers where teacher_id=$teacher_id");
	$user_id = mysqli_fetch_array($result);

	$sql = "DELETE FROM users WHERE user_id=$user_id[0]";
	if(mysqli_query($dataBase, $sql)){
   		echo "Преподаватель успешно удален.";
	} else {
    	echo "При удалении преподавателя произошла ошибка.";
	}

	// Close connection
	mysqli_close($dataBase);
?>