
Create database TestOnline__Demo
use TestOnline__Demo
Create table Khoa(
	 MaKhoa varchar(50) primary key
	 ,TenKhoa nvarchar(100) not null unique
)
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

alter proc pro_get_thisinh
@pageIndex int,
	@pageSize int
As 
	Begin Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select (ROW_NUMBER() Over(Order By Hoten)) as RowNumber,
			*
			Into #Result1
			From ThiSinh 
			Select @RecordCount = Count (*)
			From #Result1
			Select *, @RecordCount as RecordCount
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1

		End

		Else 
		Begin
			Select (ROW_NUMBER() Over(Order By Hoten)) as RowNumber,
			*
			Into #Result2
			From ThiSinh 
			Select @RecordCount = Count (*)
			From #Result2
			Select *, @RecordCount as RecordCount
			From #Result2
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #Result2

		End
	End
	create procedure Pro_Insert_ThiSinh
	@mathisinh varchar(100),
	@malop varchar(50),
	@hoten varchar(100),
	@ngaysinh date,
	@gioitinh nvarchar(10)
	,@diachi nvarchar(100),
	@nhomthi nvarchar(100)
As
	Begin
	declare @pass varchar(50)
	set @pass =   ( select rand(6) * 1000000)

		Insert into ThiSinh(MaThiSinh,MaLop,Hoten,NgaySinh,Gioitinh,DiaChi,NhomThi,password)
		values(@mathisinh,@malop,@hoten,@ngaysinh,@gioitinh,@diachi,@nhomthi,SUBSTRING(@pass,0,8))
	End

create procedure Pro_Edit_ThiSinh
@mathisinh varchar(100),
	@malop varchar(50),
	@hoten varchar(100),
	@ngaysinh date,
	@gioitinh nvarchar(10)
	,@diachi nvarchar(100),
	@nhomthi nvarchar(100),
	@pass varchar(50)
As
	Begin
		update ThiSinh
		set MaLop = @malop, Hoten = @hoten,NgaySinh = @ngaysinh,Gioitinh = @gioitinh , DiaChi  = @diachi , NhomThi = @nhomthi,password = @pass
		where MaThiSinh = @mathisinh
	End
Create proc Pro_Delete_ThiSinh
	@mathisinh varchar(100)
As
	Begin
		Delete ThiSinh
		Where MaThiSinh = @mathisinh
	End

create proc pro_get_thisinh_byid
	@id varchar(50)
As
	Begin
		Select * From ThiSinh
		Where MaThiSinh = @id
	End
alter proc pro_Search_ThiSinh
@pageIndex int,
	@pageSize int,
	@value nvarchar(100)
As 
	Begin Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select (ROW_NUMBER() Over(Order By Hoten)) as RowNumber,
			*
			Into #Result1
			From ThiSinh where (MaThiSinh like @value) or (Hoten like '%'+@value) or (Hoten like @value+'%' ) or(DiaChi like '%'+ @value) or (DiaChi like @value + '%')
			Select @RecordCount = Count (*)
			From #Result1
			Select *, @RecordCount as RecordCount
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1

		End

		Else 
		Begin
			Select (ROW_NUMBER() Over(Order By Hoten)) as RowNumber,
			*
			Into #Result2
			From ThiSinh where (MaThiSinh like @value) or (Hoten like '%'+@value) or (Hoten like @value+'%' ) or(DiaChi like '%'+ @value) or (DiaChi like @value + '%')
			Select @RecordCount = Count (*)
			From #Result2
			Select *, @RecordCount as RecordCount
			From #Result2
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #Result2

		End
	End

Create proc Pro_Get_Khoa_ById
@makhoa varchar(50)
as
	begin
		select * from khoa
		where makhoa = @makhoa
	end
Create proc Pro_Get_Khoa
As
	Begin
		Select * From Khoa
	End

Create proc Proc_Delete_Lop
@malop varchar(50)
As
	Begin
		Delete Lop
		Where MaLop = @malop
	End
Create proc Pro_Update_Lop
	@malop varchar(50),
	@tenlop varchar(50),
	@makhoa varchar(50),
	@siso int
AS
	bEGIN
		update lop
		set TenLop = @tenlop , SiSo = @siso ,MaKhoa = @makhoa
		where MaLop = @malop
	eND
Create Procedure [dbo].[Pro_Create_Lop]
	@Malop varchar(10),
	@MaKhoa varchar(10),
	@TenLop varchar(10),
	@SiSo int
As
	Begin
		If(Exists (Select * From Lop Where MaLop = @Malop))
		Begin
			Return -1
		End
		Else
		Begin
			Insert into Lop(MaLop,MaKhoa,TenLop,SiSo)
			Values (@Malop,@MaKhoa,@TenLop,@SiSo)
		End
	End

	Create proc [dbo].[Pro_Get_Lop1]
	@pageIndex int,
	@pageSize int
As 
	Begin Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			*
			Into #Result1
			From Lop
			Select @RecordCount = Count (*)
			From #Result1
			Select *, @RecordCount as RecordCount
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1

		End

		Else 
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			*
			Into #Result2
			From Lop
			Select @RecordCount = Count (*)
			From #Result2
			Select *, @RecordCount as RecordCount
			From #Result2
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #Result2

		End
	End

Create Proc [dbo].[Pro_Get_Lop]
	@pageIndex int,
	@pageSize int
As
	Begin
	Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			*
			Into #Result1
			From Lop
			Select @RecordCount = Count (*)
			From #Result1
			Select *, @RecordCount as RecordCount
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1

		End

		Else 
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			*
			Into #Result2
			From Lop
			Select @RecordCount = Count (*)
			From #Result2
			Select *, @RecordCount as RecordCount
			From #Result2
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #Result2

		End
	End

Create Proc [dbo].[Pro_Search_Lop]
	@value nvarchar(100),
	@pageIndex int,
	@pageSize int
As
	Begin
		Declare @RecordCount int;
		If(@pageSize > 0 )
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			l.MaLop,l.MaKhoa,l.TenLop,l.SiSo
			Into #Result1
			From Lop l inner join Khoa k on l.MaKhoa = k.MaKhoa
			Where (l.MaLop = @value) or ( l.TenLop Like @value) or (CONVERT(nvarchar(100), l.SiSo) like @value) or (l.MaKhoa like @value) or (k.TenKhoa Like @value)
			Select @RecordCount = Count (*)
			From #Result1
			Select *, @RecordCount as RecordCount
			From #Result1
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #result1

		End

		Else 
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo)) as RowNumber,
			l.MaLop,l.MaKhoa,l.TenLop,l.SiSo
			Into #Result2
			From Lop l inner join Khoa k on l.MaKhoa = k.MaKhoa
			Where (l.MaLop = @value) or ( l.TenLop Like @value) or (CONVERT(nvarchar(100), l.SiSo) like @value) or (l.MaKhoa like @value) or (k.TenKhoa Like @value)
			Select @RecordCount = Count (*)
			From #Result2
			Select *, @RecordCount as RecordCount
			From #Result2
			where RowNumber between(@pageIndex-1) * @pageSize+1 and (((@pageIndex-1)*@pageSize+1)+@pageSize)-1
				or @pageIndex =-1
			drop table #Result2

		End
	
	
	End

	create proc Pro_login
	@un varchar(100),
	@pass varchar(100)
	as 
	begin
		select *  from Account
		where username = @un and password = @pass
	end