using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess.Helper;
using System.Data;
using System.Net;
using System.Reflection;

namespace DataAccess
{
    public class UsersDAL
    {
        DataHelper helper = new DataHelper();

        public List<UsersModel>GetAll()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetAll");
                if (tb != null)
                {
                    List<UsersModel> list = new List<UsersModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        UsersModel model = new UsersModel();
                        model.id = int.Parse(tb.Rows[0]["id"].ToString());
                        model.fullname = tb.Rows[i]["fullname"].ToString();
                        model.workplace = tb.Rows[i]["workplace"].ToString();
                        model.email = tb.Rows[i]["email"].ToString();
                        model.phoneNumber = tb.Rows[i]["phoneNumber"].ToString();
                        model.address = tb.Rows[i]["address"].ToString();
                        list.Add(model);

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

        public List<UsersModel> Search(int ? pageIndex, int? pageSize , string value,out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Search_Us","@pageIndex","@pageSize","@value",pageIndex,pageSize,value);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<UsersModel> list = new List<UsersModel>();

                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        UsersModel model = new UsersModel();
                        model.id = int.Parse(tb.Rows[0]["id"].ToString());
                        model.fullname = tb.Rows[i]["fullname"].ToString();
                        model.workplace = tb.Rows[i]["workplace"].ToString();
                        model.email = tb.Rows[i]["email"].ToString();
                        model.phoneNumber = tb.Rows[i]["phoneNumber"].ToString();
                        model.address = tb.Rows[i]["address"].ToString();
                        list.Add(model);

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

        public List<UsersModel> GetPhanTrang(int? pageIndex, int? pageSize, out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GePhanTrang", "@pageIndex", "@pageSize", pageIndex, pageSize);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<UsersModel> list = new List<UsersModel>();

                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        UsersModel model = new UsersModel();
                        model.id = int.Parse(tb.Rows[i]["id"].ToString());
                        model.fullname = tb.Rows[i]["fullname"].ToString();
                        model.workplace = tb.Rows[i]["workplace"].ToString();
                        model.email = tb.Rows[i]["email"].ToString();
                        model.phoneNumber = tb.Rows[i]["phoneNumber"].ToString();
                        model.address = tb.Rows[i]["address"].ToString();
                        list.Add(model);

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

        public int Create(UsersModel model)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Create_Us","@fullname","@workplace","@email","@add","@phone",model.fullname,model.workplace,model.email,model.address,model.phoneNumber);
                return result;
            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(UsersModel model)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Update_Us","@id", "@fullname", "@workplace", "@email", "@add", "@phone", model.id,model.fullname, model.workplace, model.email, model.address, model.phoneNumber);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int id)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Delete_Us", "@id",id);
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public UsersModel GetById(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_UsById","@id",id);
                if (tb != null)
                {
                    UsersModel model = new UsersModel();
                    model.id = int.Parse(tb.Rows[0]["id"].ToString());
                    model.fullname = tb.Rows[0]["fullname"].ToString();
                    model.workplace = tb.Rows[0]["workplace"].ToString();
                    model.email = tb.Rows[0]["email"].ToString();
                    model.phoneNumber = tb.Rows[0]["phoneNumber"].ToString();
                    model.address = tb.Rows[0]["address"].ToString();
                    return model;
                }
                else return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
