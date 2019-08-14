<?php
	session_start();
	if ($_SESSION['check'] != hash('ripemd128', $_SERVER['REMOTE_ADDR'], $_SERVER['HTTP_USER_AGENT'])) {
		header("Location: index.php");
	}
?>

<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Администратор</title>
	<link rel="stylesheet" type="text/css" href="CSS/admin.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
	<header>
		<div class="logo_wrapper">
			<img class="logo" src="Images/guap-logo.png" alt="Логотип гуап">
		</div>
		<div class="user_settings">
			<p>Administrator</p>
		</div>
	</header>
	<div class="wrapper">
		<nav class="menu" id>
			<div class="menu_elem" onclick="groups()">
				<a><img src="Images/group.png" align="middle">Группы</a>
			</div>
			<div class="menu_elem" onclick="teachers()">
				<a><img src="Images/teacher.png" align="middle">Преподаватели</a>
			</div>
			<div class="menu_elem" onclick="students()">
				<a><img src="Images/students.png" align="middle">Студенты</a>
			</div>
			<div class="menu_elem" onclick="subjects()">
				<a><img src="Images/book.png" align="middle">Учебные дисциплины</a>
			</div>
			<div class="menu_elem" onclick="academic_plans()">
				<a><img src="Images/list.png" align="middle">Расписание</a>
			</div>
			<div class="menu_elem" onclick="reports()">
				<a><img src="Images/pdf.png" align="middle">Отчеты</a>
			</div>
		</nav>
		<div class="content" id="content">
			<div class="block">
				<p><strong>Главная</strong></p>
			</div>
			<div class="block">
				<p class="rule"><span>Группы:</span> добавление / удаление / редактирование групп.</p>
				<p class="rule"><span>Преподаватели:</span> регистрация / удаление / редактировние и просмотр (личных данных) преподавателей.</p>
				<p class="rule"><span>Студенты:</span> регистрация / добавление в группу / удаление / редактирование и просмотр (личных данных) студентов.</p>
				<p class="rule"><span>Учебные дисциплины:</span> добавление / удаление / редактиование учебных дисциплин.</p>
				<p class="rule"><span>Расписание:</span> составление / удаление / редактирование расписания групп.</p>
				<p class="rule"><span>Отчеты:</span> просмотр / добавление отчетов студентов по лабораторным, курсовым работам и курсовым проектам.</p>
			</div>
		</div>
	</div>
</body>
<script src="JS/admin.js"></script>
</html>