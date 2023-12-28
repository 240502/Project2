using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Helper;
using Model;

namespace DataAccess
{
    public class AccountDAL
    {
        DataHelper helper = new DataHelper();   
        public AccountModel Login(string un , string pass)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_login", "@un","pass",un,pass);
                if (tb != null)
                {
                    AccountModel model = new AccountModel();
                    model.id = int.Parse(tb.Rows[0]["id"].ToString());
                    model.user_id = tb.Rows[0]["user_id"] != DBNull.Value? int.Parse(tb.Rows[0]["user_id"].ToString()):0;
                    model.username = tb.Rows[0]["username"].ToString();
                    model.password = tb.Rows[0]["password"].ToString();
                    model.role_id = int.Parse(tb.Rows[0]["role_id"].ToString());
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
