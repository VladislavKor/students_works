// очистка контента
function delete_content() {
	var elem = document.getElementById('content');

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}
}
// шапка
function hat(title) {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";
	div.innerHTML = "<strong>" + title + "</strong>";
	div.style.cssText = "font-size: 13px; color: rgba(0, 0, 0, 0.7);";

	elem.appendChild(div);
}

//*************************************************
				//ФУНКЦИИ ДЛЯ ГРУПП
// функция добавления группы
function add_new_group(){
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/insert_group.php",
		data: ({group_num: elem.childNodes[0].value,
				specialty: elem.childNodes[1].value,
				direction: elem.childNodes[2].value,
				degree: elem.childNodes[3].value}),
		success: function(data){
			alert(data);
		}
	});
}

// блок добавления группы
function add_group() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block table";
	
	var p = document.createElement('p');
	p.className = "block_title";
	p.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ДОБАВЛЕНИЕ ГРУПП</strong><img src='Images/right_arrow.png' align='bottom'>";

	var form = document.createElement('form');

	var inp1 = document.createElement('input');
	inp1.className = "form_input";
	inp1.type = "text";
	inp1.name = "number";
	inp1.placeholder = "Номер новой группы";
	inp1.required = "required";

	var inp2 = document.createElement('input');
	inp2.className = "form_input";
	inp2.type = "text";
	inp2.name = "specialty_num";
	inp2.placeholder = "Номер напрвления";
	inp2.required = "required";

	var inp3 = document.createElement('input');
	inp3.className = "form_input";
	inp3.type = "text";
	inp3.name = "specialty_name";
	inp3.placeholder = "Номер напрвленности";
	inp3.required = "required";

	var select = document.createElement('select');
	select.className = "form_select";
	select.required = "required";
	var option1 = document.createElement('option');
	option1.value = "Бакалавриат";
    option1.text = "Бакалавриат";
    select.appendChild(option1);
    var option2 = document.createElement('option');
    option2.value = "Магистратура";
    option2.text = "Магистратура";
    select.appendChild(option2);

    var button = document.createElement('button');
    button.className = "form_button";
    button.type = "submit";
    button.innerHTML = "ДОБАВИТЬ";

    button.onclick = add_new_group;

	form.appendChild(inp1);
	form.appendChild(inp2);
	form.appendChild(inp3);
	form.appendChild(select);
	form.appendChild(button);

	div.appendChild(p);
	div.appendChild(form);
	elem.appendChild(div);
}

// отмена удаления группы
function no_delete_group(){
	var elem = this.parentElement;
	
	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var update = document.createElement('button');
	var deletee = document.createElement('button');

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	deletee.onclick = delete_group;
	update.onclick = update_group;

	elem.appendChild(update);
	elem.appendChild(deletee);
}

// подтверждение удаления группы
function yes_delete_group(){
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/delete_group.php",
		data: ({group_num: elem.id}),
		success: function(data){
			alert(data);
		}
	});

	elem.remove();
}

// удаление строки из таблицы и бд
function delete_group(){
	var elem = this.parentElement;
	
	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var yes = document.createElement('button');
	var no = document.createElement('button');

	yes.innerHTML = 'ДА';
	no.innerHTML = 'НЕТ';

	yes.className = 'yes_button';

	yes.onclick = yes_delete_group;
	no.onclick = no_delete_group;

	elem.appendChild(yes);
	elem.appendChild(no);
}

// изменение иформации о группе в бд
function change_group_info(){
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/update_group.php",
		data: ({group_num: elem.id, 
				specialty: elem.childNodes[1].firstChild.value, 
				direction: elem.childNodes[2].firstChild.value, 
				degree: elem.childNodes[3].firstChild.value}),
		success: function(data){
			alert(data);
		}
	});

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
			type:"POST",
			url: "functions/get_group_by_num.php",
			data: ({group_num: elem.id}),
			success: function(data) {
			var columns = data.split('#');

			var	group_number = document.createElement('div');
			var	specialty = document.createElement('div');
			var	specialty_name = document.createElement('div');
			var	program = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			group_number.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
			specialty.innerHTML = "<strong>" + String(columns[1]) + "</strong>";
			specialty_name.innerHTML = "<strong>" + String(columns[2]) + "</strong>";
			program.innerHTML = "<strong>" + String(columns[3]) + "</strong>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			deletee.onclick = delete_group;
			update.onclick = update_group;

			elem.appendChild(group_number);
			elem.appendChild(specialty);
			elem.appendChild(specialty_name);
			elem.appendChild(program);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// отмена изменения данных группы
function group_cancel(){
	var elem = this.parentElement;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
			type:"POST",
			url: "functions/get_group_by_num.php",
			data: ({group_num: elem.id}),
			success: function(data) {
				var columns = data.split('#');

				var	group_number = document.createElement('div');
				var	specialty = document.createElement('div');
				var	specialty_name = document.createElement('div');
				var	program = document.createElement('div');
				var update = document.createElement('button');
				var deletee = document.createElement('button');

				group_number.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
				specialty.innerHTML = "<strong>" + String(columns[1]) + "</strong>";
				specialty_name.innerHTML = "<strong>" + String(columns[2]) + "</strong>";
				program.innerHTML = "<strong>" + String(columns[3]) + "</strong>";

				update.innerHTML = "ИЗМЕНИТЬ";
				deletee.innerHTML = "УДАЛИТЬ";

				deletee.onclick = delete_group;
				update.onclick = update_group;

				elem.appendChild(group_number);
				elem.appendChild(specialty);
				elem.appendChild(specialty_name);
				elem.appendChild(program);
				elem.appendChild(update);
				elem.appendChild(deletee);
			}
		});
}

// изменение полей в строке таблицы
function update_group(){
	var elem = this.parentElement;

	var number = elem.id;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_group_by_num.php",
		data: ({group_num: number}),
		success: function(data){
			var columns = data.split('#');

			var form = document.createElement('form');

			var	group_number = document.createElement('div');
			var specialty_div = document.createElement('div');
			var	specialty = document.createElement('input');
			var specialty_name_div = document.createElement('div');
			var	specialty_name = document.createElement('input');
			var select_div = document.createElement('div');
			var select = document.createElement('select');
			select.className = "form_select";
			select.required = "required";
			var change = document.createElement('button');
			var cancel = document.createElement('button');

			group_number.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
			specialty.type = 'text';
			specialty.value = String(columns[1]);
			specialty_name.type = 'text';
			specialty_name.value = String(columns[2])

			var option1 = document.createElement('option');
			option1.value = "Бакалавриат";
    		option1.text = "Бакалавриат";
    		select.appendChild(option1);
    		var option2 = document.createElement('option');
    		option2.value = "Магистратура";
    		option2.text = "Магистратура";
    		select.appendChild(option2);

    		change.innerHTML = 'СОХРАНИТЬ';
    		cancel.innerHTML = 'ОТМЕНА';

    		specialty_div.appendChild(specialty);
    		specialty_name_div.appendChild(specialty_name);
    		select_div.appendChild(select);

    		change.onclick = change_group_info;
    		cancel.onclick = group_cancel;

    		elem.appendChild(group_number);
    		elem.appendChild(specialty_div);
   		 	elem.appendChild(specialty_name_div);
    		elem.appendChild(select_div);
    		elem.appendChild(change);
    		elem.appendChild(cancel);
		}
	});
}

function print_one_group(data){
	var columns = data.split('#');

	var table = document.getElementById('group_table');

	var row = document.createElement('div');
	row.id = columns[0]; // ID - номер группы
	row.className = "row_group";

	var	group_number = document.createElement('div');
	var	specialty = document.createElement('div');
	var	specialty_name = document.createElement('div');
	var	program = document.createElement('div');
	var update = document.createElement('button');
	var deletee = document.createElement('button');

	group_number.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
	specialty.innerHTML = "<strong>" + String(columns[1]) + "</strong>";
	specialty_name.innerHTML = "<strong>" + String(columns[2]) + "</strong>";
	program.innerHTML = "<strong>" + String(columns[3]) + "</strong>";

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	deletee.onclick = delete_group;
	update.onclick = update_group;

	row.appendChild(group_number);
	row.appendChild(specialty);
	row.appendChild(specialty_name);
	row.appendChild(program);
	row.appendChild(update);
	row.appendChild(deletee);

	table.appendChild(row);
}

