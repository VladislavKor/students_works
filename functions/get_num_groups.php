<?php
	$dataBase = mysqli_connect("localhost", "root", "", "guap_works");
	if (!$dataBase) {
		echo "data base error";
	}
	else {
		$result = mysqli_query($dataBase, "select group_num from groups ");

		$group_numbers = "";
		while ($row = mysqli_fetch_array($result)) {
			$group_numbers = $group_numbers.strval($row[0])."#";
		}
		$ngroup_numbers = rtrim($group_numbers,"#");
		echo "$ngroup_numbers";
	}
?>