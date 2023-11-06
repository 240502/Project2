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
                        model.maKhoa = tb.Rows[i]["MaKhoa"].ToString();
                        model.tenKhoa = tb.Rows[i]["TenKhoa"].ToString();
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
    }
}