function print_groups(data){
	var g_nums = data.split('#');

	var number;

	for (var i = 0; i < g_nums.length; i++) {
		number = g_nums[i];

		$.ajax({
			type:"POST",
			url: "functions/get_group_by_num.php",
			data: ({group_num: number}),
			success: print_one_group
		});
	}
}

// удаление списка групп
function delete_group_list() {
	var elem = document.getElementById('group_table');
	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}
}

// обновление списка групп
function update_group_list(){
	delete_group_list();

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_groups
	});
}

// блок редактирования группы
function edit_group() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";
	
	div.innerHTML = "<p><strong>ГРУППЫ</strong><img src='Images/update.png' class='update_button' onclick='update_group_list()'></p>"+ 
					"<hr color='#EEEEF2'>"+ 
					"<div class='table_head'>"+
						"<div><strong>НОМЕР</strong></div>" +
						"<div><strong>НАПРАВЛЕНИЕ</strong></div>"+
						"<div><strong>НАПРАВЛЕННОСТЬ</strong></div>"+
						"<div><strong>ПРОГРАММА</strong></div>" +
					"</div>"+
					"<div id='group_table'></div>";
	
	elem.appendChild(div);

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_groups
	});

}

//*************************************************
				//ФУНКЦИИ ДЛЯ ПРЕПОДАВАТЕЛЕЙ

// отмена изменений преподавателя
function teacher_cancel() {
	var elem = this.parentElement;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_teacher_by_id.php",
		data: ({teacher_id: elem.id}),
		success: function(data){
			var columns = data.split('#');

			var photo = document.createElement('div');
			var info = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			photo.className = "teacher_photo";
			info.className = "teacher_info";
			photo.innerHTML = "<img src='Images/big_teacher.png'>";

			var fam = document.createElement('p');
			var name = document.createElement('p');
			var otch = document.createElement('p');
			var tel = document.createElement('p');
			var email = document.createElement('p');
			var login = document.createElement('p');
			var pass = document.createElement('p');

			fam.innerHTML = "<div class='info'><strong>ФАМИЛИЯ:</strong></div><div class='data'><strong>" + String(columns[2]) +"</strong></div>";
			name.innerHTML = "<div class='info'><strong>ИМЯ:</strong></div><div class='data'><strong>" + String(columns[1]) +"</strong></div>";
			otch.innerHTML = "<div class='info'><strong>ОТЧЕСТВО:</strong></div><div class='data'><strong>" + String(columns[3]) +"</strong></div>";
			tel.innerHTML = "<div class='info'><strong>ТЕЛЕФОН:</strong></div><div class='data'><strong>" + String(columns[4]) +"</strong></div>";
			email.innerHTML = "<div class='info'><strong>E-MAIL:</strong></div><div class='data'><strong>" + String(columns[5]) +"</strong></div>";
			login.innerHTML = "<div class='info'><strong>ЛОГИН:</strong></div><div class='data'><strong>" + String(columns[6]) + "</strong></div>";
			pass.innerHTML = "<div class='info'><strong>ПАРОЛЬ:</strong></div><div class='data'><strong>" + String(columns[7]) + "</strong></div>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_teacher;
			deletee.onclick = delete_teacher;

			info.appendChild(fam);
			info.appendChild(name);
			info.appendChild(otch);
			info.appendChild(tel);
			info.appendChild(email);
			info.appendChild(login);
			info.appendChild(pass);

			elem.appendChild(photo);
			elem.appendChild(info);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// сохранение изменений
function teacher_save() {
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/update_teacher.php",
		data: ({teacher_id: elem.id, 
				surname: elem.childNodes[1].childNodes[0].childNodes[1].value, 
				name: elem.childNodes[1].childNodes[1].childNodes[1].value, 
				patronymic: elem.childNodes[1].childNodes[2].childNodes[1].value,
				tel: elem.childNodes[1].childNodes[3].childNodes[1].value,
				email: elem.childNodes[1].childNodes[4].childNodes[1].value,
				login: elem.childNodes[1].childNodes[5].childNodes[1].value,
				pass: elem.childNodes[1].childNodes[6].childNodes[1].value}),
		success: function(data){
			alert(data);
		}
	});

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_teacher_by_id.php",
		data: ({teacher_id: elem.id}),
		success: function(data){
			var columns = data.split('#');

			var photo = document.createElement('div');
			var info = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			photo.className = "teacher_photo";
			info.className = "teacher_info";
			photo.innerHTML = "<img src='Images/big_teacher.png'>";

			var fam = document.createElement('p');
			var name = document.createElement('p');
			var otch = document.createElement('p');
			var tel = document.createElement('p');
			var email = document.createElement('p');
			var login = document.createElement('p');
			var pass = document.createElement('p');

			fam.innerHTML = "<div class='info'><strong>ФАМИЛИЯ:</strong></div><div class='data'><strong>" + String(columns[2]) +"</strong></div>";
			name.innerHTML = "<div class='info'><strong>ИМЯ:</strong></div><div class='data'><strong>" + String(columns[1]) +"</strong></div>";
			otch.innerHTML = "<div class='info'><strong>ОТЧЕСТВО:</strong></div><div class='data'><strong>" + String(columns[3]) +"</strong></div>";
			tel.innerHTML = "<div class='info'><strong>ТЕЛЕФОН:</strong></div><div class='data'><strong>" + String(columns[4]) +"</strong></div>";
			email.innerHTML = "<div class='info'><strong>E-MAIL:</strong></div><div class='data'><strong>" + String(columns[5]) +"</strong></div>";
			login.innerHTML = "<div class='info'><strong>ЛОГИН:</strong></div><div class='data'><strong>" + String(columns[6]) + "</strong></div>";
			pass.innerHTML = "<div class='info'><strong>ПАРОЛЬ:</strong></div><div class='data'><strong>" + String(columns[7]) + "</strong></div>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_teacher;
			deletee.onclick = delete_teacher;

			info.appendChild(fam);
			info.appendChild(name);
			info.appendChild(otch);
			info.appendChild(tel);
			info.appendChild(email);
			info.appendChild(login);
			info.appendChild(pass);


			elem.appendChild(photo);
			elem.appendChild(info);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// изменение данных в строке преподавателя
function update_teacher() {
	var elem = this.parentElement;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_teacher_by_id.php",
		data: ({teacher_id: elem.id}),
		success: function(data){
			var columns = data.split('#');

			var photo = document.createElement('div');
			var info = document.createElement('div');
			var save = document.createElement('button');
			var cancel = document.createElement('button');

			photo.className = "teacher_photo";
			info.className = "teacher_info";
			photo.innerHTML = "<img src='Images/big_teacher.png'>";

			var fam = document.createElement('p');
			var name = document.createElement('p');
			var otch = document.createElement('p');
			var tel = document.createElement('p');
			var email = document.createElement('p');
			var login = document.createElement('p');
			var pass = document.createElement('p');

			var fam_i = document.createElement('div');
			var name_i = document.createElement('div');
			var otch_i = document.createElement('div');
			var tel_i = document.createElement('div');
			var email_i = document.createElement('div');
			var login_i = document.createElement('div');
			var pass_i = document.createElement('div');

			fam_i.className = 'info';
			name_i.className = 'info';
			otch_i.className = 'info'; 
			tel_i.className = 'info';
			email_i.className = 'info';
			login_i.className = 'info';
			pass_i.className = 'info';

			fam_i.innerHTML = "<strong>ФАМИЛИЯ:</strong>";
			name_i.innerHTML = "<strong>ИМЯ:</strong>";
			otch_i.innerHTML = "<strong>ОТЧЕСТВО:</strong>";
			tel_i.innerHTML = "<strong>ТЕЛЕФОН:</strong>";
			email_i.innerHTML = "<strong>E-MAIL:</strong>";
			login_i.innerHTML = "<strong>ЛОГИН:</strong>";
			pass_i.innerHTML = "<strong>ПАРОЛЬ:</strong>";

			var input1 = document.createElement('input');
			var input2 = document.createElement('input');
			var input3 = document.createElement('input');
			var input4 = document.createElement('input');
			var input5 = document.createElement('input');
			var input6 = document.createElement('input');
			var input7 = document.createElement('input');

			input1.className = 'data_input';
			input2.className = 'data_input';
			input3.className = 'data_input';
			input4.className = 'data_input';
			input5.className = 'data_input';
			input6.className = 'data_input';
			input7.className = 'data_input';

			input1.type = 'text';
			input2.type = 'text';
			input3.type = 'text';
			input4.type = 'text';
			input5.type = 'text';
			input6.type = 'text';
			input7.type = 'text';

			input1.value = String(columns[2]);
			input2.value = String(columns[1]);
			input3.value = String(columns[3]);
			input4.value = String(columns[4]);
			input5.value = String(columns[5]);
			input6.value = String(columns[6]);
			input7.value = String(columns[7]);

			fam.appendChild(fam_i);
			fam.appendChild(input1);
			name.appendChild(name_i);
			name.appendChild(input2);
			otch.appendChild(otch_i);
			otch.appendChild(input3);
			tel.appendChild(tel_i);
			tel.appendChild(input4);
			email.appendChild(email_i);
			email.appendChild(input5);
			login.appendChild(login_i);
			login.appendChild(input6);
			pass.appendChild(pass_i);
			pass.appendChild(input7);

			info.appendChild(fam);
			info.appendChild(name);
			info.appendChild(otch);
			info.appendChild(tel);
			info.appendChild(email);
			info.appendChild(login);
			info.appendChild(pass);

			save.innerHTML = "СОХРАНИТЬ";
			cancel.innerHTML = "ОТМЕНА";

			cancel.onclick = teacher_cancel;
			save.onclick = teacher_save;

			elem.appendChild(photo);
			elem.appendChild(info);
			elem.appendChild(save);
			elem.appendChild(cancel);
		}
	});
}

