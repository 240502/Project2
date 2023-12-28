using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess;
namespace Business
{
    public class UserBUS
    {
        UsersDAL usDAL = new UsersDAL();    
        public UsersModel GetUserById(int id)
        {
            return usDAL.GetById(id);
        }

        public List<UsersModel> GetAll()
        {
            return usDAL.GetAll();
        }



        public int CreateUs(UsersModel us)
        {
            return usDAL.Create(us);
        }
        public int UpdateUs(UsersModel us)
        {
            return usDAL.Update(us);
        }

        public int DeleteUs(int id)
        {
            return usDAL.Delete(id);
        }

        public List<UsersModel> Search(int? pageIndex, int? pageSize, string value, out int total)
        {


            return usDAL.Search(pageIndex, pageSize, value, out total);
        }

        public List<UsersModel> GetPhanTrang(int? pageIndex, int? pageSize, out int total)
        {


            return usDAL.GetPhanTrang(pageIndex, pageSize, out total);
        }
    }
}
