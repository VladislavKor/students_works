<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$group_num = $_POST['group_num'];
	$subject_id = $_POST['subject_id'];
	$teacher_id = $_POST['teacher_id'];

	$sql = "DELETE FROM schedule WHERE group_num=$group_num AND subject_id=$subject_id AND teacher_id=$teacher_id";
	if(mysqli_query($dataBase, $sql)){
   		echo "Cтрока расписания успешна удалена";
	} else {
    	echo "При удалении строки расписания произошла ошибка.";
	}
 
	// Close connection
	mysqli_close($dataBase);
?>