// подтверждение удаления преподавателя
function yes_delete_teacher(){
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/delete_teacher.php",
		data: ({teacher_id: elem.id}),
		success: function(data){
			alert(data);
		}
	});

	elem.remove();
}

// отмена удаления преподавателя
function no_delete_teacher() {
	var elem = this.parentElement;
	
	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var update = document.createElement('button');
	var deletee = document.createElement('button');

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	deletee.onclick = delete_teacher;
	update.onclick = update_teacher;

	elem.appendChild(update);
	elem.appendChild(deletee);
}

// удаоение преподавателя из таблицы
function delete_teacher() {
	var elem = this.parentElement;
	
	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var yes = document.createElement('button');
	var no = document.createElement('button');

	yes.innerHTML = 'ДА';
	no.innerHTML = 'НЕТ';

	yes.className = 'yes_button';

	yes.onclick = yes_delete_teacher;
	no.onclick = no_delete_teacher;

	elem.appendChild(yes);
	elem.appendChild(no);
}

// отображение одно преподавателя
function print_one_teacher(data){
	var columns = data.split('#');

	var table = document.getElementById('teachers_table');

	var row = document.createElement('div');
	row.id = columns[0]; // ID - номер группы
	row.className = "row_teacher";

	var photo = document.createElement('div');
	var info = document.createElement('div');
	var update = document.createElement('button');
	var deletee = document.createElement('button');

	photo.className = "teacher_photo";
	info.className = "teacher_info";
	photo.innerHTML = "<img src='Images/big_teacher.png'>";

	var fam = document.createElement('p');
	var name = document.createElement('p');
	var otch = document.createElement('p');
	var tel = document.createElement('p');
	var email = document.createElement('p');
	var login = document.createElement('p');
	var pass = document.createElement('p');

	fam.innerHTML = "<div class='info'><strong>ФАМИЛИЯ:</strong></div><div class='data'><strong>" + String(columns[2]) +"</strong></div>";
	name.innerHTML = "<div class='info'><strong>ИМЯ:</strong></div><div class='data'><strong>" + String(columns[1]) +"</strong></div>";
	otch.innerHTML = "<div class='info'><strong>ОТЧЕСТВО:</strong></div><div class='data'><strong>" + String(columns[3]) +"</strong></div>";
	tel.innerHTML = "<div class='info'><strong>ТЕЛЕФОН:</strong></div><div class='data'><strong>" + String(columns[4]) +"</strong></div>";
	email.innerHTML = "<div class='info'><strong>E-MAIL:</strong></div><div class='data'><strong>" + String(columns[5]) +"</strong></div>";
	login.innerHTML = "<div class='info'><strong>ЛОГИН:</strong></div><div class='data'><strong>" + String(columns[6]) + "</strong></div>";
	pass.innerHTML = "<div class='info'><strong>ПАРОЛЬ:</strong></div><div class='data'><strong>" + String(columns[7]) + "</strong></div>";

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	update.onclick = update_teacher;
	deletee.onclick = delete_teacher;

	info.appendChild(fam);
	info.appendChild(name);
	info.appendChild(otch);
	info.appendChild(tel);
	info.appendChild(email);
	info.appendChild(login);
	info.appendChild(pass);

	row.appendChild(photo);
	row.appendChild(info);
	row.appendChild(update);
	row.appendChild(deletee);

	table.appendChild(row);
}

// функция отображения таблицы преподавателей
function print_teachers(data) {
	var teachers_id = data.split('#');

	for (var i = 0; i < teachers_id.length; i++) {

		$.ajax({
			type:"POST",
			url: "functions/get_teacher_by_id.php",
			data: ({teacher_id: teachers_id[i]}),
			success: print_one_teacher
		});
	}
}

// удаление списка преподавателей
function delete_teachers_list() {
	var elem = document.getElementById('teachers_table');
	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}
}

// обновление списка преподавателей
function update_teacher_list() {
	delete_teachers_list();

	$.ajax({
		type: "POST",
		url: "functions/get_teachers_id.php",
		cache: false,
		success: print_teachers
	});
}

// блок редактирования преподавателей
function edit_teachers(){
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";

	div.innerHTML = "<p><strong>ПРЕПОДАВАТЕЛИ</strong><img src='Images/update.png' class='update_button' onclick='update_teacher_list()'></p>" +
					"<hr color='#EEEEF2'>" +
					"<div id='teachers_table'></div>";

	elem.appendChild(div);

	$.ajax({
		type: "POST",
		url: "functions/get_teachers_id.php",
		cache: false,
		success: print_teachers
	});
}

// функция добавления нового преподавателя
function add_new_teacher(){
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/insert_teacher.php",
		data: ({surname: elem.childNodes[0].value,
				name: elem.childNodes[1].value,
				patronymic: elem.childNodes[2].value,
				tel: elem.childNodes[3].value,
				email: elem.childNodes[4].value,
				login: elem.childNodes[5].value,
				pass: elem.childNodes[6].value}),
		success: function(data){
			alert(data);
		}
	});	
}

// блок добавления нового преподавателя
function add_teacher(){
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block table";
	
	var p = document.createElement('p');
	p.className = "block_title";
	p.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ДОБАВЛЕНИЕ ПРЕПОДАВАТЕЛЕЙ</strong><img src='Images/right_arrow.png' align='bottom'>";

	var dform = document.createElement('div');
	dform.className = "form";

	var fam = document.createElement('input');
	var name = document.createElement('input');
	var otch = document.createElement('input');
	var tel = document.createElement('input');
	var email = document.createElement('input');
	var login = document.createElement('input');
	var pass = document.createElement('input');

	fam.className = "form_input";
	name.className = "form_input";
	otch.className = "form_input";
	tel.className = "form_input";
	email.className = "form_input";
	login.className = "form_input";
	pass.className = "form_input";

	fam.type = "text";
	name.type = "text";
	otch.type = "text";
	tel.type = "text";
	email.type = "text";
	login.type = "text";
	pass.type = "text";

	fam.placeholder = "Фамилия";
	name.placeholder = "Имя";
	otch.placeholder = "Отчество";
	tel.placeholder = "Телефон";
	email.placeholder = "E-mail";
	login.placeholder = "Логин";
	pass.placeholder = "Пароль";

	var button = document.createElement('button');

	button.className = "form_button";
    button.innerHTML = "ДОБАВИТЬ";
    button.onclick = add_new_teacher;

	dform.appendChild(fam);
	dform.appendChild(name);
	dform.appendChild(otch);
	dform.appendChild(tel);
	dform.appendChild(email);
	dform.appendChild(login);
 	dform.appendChild(pass); 
 	dform.appendChild(button);  

	div.appendChild(p);
	div.appendChild(dform);
	elem.appendChild(div);
}

