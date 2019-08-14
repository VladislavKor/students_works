<?php
	$file = strval($_POST['file_name']).'.pdf';
	header('Content-type: application/pdf');
	header('Content-Disposition: inline; filename="'.$file.'"');
	header('Content-Transfer-Encoding: binary');
	header('Accept-Rangers: bytes');
	@readfile($file)
?>