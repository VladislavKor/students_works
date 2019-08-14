<?php
	
	if (isset($_POST['enter'])) {
		$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
		if (!$dataBase) {
			echo "data base error";
		}
		else {

			$login = $_POST['login'];
			$pass = $_POST['pass'];

			$type_admin = 1; // admin
			$type_teacher = 2; // teacher
			$type_student = 3; // student

			$result = mysqli_fetch_assoc(mysqli_query($dataBase, "select * from users where ((login='$login') and (password='$pass'))"));

			if (!$result) {
				//header("Location: https://guapworks.000webhostapp.com/");
				echo "<script>error_login();</script>";
				mysqli_close ($dataBase);
			}
			else {
				session_start();
				$_SESSION['user_id'] = $result['user_id'];
				$_SESSION['check'] = hash('ripemd128', $_SERVER['REMOTE_ADDR'], $_SERVER['HTTP_USER_AGENT']);

				if ($result['user_type'] == $type_admin) {
					mysqli_close ($dataBase);
					//header("C:\open server\openserver\domains\guapworks.edu\admin.php"); exit;
					header("Location: admin.php");
				}
				elseif ($result['user_type'] == (string)$type_teacher) {
					# code...
				}
				elseif ($result['user_type'] == (string)$type_student) {
					# code...
				}
			}
		}
	}
	
?>
<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>GUAP WORKS</title>
	<link rel="stylesheet" type="text/css" href="CSS/index.css">
</head>
<script type="text/javascript">
	function error_login() {
		var elem = document.getElementById("login_form");
		var message = document.createElement("p");
		message.innerHTML = "Неверный логин или пароль.";
		message.style.cssText = "margin-top: 10px; text-align: center; color: #cf1b51; font-size: 15px;";
		message.id = "error_message";
		elem.appendChild(message);
	}
</script>
<body>
	<header>
		<div class="logo_wrapper">
			<img class="logo" src="Images/guap-logo.png" alt="Тех. поддержка">
		</div>
	</header>
	<div class="login">
		<form id="login_form" action="index.php"  method="post">
			<input type="text" name="login" placeholder="Логин" required="required"/>
			<input type="password" name="pass" placeholder="Пароль" required="required"/>
			<button type="submit" name="enter" class="btn btn-primary btn-block btn-large" onclick="show_error_message()">Войти</button>
		</form>
	</div>
</body>
</html>