<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	
	$subject_name = $_POST['subject_name'];

	$nresult = mysqli_query($dataBase, "SELECT * FROM subjects WHERE subject_name='$subject_name'");
	$num_rows = mysqli_num_rows($nresult);

	if ($num_rows > 0) 
	{
		echo "Ошибка: Такой предмет уже существует.";
	}
	else
	{
		$sql = "INSERT INTO subjects SET subject_name='$subject_name'";
		if(mysqli_query($dataBase, $sql))
		{
   			echo "Предмет успешно добавлен.";
		} 
		else 
		{
    		echo "При добавлении предмета произошла ошибка. Возможно предмет с таким названием уже существует.";
		}
	}
 
	// Close connection
	mysqli_close($dataBase);
?>