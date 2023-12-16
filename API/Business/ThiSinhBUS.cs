using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess;

namespace Business
{
    public class ThiSinhBUS
    {
        ThiSinhDAL tsDAL = new ThiSinhDAL();

        public List<ThiSinhModel> GetList(int? pageIndex,int ?pageSize, out int total)
        {
            return tsDAL.GetList(pageIndex,pageSize, out total);
        }
        public ThiSinhModel GetByID(string id)
        {
            return tsDAL.GetById(id);
        }
        public List<ThiSinhModel> Search(int ?pageIndex,int? pageSize,string value,out int total)
        {
            return tsDAL.Search(pageIndex,pageSize,value,out total);
        }

        public int Create(ThiSinhModel model) { 
            return tsDAL.Create(model);
        }

        public int Delete(string id)
        {
            return tsDAL.Delete(id);
        }
        public int Update   (ThiSinhModel model)
        {
            return tsDAL.Update(model);
        }
    }
}
