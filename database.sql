
Create database TestOnline__Demo
use TestOnline__Demo
Create table Khoa(
	 MaKhoa varchar(50) primary key
	 ,TenKhoa nvarchar(100) not null unique
)

exec Pro_GePhanTrang 1,10
drop table ThiSinh
drop table Lop
Create table Lop(
	MaLop varchar(50) primary key,
	TenLop nvarchar(100)not null unique,
	MaKhoa varchar(50) foreign key references Khoa(MaKhoa) on update cascade on delete cascade
	,SiSo int
)
Create table ThiSinh(
	MaThiSinh varchar(100) primary key,
	MaLop varchar(50) foreign key references Lop(MaLop)
	On delete cascade On update cascade not null ,
	Hoten nvarchar(100) not null,
	NgaySinh date not null,
	Gioitinh nvarchar(10) check(Gioitinh in ('Nam',N'Nữ')),
	DiaChi nvarchar(100),
	NhomThi nvarchar(100) not null ,
	[password] varchar(50)
)
create table Users(
	id int identity primary key
	,fullname nvarchar(100),
	workplace nvarchar(100),
	email varchar(100),
	phoneNumber varchar(11),
	[address] nvarchar(100)

)

select * From ThiSinh
select * from Account

Create table Account (
	id int identity primary key,
	username varchar(100),
	[password] varchar(100),
	role_id int foreign key references Role(id)
	on update cascade on delete cascade
	
)
create table [Role]
(
	id int identity primary key,
	roName nvarchar(50) not null unique
)
alter table Account
add user_id int foreign key references Users(id)
on update cascade on delete cascade

Create proc ProGetRoleById
	@id int
As
	Begin
		Select * From Role
		Where id = @id
	End

exec pro_get_thisinh 1,10

create proc GetListLop 
as
	begin
		select * from
		Lop
	end