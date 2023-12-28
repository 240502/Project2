using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess.Helper;
using System.Data;

namespace DataAccess
{
    public class RoleDAL
    {
        DataHelper helper = new DataHelper();
        public RoleModel GetById(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("ProGetRoleById", "@id", id);
                if (tb != null)
                {

                    RoleModel model = new RoleModel();
                    model.id = int.Parse(tb.Rows[0]["id"].ToString());
                    model.roName = tb.Rows[0]["roName"].ToString();
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
