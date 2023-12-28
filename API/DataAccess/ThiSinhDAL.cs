using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Model;
using DataAccess.Helper;
using System.Data;
using System.Reflection.Metadata.Ecma335;
namespace DataAccess
{
    public class ThiSinhDAL
    {
        DataHelper helper = new DataHelper();

        public List<ThiSinhModel> GetAll()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetAll_ThiSinh");
                if (tb != null)
                {
                    List<ThiSinhModel> list = new List<ThiSinhModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThiSinhModel ts = new ThiSinhModel();
                        ts.MaLop = tb.Rows[i]["MaLop"].ToString();
                        ts.MaThiSinh = tb.Rows[i]["MaThiSinh"].ToString();
                        ts.Hoten = tb.Rows[i]["Hoten"].ToString();
                        ts.NgaySinh = DateTime.Parse(tb.Rows[i]["NgaySinh"].ToString());
                        ts.Gioitinh = tb.Rows[i]["Gioitinh"].ToString();
                        ts.DiaChi = tb.Rows[i]["DiaChi"].ToString();
                        ts.NhomThi = tb.Rows[i]["NhomThi"].ToString();
                        ts.password = tb.Rows[i]["password"].ToString();
                        list.Add(ts);

                    }
                    return list;
                }
                else return null;


            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public List<ThiSinhModel> GetList(int? pageIndex, int? pageSize, string malop, out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("pro_get_thisinh", "@pageIndex", "@pageSize", "@malop", pageIndex, pageSize, malop);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<ThiSinhModel> list = new List<ThiSinhModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThiSinhModel ts = new ThiSinhModel();
                        ts.MaLop = tb.Rows[i]["MaLop"].ToString();
                        ts.MaThiSinh = tb.Rows[i]["MaThiSinh"].ToString();
                        ts.Hoten = tb.Rows[i]["Hoten"].ToString();
                        ts.NgaySinh = DateTime.Parse(tb.Rows[i]["NgaySinh"].ToString());
                        ts.Gioitinh = tb.Rows[i]["Gioitinh"].ToString();
                        ts.DiaChi = tb.Rows[i]["DiaChi"].ToString();
                        ts.NhomThi = tb.Rows[i]["NhomThi"].ToString();
                        ts.password = tb.Rows[i]["password"].ToString();
                        list.Add(ts);

                    }
                    return list;
                }
                else return null;


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<ThiSinhModel> Search(int? pageIndex, int? pageSize, string value, out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("pro_Search_ThiSinh", "@pageIndex", "@pageSize", "@value", pageIndex, pageSize, value);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<ThiSinhModel> list = new List<ThiSinhModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThiSinhModel ts = new ThiSinhModel();
                        ts.MaLop = tb.Rows[i]["MaLop"].ToString();
                        ts.MaThiSinh = tb.Rows[i]["MaThiSinh"].ToString();
                        ts.Hoten = tb.Rows[i]["Hoten"].ToString();
                        ts.NgaySinh = DateTime.Parse(tb.Rows[i]["NgaySinh"].ToString());
                        ts.Gioitinh = tb.Rows[i]["Gioitinh"].ToString();
                        ts.DiaChi = tb.Rows[i]["DiaChi"].ToString();
                        ts.NhomThi = tb.Rows[i]["NhomThi"].ToString();
                        ts.password = tb.Rows[i]["password"].ToString();
                        list.Add(ts);

                    }
                    return list;
                }
                else return null;


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ThiSinhModel GetById(string mathisinh)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("pro_get_thisinh_byid", "@id", mathisinh);
                if (tb != null)
                {
                    ThiSinhModel ts = new ThiSinhModel();
                    ts.MaLop = tb.Rows[0]["MaLop"].ToString();
                    ts.MaThiSinh = tb.Rows[0]["MaThiSinh"].ToString();
                    ts.Hoten = tb.Rows[0]["Hoten"].ToString();
                    ts.NgaySinh = DateTime.Parse(tb.Rows[0]["NgaySinh"].ToString());
                    ts.Gioitinh = tb.Rows[0]["Gioitinh"].ToString();
                    ts.DiaChi = tb.Rows[0]["DiaChi"].ToString();
                    ts.NhomThi = tb.Rows[0]["NhomThi"].ToString();
                    return ts;
                }
                else return null;


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int Create(ThiSinhModel model)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Insert_ThiSinh", "@mathisinh", "@malop", "@hoten", "@ngaysinh", "@gioitinh", "@diachi", "@nhomthi", model.MaThiSinh, model.MaLop, model.Hoten, model.NgaySinh, model.Gioitinh, model.DiaChi, model.NhomThi);


                return reuslt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ThiSinhModel model)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Edit_ThiSinh", "@mathisinh", "@malop", "@hoten", "@ngaysinh", "@gioitinh", "@diachi", "@nhomthi", "@pass", model.MaThiSinh, model.MaLop, model.Hoten, model.NgaySinh, model.Gioitinh, model.DiaChi, model.NhomThi, model.password);


                return reuslt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Delete(string id)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Delete_ThiSinh", "@mathisinh", id);
                return reuslt;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
