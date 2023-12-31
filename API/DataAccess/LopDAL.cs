﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Helper;
using Model;

namespace DataAccess
{
    public class LopDAL
    {
        DataHelper helper = new DataHelper();

        public List<LopModel> GetAll()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetAll_Lop");
                if (tb != null)
                {
                    List<LopModel> list = new List<LopModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        LopModel model = new LopModel();
                        model.MaLop = tb.Rows[i]["MaLop"].ToString();
                        model.TenLop = tb.Rows[i]["TenLop"].ToString();
                        model.SiSo = int.Parse(tb.Rows[i]["MaLop"].ToString());
                        model.MaKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        list.Add(model);
                    }
                    return list;
                }
                else return null;

            }catch(Exception ex)
            {
                return null;
            }
        }

        public List<LopModel> getLop( int?pageSize, int?pageIndex ,string makhoa,out int total)
        {
            List<LopModel> listLop = new List<LopModel>();
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Lop","@pageIndex","@pageSize","@makhoa",pageIndex,pageSize,makhoa);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        LopModel lop = new LopModel();
                        lop.MaLop =  tb.Rows[i]["MaLop"].ToString();
                        lop.TenLop = tb.Rows[i]["TenLop"].ToString();
                        lop.MaKhoa =  tb.Rows[i]["MaKhoa"] == DBNull.Value ? "" : tb.Rows[i]["MaKhoa"].ToString();
                        lop.SiSo = tb.Rows[i]["SiSo"] == DBNull.Value ?  0:  int.Parse(tb.Rows[i]["SiSo"].ToString());
                        listLop.Add(lop);
                    }
                    return listLop;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LopModel> GetLop(int? pageIndex, int? pageSize,out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Lop1","@pageIndex","@pageSize",pageIndex,pageSize);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<LopModel> listLop = new List<LopModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        LopModel lop = new LopModel();
                        lop.MaLop = tb.Rows[i]["MaLop"].ToString();
                        lop.TenLop = tb.Rows[i]["TenLop"].ToString();
                        lop.MaKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        lop.SiSo = int.Parse(tb.Rows[i]["MaLop"].ToString());
                        listLop.Add(lop);
                    }
                    return listLop;
                }
                else return null;
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public List<LopModel> GetListLop()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("GetListLop");
                if (tb != null)
                {
                    List<LopModel> listLop = new List<LopModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        LopModel lop = new LopModel();
                        lop.MaLop = tb.Rows[i]["MaLop"].ToString();
                        lop.TenLop = tb.Rows[i]["TenLop"].ToString();
                        lop.MaKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        lop.SiSo = int.Parse(tb.Rows[i]["MaLop"].ToString());
                        listLop.Add(lop);
                    }
                    return listLop;
                }
                else return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Create(LopModel lop)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Create_Lop", "@Malop", "@MaKhoa", "@TenLop", "@SiSo",lop.MaLop,lop.MaKhoa,lop.TenLop,lop.SiSo);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(string Malop)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Proc_Delete_Lop", "@Malop",Malop);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(LopModel lop)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Update_Lop","@malop","@tenlop","@makhoa","@siso",lop.MaLop,lop.TenLop,lop.MaKhoa,lop.SiSo);
                return reuslt;

            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<LopModel> SearchLop(string value, out int total,int pageIndex, int pageSize)
        {
            try
            {
                total = 0;
                DataTable tb = helper.ExcuteReader("Pro_Search_Lop","@value","@pageIndex","@pageSize",value,pageIndex,pageSize);
                if (tb != null)
                {
                    List<LopModel> list = new List<LopModel>();
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        LopModel lop = new LopModel();
                        lop.MaLop = tb.Rows[i]["MaLop"].ToString();
                        lop.MaKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        lop.TenLop = tb.Rows[i]["TenLop"].ToString();
                        lop.SiSo = int.Parse(tb.Rows[i]["SiSo"].ToString());
                        list.Add(lop);
                    }
                    return list;

                }
                else return null;
            }
            catch(Exception ex){
                throw ex;
            }
        }
    }
}
