using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess;
namespace Business
{
    public class RoleBUS
    {
        RoleDAL ro = new RoleDAL();
        public RoleModel GetById(int id)
        {
            return ro.GetById(id);
        }
    }
}
