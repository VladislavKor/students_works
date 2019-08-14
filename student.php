<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Студент</title>
	<link rel="stylesheet" type="text/css" href="CSS/student.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
	<header>
		<div class="logo_wrapper">
			<img class="logo" src="Images/guap-logo.png" alt="Логотип гуап">
		</div>
		<div class="user_settings">
			<p>Коромыслов Владислав</p>
			<p><small>1341</small></p>
		</div>
	</header>
	<div class="wrapper">
		<nav class="menu" id>
			<div class="menu_elem" onclick="groups()">
				<a>Схемотехника</a>
			</div>
			<div class="menu_elem" onclick="teachers()">
				<a>Операционные системы</a>
			</div>
		</nav>
		<div class="content" id="content">
			<div class="block">
				<p><strong>Операционные системы</strong></p>
			</div>
			<div class="block">
				<div class="add_report">
					<img src="Images/file.png">
					<input type="tetx" disabled="true" value="Лаб №1.pdf">
					<label>Загрузить файл</label>
				</div>
				<div class="report">
					<img src="Images/bigpdf.png" alt="Принят">
					<label>Просмотр</label>
				</div class="report">
				<div class="report">
					<img src="Images/bigpdf.png" alt="Исправить ошибки в оформлении.">
					<label>Просмотр</label>
				</div>
				<div class="report">
					<img src="Images/bigpdf.png" alt="">
					<label>Просмотр</label>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="JS/student.js"></script>
</html>