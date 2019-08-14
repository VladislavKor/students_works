<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_num = $_POST['group_num'];
	$subject_id = $_POST['subject_id'];
	$teacher_id = $_POST['teacher_id'];

	$nresult = mysqli_query($dataBase, "SELECT * FROM schedule WHERE group_num=$group_num AND subject_id=$subject_id AND teacher_id=$teacher_id");
	$num_rows = mysqli_num_rows($nresult);

	if ($num_rows > 0) 
	{
		echo "Ошибка: Такое сочетание предмета и преподавателя уже существует.";
	}
	else
	{
		$sql = "INSERT INTO schedule SET group_num=$group_num, subject_id=$subject_id, teacher_id=$teacher_id";
		if(mysqli_query($dataBase, $sql))
		{
   			echo "Новая строка расписания успешно добавлена.";
		} 
		else 
		{
    		echo "При добавлении новой строки расписания произошла ошибка.";
		}
	}
 
	// Close connection
	mysqli_close($dataBase);
?>