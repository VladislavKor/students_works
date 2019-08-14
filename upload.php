<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");

	if(is_uploaded_file($_FILES["file"]["tmp_name"]))
   {

   		$student_id = $_POST['student_id'];
   		$subject_id	= $_POST['subject_id'];

   		$sql = "INSERT INTO reports SET student_id=$student_id, subject_id=$subject_id, link='filename'";
		if(mysqli_query($dataBase, $sql))
		{
   			$result = mysqli_query($dataBase, "select * from reports where student_id=$student_id and subject_id=$subject_id and link='filename'");

			  $row = mysqli_fetch_array($result);

			  move_uploaded_file($_FILES["file"]["tmp_name"], "reports/".strval($row[0]).".pdf");

        $path = "reports/".strval($row[0]);

        $sql2 = "UPDATE reports SET link='$path' WHERE report_id='$row[0]'";

        if (!mysqli_query($dataBase, $sql2)) {
          echo "Файл потерян.";
        }
		} 
		else 
		{
    		echo "При добавлении отчета возникала ошибка. Проверьте типы данных в поле ID. Возможно вы пытаетесь добавить отчет по несуществующему предмету или для несуществующего студента.";
    		exit();
		}

    echo "Отчет успешно загружен. Номер отчета: ".strval($row[0]);
   	
   } 
   else 
   {
      echo("Ошибка загрузки файла");
   }

   // Close connection
  mysqli_close($dataBase);
?>