//*************************************************
			//ФУНКЦИИ СТУДЕНТОВ

// функция создания таблицы группы студентов
function create_group_table(g_num) {
	var elem = document.getElementById('global_students_table');

	var div = document.createElement('div');
	div.id = g_num;
	div.className = 'students_table';

	var p = document.createElement('p');
	p.innerHTML = "<div>Номер группы: </div><strong>" + String(g_num) + "</strong><img src='Images/down_arrow.png'>";
	p.className = 'students_group_num';

	var menu = document.createElement('p');
	menu.className = "table_head";
	menu.innerHTML = "<div><strong>ID</strong></div>" +
					 "<div><strong>ФИО</strong></div>" +
					 "<div><strong>ТЕЛЕФОН / EMAIL</strong></div>" +
					 "<div><strong>ЛОГИН / ПАРОЛЬ<strong></div>";

	div.appendChild(p);
	div.appendChild(menu);

	elem.appendChild(div);
}

// функция отмены удаления студента
function no_delete_student() {
	var elem = this.parentElement;

	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var update = document.createElement('button');
	var deletee = document.createElement('button');

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	update.onclick = update_student;
	deletee.onclick = delete_student;
	
	elem.appendChild(update);
	elem.appendChild(deletee);
}

// функция подтверждения удаления студента
function yes_delete_student() {
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/delete_student.php",
		data: ({student_id: elem.id}),
		success: function(data){
			alert(data);
		}
	});

	elem.remove();
}

// функция удаления студента
function delete_student() {
	var elem = this.parentElement;

	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var yes = document.createElement('button');
	var no = document.createElement('button');

	yes.innerHTML = 'ДА';
	no.innerHTML = 'НЕТ';

	yes.className = 'yes_button';

	yes.onclick = yes_delete_student;
	no.onclick = no_delete_student;

	elem.appendChild(yes);
	elem.appendChild(no);
}

// функция сохранения изменений данных студента
function save_student() {
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/update_student.php",
		data: ({student_id: elem.id, 
				surname: elem.childNodes[1].childNodes[0].value, 
				name: elem.childNodes[1].childNodes[1].value, 
				patronymic: elem.childNodes[1].childNodes[2].value,
				tel: elem.childNodes[2].childNodes[0].value,
				email: elem.childNodes[2].childNodes[1].value,
				login: elem.childNodes[3].childNodes[0].value,
				pass: elem.childNodes[3].childNodes[1].value}),
		success: function(data){
			alert(data);
		}
	});

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_student_by_id.php",
		data: ({student_id: elem.id}),
		success: function(data2){
			var columns = data2.split('#');

			var id = document.createElement('div');
			var fio = document.createElement('div');
			var info = document.createElement('div');
			var lp = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			id.className = "column";
			fio.className = "column";
			info.className = "column";
			lp.className = "column";

			id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";

			fio.innerHTML = "<div class='st_fio'><strong>" + String(columns[2]) +"</strong></div>" +
							"<div class='st_fio'><strong>" + String(columns[1]) +"</strong></div>" +
							"<div class='st_fio'><strong>" + String(columns[3]) +"</strong></div>";

			var tel = document.createElement('p');
			var email = document.createElement('p');

			tel.innerHTML = "<strong>" + String(columns[4]) +"</strong>";
			email.innerHTML = "<strong>" + String(columns[5]) +"</strong>";

			var login = document.createElement('p');
			var pass = document.createElement('p');

			login.innerHTML = "<div class='st_lpi'>Логин:</div><div class='st_lp'><strong>" + String(columns[6]) + "</strong></div>";
			pass.innerHTML = "<div class='st_lpi'>Пароль:</div><div class='st_lp'><strong>" + String(columns[7]) + "</strong></div>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_student;
			deletee.onclick = delete_student;

			info.appendChild(tel);
			info.appendChild(email);

			lp.appendChild(login);
			lp.appendChild(pass);

			elem.appendChild(id);
			elem.appendChild(fio);
			elem.appendChild(info);
			elem.appendChild(lp);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// функция отмены изменений данных студента
function student_cancel() {
	var elem = this.parentElement;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_student_by_id.php",
		data: ({student_id: elem.id}),
		success: function(data2){
			var columns = data2.split('#');

			var id = document.createElement('div');
			var fio = document.createElement('div');
			var info = document.createElement('div');
			var lp = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			id.className = "column";
			fio.className = "column";
			info.className = "column";
			lp.className = "column";

			id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";

			fio.innerHTML = "<div class='st_fio'><strong>" + String(columns[2]) +"</strong></div>" +
							"<div class='st_fio'><strong>" + String(columns[1]) +"</strong></div>" +
							"<div class='st_fio'><strong>" + String(columns[3]) +"</strong></div>";

			var tel = document.createElement('p');
			var email = document.createElement('p');

			tel.innerHTML = "<strong>" + String(columns[4]) +"</strong>";
			email.innerHTML = "<strong>" + String(columns[5]) +"</strong>";

			var login = document.createElement('p');
			var pass = document.createElement('p');

			login.innerHTML = "<div class='st_lpi'>Логин:</div><div class='st_lp'><strong>" + String(columns[6]) + "</strong></div>";
			pass.innerHTML = "<div class='st_lpi'>Пароль:</div><div class='st_lp'><strong>" + String(columns[7]) + "</strong></div>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_student;
			deletee.onclick = delete_student;

			info.appendChild(tel);
			info.appendChild(email);

			lp.appendChild(login);
			lp.appendChild(pass);

			elem.appendChild(id);
			elem.appendChild(fio);
			elem.appendChild(info);
			elem.appendChild(lp);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// функция обновления данных студента
function update_student() {
	var elem = this.parentElement;

	for (var i = 0; i < 5; i++) {
		elem.removeChild(elem.lastChild);
	}

	$.ajax({
		type:"POST",
		url: "functions/get_student_by_id.php",
		data: ({student_id: elem.id}),
		success: function(data){
			var columns = data.split('#');

			var fio = document.createElement('div');
			var info = document.createElement('div');
			var lp = document.createElement('div');
			var save = document.createElement('button');
			var cancel = document.createElement('button');

			fio.className = "column";
			info.className = "column";
			lp.className = "column";

			var surname = document.createElement('input');
			var name = document.createElement('input');
			var patronymic = document.createElement('input');

			surname.className = "stud_input";
			name.className = "stud_input";
			patronymic.className = "stud_input";

			surname.type = 'text';
			name.type = 'text';
			patronymic.type = 'text';

			surname.placeholder = 'Фамилия';
			name.placeholder = 'Имя';
			patronymic.placeholder = 'Отчество';

			surname.value = String(columns[2]);
			name.value = String(columns[1]);
			patronymic.value = String(columns[3]);

			var tel = document.createElement('input');
			var email = document.createElement('input');

			tel.className = "stud_input";
			email.className = "stud_input";

			tel.type = 'text';
			email.type = 'text';

			tel.placeholder = 'Телефон';
			email.placeholder = 'Email';

			tel.value = String(columns[4]);
			email.value = String(columns[5]);

			var login = document.createElement('input');
			var pass = document.createElement('input');

			login.className = "stud_input";
			pass.className = "stud_input";

			login.type = 'text';
			pass.type = 'text';

			login.placeholder = 'Логин';
			pass.placeholder = 'Пароль';

			login.value = String(columns[6]);
			pass.value = String(columns[7]);

			save.innerHTML = 'СОХРАНИТЬ';
			cancel.innerHTML = 'ОТМЕНА';

			save.onclick = save_student;
			cancel.onclick = student_cancel;

			fio.appendChild(surname);
			fio.appendChild(name);
			fio.appendChild(patronymic);

			info.appendChild(tel);
			info.appendChild(email);

			lp.appendChild(login);
			lp.appendChild(pass);

			elem.appendChild(fio);
			elem.appendChild(info);
			elem.appendChild(lp);
			elem.appendChild(save);
			elem.appendChild(cancel);
		}
	});
}

// функция отображения списка студентов
function print_students(data) {
	var groups_num = data.split('#');

	for (var i = 0; i < groups_num.length; i++) 
	{
		create_group_table(groups_num[i]);

		$.ajax({
			type:"POST",
			url: "functions/get_students_id_by_group.php",
			data: ({group_num: groups_num[i]}),
			success: function(data1){
				if (data1 != "") {
					var students_id = data1.split('#');

					for (var j = 0; j < students_id.length; j++)
					{
						$.ajax({
							type:"POST",
							url: "functions/get_student_by_id.php",
							data: ({student_id: students_id[j]}),
							success: function(data2){
								var columns = data2.split('#');

								var row = document.createElement('div');
								row.className = "student_row";
								row.id = columns[0];

								var id = document.createElement('div');
								var fio = document.createElement('div');
								var info = document.createElement('div');
								var lp = document.createElement('div');
								var update = document.createElement('button');
								var deletee = document.createElement('button');

								id.className = "column";
								fio.className = "column";
								info.className = "column";
								lp.className = "column";

								id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";

								fio.innerHTML = "<div class='st_fio'><strong>" + String(columns[2]) +"</strong></div>" +
												"<div class='st_fio'><strong>" + String(columns[1]) +"</strong></div>" +
												"<div class='st_fio'><strong>" + String(columns[3]) +"</strong></div>";

								var tel = document.createElement('p');
								var email = document.createElement('p');

								tel.innerHTML = "<strong>" + String(columns[4]) +"</strong>";
								email.innerHTML = "<strong>" + String(columns[5]) +"</strong>";

								var login = document.createElement('p');
								var pass = document.createElement('p');

								login.innerHTML = "<div class='st_lpi'>Логин:</div><div class='st_lp'><strong>" + String(columns[6]) + "</strong></div>";
								pass.innerHTML = "<div class='st_lpi'>Пароль:</div><div class='st_lp'><strong>" + String(columns[7]) + "</strong></div>";

								update.innerHTML = "ИЗМЕНИТЬ";
								deletee.innerHTML = "УДАЛИТЬ";

								update.onclick = update_student;
								deletee.onclick = delete_student;


								info.appendChild(tel);
								info.appendChild(email);

								lp.appendChild(login);
								lp.appendChild(pass);

								row.appendChild(id);
								row.appendChild(fio);
								row.appendChild(info);
								row.appendChild(lp);
								row.appendChild(update);
								row.appendChild(deletee);

								var elem = document.getElementById(String(columns[8]));

								elem.appendChild(row);
							}
						});
					}
				}
			}
		});	
	}
					
}

// функция обновления списка студентов
function update_students_list() {
	var elem = document.getElementById('global_students_table');
	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_students
	});
}

// Блок редактирования студентов
function edit_students(){
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";

	div.innerHTML = "<p><strong>СТУДЕНТЫ</strong><img src='Images/update.png' class='update_button' onclick='update_students_list()'></p>" +
					"<hr color='#EEEEF2'>" +
					"<div id='global_students_table'></div>";

	elem.appendChild(div);

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_students
	});
}

