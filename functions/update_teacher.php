<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	$teacher_id  = $_POST['teacher_id'];
	$name = $_POST['name'];
	$surname = $_POST['surname'];
	$patronymic = $_POST['patronymic'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	$login = $_POST['login'];
	$pass = $_POST['pass'];


	$result = mysqli_query($dataBase, "SELECT user_id  FROM teachers where teacher_id=$teacher_id");
	$user_id = mysqli_fetch_array($result);


	$sql = "UPDATE teachers SET name='$name', surname='$surname', patronymic='$patronymic', tel='$tel', email='$email' WHERE teacher_id=$teacher_id";
	if(mysqli_query($dataBase, $sql)){
		$sql = "UPDATE users SET login='$login', password='$pass' WHERE user_id=$user_id[0]";
		if(mysqli_query($dataBase, $sql)){
   			echo "Изменения внесены успешно";
   		}
   		else {
   			echo "При обновлении информации произошла ошибка.";
   		}
	} 
	else {
    	echo "При обновлении информации произошла ошибка.";
	}
 
	// Close connection
	mysqli_close($dataBase);
?>