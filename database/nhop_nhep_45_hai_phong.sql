create database nhop_nhep_restaurant;
use nhop_nhep_restaurant;
create table employee_nn(
id int not null primary key auto_increment,
code_employee varchar(55),
name_employee varchar(255),
address_employee varchar(255),
username varchar(255),
`password` varchar(255)
);
create table roles_nn(
id int not null primary key,
name_roles varchar(65),
constraint uc_roles_name unique(name_roles)
);

create table roles_employee_nn(
employee_id int, 
roles_id int,
primary key (employee_id,roles_id),
foreign key (employee_id) references employee_nn(id),
foreign key (roles_id) references roles_nn(id) 
);

create table food_type_nn(
id int not null primary key,
name_type varchar(255)
);
create table food_nn(
id int not null primary key auto_increment,
name_food varchar(255),
price_food double,
 food_type_id int,
 foreign key (food_type_id) references food_type_nn(id)
);
create table location_nn(
id int not null primary key, 
name_location varchar(55)
);
create table table_nn(
id int not null primary key,
customer_numbers int not null,
location_id int,
foreign key (location_id) references location_nn(id)
);

create table order_table_nn(
id int not null ,
table_id int,
food_id int,
foreign key (table_id) references table_nn(id),
foreign key (food_id) references food_nn(id)
);