// функция добавления нового студента
function add_new_student() {
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/insert_student.php",
		data: ({surname: elem.childNodes[0].value,
				name: elem.childNodes[1].value,
				patronymic: elem.childNodes[2].value,
				tel: elem.childNodes[3].value,
				email: elem.childNodes[4].value,
				login: elem.childNodes[5].value,
				pass: elem.childNodes[6].value,
				group_num: elem.childNodes[7].value}),
		success: function(data){
			alert(data);
		}
	});	
}

// блок добавления студента
function add_student() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block table";
	
	var p = document.createElement('p');
	p.className = "block_title";
	p.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ДОБАВЛЕНИЕ СТУДЕНТОВ</strong><img src='Images/right_arrow.png' align='bottom'>";

	var dform = document.createElement('div');
	dform.className = "form";

	var fam = document.createElement('input');
	var name = document.createElement('input');
	var otch = document.createElement('input');
	var tel = document.createElement('input');
	var email = document.createElement('input');
	var login = document.createElement('input');
	var pass = document.createElement('input');
	var	group = document.createElement('select');

	fam.className = "form_input";
	name.className = "form_input";
	otch.className = "form_input";
	tel.className = "form_input";
	email.className = "form_input";
	login.className = "form_input";
	pass.className = "form_input";
	group.className = "form_select";

	fam.type = "text";
	name.type = "text";
	otch.type = "text";
	tel.type = "text";
	email.type = "text";
	login.type = "text";
	pass.type = "text";

	fam.placeholder = "Фамилия";
	name.placeholder = "Имя";
	otch.placeholder = "Отчество";
	tel.placeholder = "Телефон";
	email.placeholder = "E-mail";
	login.placeholder = "Логин";
	pass.placeholder = "Пароль";

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: function(data) {
			var groups = data.split('#');

			for (var i = 0; i < groups.length; i++) 
			{
				var option = document.createElement('option');
				option.value = groups[i];
				option.text = String(groups[i]);

				group.appendChild(option);
			}
		}
	});

	var button = document.createElement('button');

	button.className = "form_button";
    button.innerHTML = "ДОБАВИТЬ";
    button.onclick = add_new_student;

	dform.appendChild(fam);
	dform.appendChild(name);
	dform.appendChild(otch);
	dform.appendChild(tel);
	dform.appendChild(email);
	dform.appendChild(login);
 	dform.appendChild(pass); 
 	dform.appendChild(group);
 	dform.appendChild(button);  

	div.appendChild(p);
	div.appendChild(dform);
	elem.appendChild(div);
}

//*************************************************
//			ФУНКЦИ ДЛЯ УЧЕБНЫХ ДИСЦИПЛИН

// функция отмены удаления учебной дисциплины
function no_delete_subject() {
	var elem = this.parentElement;

	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var update = document.createElement('button');
	var deletee = document.createElement('button');

	update.innerHTML = "ИЗМЕНИТЬ";
	deletee.innerHTML = "УДАЛИТЬ";

	update.onclick = update_subject;
	deletee.onclick = delete_subject;

	elem.appendChild(update);
	elem.appendChild(deletee);
}

// функция подтверждения удаления учебной дисцилины 
function yes_delete_subject() {
	var elem = this.parentElement;

	$.ajax({
		type:"POST",
		url: "functions/delete_subject.php",
		data: ({subject_id: elem.id}),
		success: function(data){
			alert(data);
		}
	});

	elem.remove();
}

// функция удаления учебной дисциплины
function delete_subject() {
	var elem = this.parentElement;

	for (var i = 0; i < 2; i++) {
		elem.removeChild(elem.lastChild);
	}

	var yes = document.createElement('button');
	var no = document.createElement('button');

	yes.innerHTML = 'ДА';
	no.innerHTML = 'НЕТ';

	yes.className = 'yes_button';

	yes.onclick = yes_delete_subject;
	no.onclick = no_delete_subject;

	elem.appendChild(yes);
	elem.appendChild(no);
}

// функция отмена изменения учебной дисциплины
function subject_cancel() {
	var elem = this.parentElement;

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_subject_by_id.php",
		data: ({subject_id: elem.id}),
		success: function(data1) {
			var columns = data1.split('#');

			var id = document.createElement('div');
			var name = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			id.className = 's_row_id';
			name.className = 's_row_name';

			id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
			name.innerHTML = "<strong>" + String(columns[1]) + "</strong>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_subject;
			deletee.onclick = delete_subject;

			elem.appendChild(id);
			elem.appendChild(name);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// функция сохранения внесенных изменений в наименование учебной дисциплины
function save_subject() {
	var elem = this.parentElement;

	$.ajax({
		type: "POST",
		url: "functions/update_subject.php",
		data: ({subject_id: elem.id,
				subject_name: elem.childNodes[1].firstChild.value}),
		success: function(data) {
			alert(data);
		}
	});

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_subject_by_id.php",
		data: ({subject_id: elem.id}),
		success: function(data1) {
			var columns = data1.split('#');

			var id = document.createElement('div');
			var name = document.createElement('div');
			var update = document.createElement('button');
			var deletee = document.createElement('button');

			id.className = 's_row_id';
			name.className = 's_row_name';

			id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
			name.innerHTML = "<strong>" + String(columns[1]) + "</strong>";

			update.innerHTML = "ИЗМЕНИТЬ";
			deletee.innerHTML = "УДАЛИТЬ";

			update.onclick = update_subject;
			deletee.onclick = delete_subject;

			elem.appendChild(id);
			elem.appendChild(name);
			elem.appendChild(update);
			elem.appendChild(deletee);
		}
	});
}

