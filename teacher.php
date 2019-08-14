<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Преподаватель</title>
	<link rel="stylesheet" type="text/css" href="CSS/teacher.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
	<header>
		<div class="logo_wrapper">
			<img class="logo" src="Images/guap-logo.png" alt="Логотип гуап">
		</div>
		<div class="user_settings">
			<p>Иванов Иван Иванович</p>
		</div>
	</header>
	<div class="wrapper">
		<nav class="menu" id>
			<div class="menu_elem">
				<a>Проектирование информационных систем с применением web-технологий</a>
			</div>
			<div class="menu_elem">
				<a>Операционные системы</a>
				<div class="dropdown-content">
					<a>1341</a>
					<a>1342</a>
				</div>
			</div>
		</nav>
		<div class="content" id="content">
			<div class="block">
				<p><strong>Операционные системы</strong> <small>группа:  </small> <stong>1341</stong></p>
			</div>
			<div class="block">
				<div class="select">
					<select class="sel">
						<option>Федоров Алексей Дмитреевич</option>
						<option>Коромыслов Владислав Валерьевич</option>
					</select>
					<div class="but">Показать</div>
					<div class="otch"><strong>ОТЧЕТЫ</strong></div>
				</div>
				<div>
					<div class="report">
						<img src="Images/bigpdf.png" alt="Принят">
						<label>Просмотр</label>
						<input type="text" placeholder="Комментарий">
					</div class="report">
					<div class="report">
						<img src="Images/bigpdf.png" alt="Исправить ошибки в оформлении.">
						<label>Просмотр</label>
						<input type="text" placeholder="Комментарий">
					</div>
					<div class="report">
						<img src="Images/bigpdf.png" alt="">
						<label>Просмотр</label>
						<input type="text" placeholder="Комментарий">
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="JS/admin.js"></script>
</html>