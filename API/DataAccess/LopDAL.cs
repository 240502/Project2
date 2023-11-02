using System;
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

        public List<LopModel> getLop( int?pageSize, int?pageIndex ,out int total)
        {
            List<LopModel> listLop = new List<LopModel>();
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Lop","@pageIndex","@pageSize",pageIndex,pageSize);
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
    }
}