// функция обновления учебной дисциплины
function update_subject() {
	var elem = this.parentElement;

	for (var i = 0; i < 3; i++) {
		elem.removeChild(elem.lastChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_subject_by_id.php",
		data: ({subject_id: elem.id}),
		success: function(data) {
			var columns = data.split('#');

			var name = document.createElement('input');
			var div = document.createElement('div');
			var save = document.createElement('button');
			var cancel = document.createElement('button');

			div.className = 's_row_name';

			name.type = 'text';
			name.placeholder = 'Наименование';
			name.value = String(columns[1]);

			save.innerHTML = 'СОХРАНИТЬ';
			cancel.innerHTML = 'ОТМЕНА';

			save.onclick = save_subject;
			cancel.onclick = subject_cancel;

			div.appendChild(name);

			elem.appendChild(div);
			elem.appendChild(save);
			elem.appendChild(cancel);
		}
	});
}

// функция отображения списка учебных дисциплин
function print_subjects(data) {
	var ids = data.split('#');

	var elem = document.getElementById('subjects_table');

	for (var i = 0; i < ids.length; i++) {
		$.ajax({
			type: "POST",
			url: "functions/get_subject_by_id.php",
			data: ({subject_id: ids[i]}),
			success: function(data1) {
				var columns = data1.split('#');

				var row = document.createElement('p');
				row.className = 'subject_row';
				row.id = columns[0];

				var id = document.createElement('div');
				var name = document.createElement('div');
				var update = document.createElement('button');
				var deletee = document.createElement('button');

				id.className = 's_row_id';
				name.className = 's_row_name';

				id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";
				name.innerHTML = "<strong>" + String(columns[1]) + "</strong>";

				update.innerHTML = "ИЗМЕНИТЬ";
				deletee.innerHTML = "УДАЛИТЬ";

				update.onclick = update_subject;
				deletee.onclick = delete_subject;

				row.appendChild(id);
				row.appendChild(name);
				row.appendChild(update);
				row.appendChild(deletee);

				elem.appendChild(row);
			}
		});
	}
}

// функция обновления списка учебных дисциплин
function update_subject_list() {
	var elem = document.getElementById('subjects_table');

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_subjects_id.php",
		cache: false,
		success: print_subjects
	});
}

// блок редактирования списка учебных дисциплин
function edit_subjects() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";

	div.innerHTML = "<p><strong>УЧЕБНЫЕ ДИСЦИПЛИНЫ</strong><img src='Images/update.png' class='update_button' onclick='update_subject_list()'></p>" +
					"<hr color='#EEEEF2'>" +
					"<div class='sub_table_head'>" +
						"<div class='sub_head_id'><strong>ID</strong></div>" +
						"<div class='sub_head_name'><strong>НАИМЕНОВАНИЕ</strong></div>" +
					"</div>" +
					"<div id='subjects_table'></div>";

	elem.appendChild(div);

	$.ajax({
		type: "POST",
		url: "functions/get_subjects_id.php",
		cache: false,
		success: print_subjects
	});
}

// функция добавления новой учебной дисциплины
function add_new_subject() {
	var elem = this.parentElement;

	$.ajax({
		type: "POST",
		url: "functions/insert_subject.php",
		data: ({subject_name: elem.firstChild.value}),
		success: function(data) {
			alert(data);
		}
	});
}

// блок добавления учебной дисциплины
function add_subject() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block table";
	
	var p = document.createElement('p');
	p.className = "block_title";
	p.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ДОБАВЛЕНИЕ УЧЕБНЫХ ДИСЦИПЛИН</strong><img src='Images/right_arrow.png' align='bottom'>";

	var form = document.createElement('div');
	var input = document.createElement('input');
	var button = document.createElement('button');

	form.className = 'form';

	input.className = 'subject_input';
	input.type = 'text';
	input.placeholder = 'Наименование предмета';

	button.className = "form_button";
    button.innerHTML = "ДОБАВИТЬ";
    button.onclick = add_new_subject;

	div.appendChild(p);

	form.appendChild(input);
	form.appendChild(button);

	div.appendChild(form);

	elem.appendChild(div);
}


//*************************************************
//			ФУНКЦИИ РЕДАКТИРОВАНИЯ РАСПИСАНИЯ

// функция создания таблицы расписания для группы
function create_schedule_table(data) {
	var elem = document.getElementById('global_schedule_table');

	var div = document.createElement('div');
	div.id = data;
	div.className = 'schedule_table';

	var p = document.createElement('p');
	p.innerHTML = "<div>Номер группы: </div><strong>" + String(data) + "</strong><img src='Images/down_arrow.png'>";
	p.className = 'schedule_group_num';

	var menu = document.createElement('p');
	menu.className = "schedule_table_head";
	menu.innerHTML = "<div class='sch_name'><strong>НАИМЕНОВАНИЕ ПРЕДМЕТА</strong></div>" +
					 "<div class='sch_teacher'><strong>ПРЕПОДАВАТЕЛЬ</strong></div>";

	div.appendChild(p);
	div.appendChild(menu);

	elem.appendChild(div);
}

// функция подтверждения удаления строки расписания
function yes_delete_schedule() {
	var elem = this.parentElement;

	$.ajax({
		type: "POST",
		url: "functions/delete_schedule.php",
		data: ({group_num: elem.parentElement.id,
				subject_id: elem.childNodes[0].firstChild.id,
				teacher_id: elem.childNodes[1].firstChild.id}),
		success: function(data) {
			alert(data);
		}
	});

	elem.remove();	
}

// функция отмены удаления строки из расписания 
function no_delete_schedule() {
	var elem = this.parentElement;

	elem.lastChild.remove();
	elem.lastChild.remove();

	var deletee = document.createElement('button');

	deletee.className = 'delete_button';

	deletee.innerHTML = "УДАЛИТЬ";

	deletee.onclick = delete_schedule;

	elem.appendChild(deletee);

}

// функция удаления строки из расписания
function delete_schedule() {
	var elem = this.parentElement;

	elem.lastChild.remove();

	var yes = document.createElement('button');
	var no = document.createElement('button');

	yes.className = 'yes_button';
	no.className = 'no_button';

	yes.innerHTML = 'ДА';
	no.innerHTML = 'НЕТ';

	yes.onclick = yes_delete_schedule;
	no.onclick = no_delete_schedule;

	elem.appendChild(yes);
	elem.appendChild(no);

}

// функция отобращения одной строки расписания
function print_one_schedule_row(data) {
	var columns = data.split('#');

	var elem = document.getElementById(columns[0]);

	var row = document.createElement('p');
	var subject = document.createElement('div'); 
	var teacher = document.createElement('div');
	var deletee = document.createElement('button');

	deletee.className = 'delete_button';

	row.className = 'schedule_row';
	subject.className = 'schedule_subject';
	teacher.className = 'schedule_teacher';

	deletee.innerHTML = "УДАЛИТЬ";

	deletee.onclick = delete_schedule;
	
	$.ajax({
		type:"POST",
		url: "functions/get_subject_by_id.php",
		data: ({subject_id: columns[1]}),
		success: function(data1) {
			var columns1 = data1.split('#');

			var inp1 = document.createElement('div');

			inp1.id = columns1[0];
			inp1.innerHTML = "<strong>" + String(columns1[1]) + "</strong>";

			subject.appendChild(inp1);
		}
	});

	$.ajax({
		type:"POST",
		url: "functions/get_teacher_by_id.php",
		data: ({teacher_id: columns[2]}),
		success: function(data2) {
			var columns2 = data2.split('#');

			var inp2 = document.createElement('div');

			inp2.id = columns2[0];
			inp2.innerHTML = "<strong>" + String(columns2[2]) + " " + String(columns2[1]) + " " + String(columns2[3]) + "</strong>";

			teacher.appendChild(inp2);
		}
	});

	row.appendChild(subject);
	row.appendChild(teacher);
	row.appendChild(deletee);

	elem.appendChild(row);

}

