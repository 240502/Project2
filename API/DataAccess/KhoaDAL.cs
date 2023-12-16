using DataAccess.Helper;
using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess
{
    public class KhoaDAL
    {
        DataHelper helper = new DataHelper();
        public List<KhoaModel> GetList()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Khoa");
                if (tb != null)
                {
                    List<KhoaModel> list = new List<KhoaModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        KhoaModel model = new KhoaModel();
                        model.MaKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        model.TenKhoa = tb.Rows[i]["TenKhoa"].ToString();
                        list.Add(model);
                    }
                    return list;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public KhoaModel GetByID(string id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Khoa_ById","@maKhoa",id);
                if (tb != null)
                {
                        KhoaModel model = new KhoaModel();
                        model.MaKhoa = tb.Rows[0]["MaKhoa"].ToString();
                        model.TenKhoa = tb.Rows[0]["TenKhoa"].ToString();
                    return model;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
