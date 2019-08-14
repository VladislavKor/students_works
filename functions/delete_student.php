<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$student_id = $_POST['student_id'];

	$result = mysqli_query($dataBase, "SELECT user_id  FROM students where student_id=$student_id");
	$user_id = mysqli_fetch_array($result);

	$sql = "DELETE FROM users WHERE user_id=$user_id[0]";
	if(mysqli_query($dataBase, $sql)){
   		echo "Студент успешно удален.";
	} else {
    	echo "При удалении студента произошла ошибка.";
	}

	// Close connection
	mysqli_close($dataBase);
?>