// функция добавления рассписания
function add_schedule() {
	var elem = this.parentElement;

	$.ajax({
		type: "POST",
		url: "functions/add_schedule.php",
		data: ({group_num: elem.parentElement.id,
				subject_id: elem.childNodes[0].firstChild.value,
				teacher_id: elem.childNodes[1].firstChild.value}),
		success: function(data) {
			alert(data);

			if (data == 'Новая строка расписания успешно добавлена.') 
			{
				var str = String(elem.parentElement.id) + "#" +
			   			  String(elem.childNodes[0].firstChild.value) + "#" +
			  			  String(elem.childNodes[1].firstChild.value);

				print_one_schedule_row(str);
			}
		}
	});
}

// 
function print_one_add_row(data) {
	var elem = document.getElementById(data);

	var add_row = document.createElement('p');
	var subject = document.createElement('div'); 
	var teacher = document.createElement('div');
	var add = document.createElement('button')

	var select1 = document.createElement('select');
	var select2 = document.createElement('select');

	add_row.className = 'add_row';

	subject.className = 'schedule_subject';
	teacher.className = 'schedule_teacher';

	add.innerHTML = 'ДОБАВИТЬ';
	add.onclick = add_schedule;

	// получить все предметыы
	$.ajax({
		type: "POST",
		url: "functions/get_all_subjects.php",
		cache: false,
		success: function(data) {
			var rows = data.split('/');

			for (var i = 0; i < rows.length - 1; i++) 
			{	
				var sub_data = rows[i].split('#');

				var option1 = document.createElement('option');

				option1.value = sub_data[0];
				option1.text = String(sub_data[1]);

				select1.appendChild(option1);
			}
		}
	});

	// получить всех преподавателей
	$.ajax({
		type: "POST",
		url: "functions/get_all_teachers.php",
		cache: false,
		success: function(data) {
			var rows = data.split('/');

			for (var i = 0; i < rows.length - 1; i++) 
			{	
				var tea_data = rows[i].split('#');

				var option2 = document.createElement('option');

				option2.value = tea_data[0];
				option2.text = String(tea_data[1]) + " " + String(tea_data[2]) + " " + String(tea_data[3]);

				select2.appendChild(option2);
			}
		}
	});

	subject.appendChild(select1);
	teacher.appendChild(select2);

	add_row.appendChild(subject);
	add_row.appendChild(teacher);
	add_row.appendChild(add);

	elem.appendChild(add_row);
}

// функциядобаления строк добавления в каждую таблицу
function print_add_rows() {
	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: function(data) {
			var groups = data.split('#');

			for (var i = 0; i < groups.length; i++) 
			{
			 	print_one_add_row(groups[i]);
			} 
		}
	});
}

// функция отображения строк расписания
function print_schedule_rows(data) {
	var rows = data.split('/');

	for (var i = 0; i < rows.length - 1; i++) 
	{	
		print_one_schedule_row(rows[i]);
	}
}


// функция отображения рассписания
function print_schedule(data) {
	var groups_num = data.split('#');

	for (var i = 0; i < groups_num.length; i++) 
	{
		create_schedule_table(groups_num[i]);

		$.ajax({
			type:"POST",
			url: "functions/get_schedule_by_group_num.php",
			data: ({group_num: groups_num[i]}),
			success: print_schedule_rows
		});
	}
}

// блок редактирования рассписания
function edit_schedule() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block";

	div.innerHTML = "<p><strong>РАСПИСАНИЕ</strong><img src='Images/update.png' class='update_button' onclick='update_schedule_list()'></p>" +
					"<hr color='#EEEEF2'>" +
					"<div id='global_schedule_table'></div>";

	elem.appendChild(div);

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_schedule
	});
}

// функция обновления расписания
function update_schedule_list() {
	var elem = document.getElementById('global_schedule_table');

	while (elem.firstChild) {
    	elem.removeChild(elem.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_num_groups.php",
		cache: false,
		success: print_schedule
	});

	print_add_rows();
}

//*************************************************
//				ФУНКЦИИ РАБОТЫ С ОТЧЕТАМИ

// функция добавления нового отчета


function add_report() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	div.className = "block table";

	var label = document.createElement('p');

	label.className = 'block_title';

	label.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ДОБАВЛЕНИЕ ОТЧЕТОВ</strong><img src='Images/right_arrow.png' align='bottom'>";

	var p = document.createElement('p');

	p.className = 'add_report_form';

	p.innerHTML = "<input name='student_id' id='student_id' class='report_student_id_input' placeholder='ID студента'>" +
				  "<input name='subject_id' id='subject_id' class='report_subject_id_input' placeholder='ID предмета'>" +
				  "<input class='file_name' id='file_name' disabled>" +
				  "<label for='fileadd' class='button'>Choose file</label>" +
			   	  "<input type='file' id='fileadd' name='filename' class='show-for-sr' onchange='special_foo()'>" +
				  "<button id='fileupload'>ДОБАВИТЬ</button>";

	div.appendChild(label);
	div.appendChild(p);

	elem.appendChild(div);
}


function print_one_report(data) {
	var columns = data.split('#');

	var data_area = document.getElementById('data_report_by_id');
	var div_id = document.createElement('div');
	var div_student = document.createElement('div');
	var div_subject = document.createElement('div');
	var div_pdf = document.createElement('div');
	var form_view = document.createElement('form');

	div_id.className = 'rbi_id';
	div_student.className = 'rbi_stu';
	div_subject.className = 'rbi_sub';
	div_pdf.className = 'rbi_form';

	div_id.innerHTML = "<div class='rbi_info'><strong>ID ОТЧЕТА</strong></div><div class='rbi_data'><strong>" + String(columns[0]) + "</strong></div>";
	data_area.appendChild(div_id);

	$.ajax({
		type: "POST",
		url: "functions/get_student_by_id.php",
		cache: false,
		data: ({student_id: columns[1]}),
		success: function(data) {
			var columns = data.split('#');

			div_student.innerHTML =  "<div class='rbi_info'><strong>СТУДЕНТ</strong></div></div><div class='rbi_data'><strong>" + 
										String(columns[2]) + " " + String(columns[1]) + " " + String(columns[3]) + 
										"</strong></div>";

			data_area.appendChild(div_student);
		}
	});

	$.ajax({
		type: "POST",
		url: "functions/get_subject_by_id.php",
		cache: false,
		data: ({subject_id: columns[2]}),
		success: function(data) {
			var columns = data.split('#');

			div_subject.innerHTML = "<div class='rbi_info'><strong>ПРЕДМЕТ</strong></div></div><div class='rbi_data'><strong>" + String(columns[1]) +
									"</strong></div>";
			
			data_area.appendChild(div_subject);
		}
	});

	var pdf = document.createElement('div');
	pdf.innerHTML = "<strong>PDF</strong>";
	pdf.className = 'rbi_info';

	form_view.method = 'post';
	form_view.action = 'pdf_viewer.php';
	form_view.target = '_blank';

	form_view.innerHTML = "<input type='text' name='file_name' value='" + String(columns[3]) + "'><button type='submit'>ПРОСМОТР</button>";

	div_pdf.appendChild(pdf);
	div_pdf.appendChild(form_view);

	data_area.appendChild(div_pdf);
}

function show_report_by_id() {
	var elem = this.parentElement;

	var table = document.getElementById('data_report_by_id');

	while (table.firstChild) {
    	table.removeChild(table.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_report_by_id.php",
		cache: false,
		data: ({report_id: elem.firstChild.value}),
		success: function(data) {
			if (data == 'Ошибка: отчета с таким номером не существует.') 
			{
				alert(data);
			}
			else 
			{
				print_one_report(data);
			}
		}
	});
}

function view_report_by_id() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	var label = document.createElement('p');
	var form = document.createElement('p');
	var input = document.createElement('input');
	var button = document.createElement('button');
	var data_area = document.createElement('div');

	div.className = "block table";	

	label.className = 'block_title';
	label.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ПРОСМОТР ОТЧЕТОВ (по id отчета)</strong><img src='Images/right_arrow.png' align='bottom'>";

	form.className = 'form_report_by_id';

	input.type = 'text';
	input.id = 'subject_id_input';
	input.placeholder = 'ID отчета';

	button.innerHTML = 'НАЙТИ';
	button.onclick = show_report_by_id;

	data_area.id = 'data_report_by_id';

	form.appendChild(input);
	form.appendChild(button);

	div.appendChild(label);
	div.appendChild(form);
	div.appendChild(data_area);

	elem.appendChild(div);
}

