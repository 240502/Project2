use BTL_NguyenVanSang_12220143_125211
Select * From Lop
alter Procedure Pro_Create_Lop
	@Malop varchar(10),
	@MaKhoa varchar(10),
	@TenLop varchar(10),
	@SiSo int
As
	Begin
		Declare @magv varchar(10)
		Set @magv= 'GV001'
		If(Exists (Select * From Lop Where MaLop = @Malop))
		Begin
			Return -1
		End
		Else
		Begin
			Insert into Lop(MaLop,MaKhoa,MaGVCM,TenLop,SiSo)
			Values (@Malop,@MaKhoa,null,@TenLop,@SiSo)
		End
	End

Exec Pro_Create_Lop 's1a','CNTT','s',10
Create Proc Proc_Delete_Lop
	@malop varchar(10)

As
	Begin
		Delete Lop
		Where MaLop = @malop
	End


	exec Pro_Get_Lop 1,5
exec Pro_Get_Lop1 1,10
alter proc Pro_Get_Lop1
	@pageIndex int,
	@pageSize int
As 
	Begin Declare @RecordCount int
		If(@pageSize > 0)
		Begin
			Select (ROW_NUMBER() Over(Order By SiSo desc)) as RowNumber,
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

Create Proc Pro_Get_Lop
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
Alter proc Pro_Get_Khoa_ById
	@maKhoa varchar(100)
As
Begin
	Select * From Khoa
	Where MaKhoa Like @maKhoa
End
exec Pro_Get_Khoa_ById 'CNTT'
alter Proc Pro_Search_Lop
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
EXEC Pro_Search_Lop 30

