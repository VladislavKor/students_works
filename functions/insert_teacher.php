<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$name = $_POST['name'];
	$surname = $_POST['surname'];
	$patronymic = $_POST['patronymic'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	$login = $_POST['login'];
	$pass = $_POST['pass'];

	$nresult = mysqli_query($dataBase, "SELECT * FROM users WHERE login='$login' AND password='$pass'");
	$num_rows = mysqli_num_rows($nresult);

	if ($num_rows > 0) 
	{
		echo "Ошибка: Пользователь с таким логином и паролем уже существует.";
	}
	else
	{
		$sql = "INSERT INTO users SET login='$login', password='$pass', user_type=2";

		if(mysqli_query($dataBase, $sql))
		{
			$result = mysqli_query($dataBase, "SELECT user_id FROM users WHERE login='$login' AND password='$pass'");
			$user_id = mysqli_fetch_array($result);

			$sql = "INSERT INTO teachers SET name='$name', surname='$surname', patronymic='$patronymic', tel='$tel', email='$email', user_id=$user_id[0]";
			if(mysqli_query($dataBase, $sql))
			{
				echo "Преподаватель успешно добавлен.";
			}
			else
			{
				echo "При добавлении преподавателя произошла ошибка.";
			}
		}
		else
		{
			echo "При добавлении преподавателя произошла ошибка.";
		}
	}

	// Close connection
	mysqli_close($dataBase);
?>