function delete_report_by_id() {
	var elem = this.parentElement;

	$.ajax({
		type: "POST",
		url: "delete_report_by_id.php",
		cache: false,
		data: ({report_id: elem.firstChild.value}),
		success: function(data) {
			alert(data);
		}
	});
}

function delete_report() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	var label = document.createElement('p');
	var form = document.createElement('p');
	var input = document.createElement('input');
	var button = document.createElement('button');
	var data_area = document.createElement('div');

	div.className = "block table";	

	label.className = 'block_title';
	label.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>УДАЛЕНИЕ ОТЧЕТОВ</strong><img src='Images/right_arrow.png' align='bottom'>";

	form.className = 'form_report_by_id';

	input.type = 'text';
	input.id = 'delete_subject_id_input';
	input.placeholder = 'ID отчета';

	button.innerHTML = 'НАЙТИ';
	button.onclick = delete_report_by_id;

	data_area.id = 'delete_report_by_id';

	form.appendChild(input);
	form.appendChild(button);

	div.appendChild(label);
	div.appendChild(form);
	div.appendChild(data_area);

	elem.appendChild(div);
}

function print_one_report_from_list(data) {
	var columns = data.split('#');

	var elem = document.getElementById('reports_table');
	var row = document.createElement('p');
	var id = document.createElement('div');
	var student = document.createElement('div');
	var subject = document.createElement('div');
	var button = document.createElement('button');
	var div_but = document.createElement('div');

	row.className = 'report_row';
	id.className = 'id';
	student.className = 'stud';
	subject.className = 'sub';
	div_but.className = 'pdf';

	id.innerHTML = "<strong>" + String(columns[0]) + "</strong>";

	$.ajax({
		type: "POST",
		url: "functions/get_student_by_id.php",
		cache: false,
		data: ({student_id: columns[1]}),
		success: function(data) {
			var columns = data.split('#');

			student.innerHTML =  "<strong>" + String(columns[2]) + " " + String(columns[1]) + " " + String(columns[3]) + "</strong>";
		}
	});

	$.ajax({
		type: "POST",
		url: "functions/get_subject_by_id.php",
		cache: false,
		data: ({subject_id: columns[2]}),
		success: function(data) {
			var columns = data.split('#');

			subject.innerHTML = "<strong>" + String(columns[1]) + "</strong>";
		}
	});

	button.innerHTML = 'ПРОСМОТР';

	div_but.appendChild(button);

	row.appendChild(id);
	row.appendChild(student);
	row.appendChild(subject);
	row.appendChild(div_but);


	elem.appendChild(row);
}

function print_reports_rows(data) {
	var rows = data.split('/');

	for (var i = 0; i < rows.length - 1; i++)
	{
		print_one_report_from_list(rows[i]);
	}
}


function show_reports_by_student() {
	var elem = this.parentElement;

	var table = document.getElementById('reports_table');

	while (table.firstChild) {
    	table.removeChild(table.firstChild);
	}

	$.ajax({
		type: "POST",
		url: "functions/get_reports_by_student.php",
		cache: false,
		data: ({student_id: elem.firstChild.value}),
		success: print_reports_rows
	});
} 

function view_report_by_student() {
	var elem = document.getElementById('content');

	var div = document.createElement('div');
	var label = document.createElement('p');
	var form = document.createElement('p');
	var input = document.createElement('input');
	var button = document.createElement('button');
	var table_head = document.createElement('p');
	var table = document.createElement('div');

	div.className = "block table";	

	label.className = 'block_title';
	label.innerHTML = "<img src='Images/left_arrow.png' align='bottom'><strong>ПРОСМОТР ОТЧЕТОВ СТУДЕНТОВ</strong><img src='Images/right_arrow.png' align='bottom'>";

	form.className = 'form_report_by_id';

	input.type = 'text';
	input.id = 'student_id_input';
	input.placeholder = 'ID студента';

	button.innerHTML = 'НАЙТИ';
	button.onclick = show_reports_by_student;

	table_head.className = 'show_reports_table_head';
	table_head.innerHTML = "<div class='id'><strong>ID ОТЧЕТА</strong></div>" +
							"<div class='stud'><strong>СТУДЕНТ</strong></div>" +
							"<div class='sub'><strong>ПРЕДМЕТ</strong></div>" +
							"<div class='pdf'><strong>PDF</strong></div>";

	table.id = "reports_table";

	form.appendChild(input);
	form.appendChild(button);

	div.appendChild(label);
	div.appendChild(form);
	div.appendChild(table_head);
	div.appendChild(table);

	elem.appendChild(div);
}


//*************************************************
// вкладка группы
function groups() {
	delete_content();

	// шапка
	hat("ГРУППЫ");
	// блок редактирования групп
	edit_group();
	// блок добавления групп
	add_group();
}

// вкладка преподаватели
function teachers() {
	delete_content();

	// шапка
	hat("ПРЕПОДАВАТЕЛИ");
	// блок редактирования преподавателей
	edit_teachers();
	// блок добавления преподавателя
	add_teacher();
}

// вкладка студеты
function students() {
	delete_content();

	// шапка
	hat("СТУДЕНТЫ");
	// блок редактирования студентов
	edit_students();
	// блок добавления студента
	add_student();

}

// вкладка учебные дисциплины
function subjects() {
	delete_content();

	// шапка 
	hat("УЧЕБНЫЕ ДИСЦИПЛИНЫ");
	// блок редактирования учебных дсциплин
	edit_subjects();
	// блок добавления учебных дисциплин
	add_subject();
}

// вкладка учебные планы
function academic_plans() {
	delete_content();

	// шапка
	hat("РАСПИСАНИЕ");
	// блок редактирования расписания
	edit_schedule();
	// мини блоки добавления строк в расписание по группам
	print_add_rows();
}

// вкладка отчеты
function reports() {
	delete_content();

	// шапка
	hat("ОТЧЕТЫ");
	// блок просмотра отчетов по id студента 
	view_report_by_student();
	// блок добавления отчета
	add_report();
	// блок просмотра отчетов студента по id
	view_report_by_id();
	// юлок для удаления отчетов по id
	delete_report();
}

// спец функция
function special_foo(){
	var elem = document.getElementById('fileadd');
	document.getElementById('file_name').value = elem.value.match(/[^\/\\]+$/);
}


$(document).on("click", "#fileupload", function() {
	var file_data = $("#fileadd").prop("files")[0];
	var form_data = new FormData();

	form_data.append("file", file_data);

	var stud_id = document.getElementById('student_id');
	var sub_id = document.getElementById('subject_id');

	form_data.append("student_id", stud_id.value);
	form_data.append("subject_id", sub_id.value);

	$.ajax({
    	url: "upload.php", // Upload Script
   		dataType: 'script',
    	cache: false,
    	contentType: false,
    	processData: false,
    	data: form_data, // Setting the data attribute of ajax with file_data
    	type: 'post',
    	success: function(data) {
      		alert(data);// Do something after Ajax completes 
    	}
  	});
});


 $(document).on("keypress", "#subject_id_input", function(e) {

    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) return;

    var chr = getChar(e);

    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
    // на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;

    if (chr < '0' || chr > '9') {
    	return false;
	}

});


 $(document).on("keypress", "#delete_subject_id_input", function(e) {

    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) return;

    var chr = getChar(e);

    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
    // на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;

    if (chr < '0' || chr > '9') {
    	return false;
	}

});

function getChar(event) {
    if (event.which == null) {
    	if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }

    return null; // специальная клавиша
}











/*$(function(){
  $('#my_form').on('submit', function(e){
    e.preventDefault();
    var $that = $(this),
    formData = new FormData($that.get(0));
    formData.append('date_upl', new Date()); 

	alert($that.action);

   $.ajax({
      	url: $that.action,
     	 type: $that.method,
      	contentType: false,
      	processData: false,
      	data: formData,
      	dataType: 'json',
      	success: function(json){
        	alert(data);
      	}
    	});
  });
});*/