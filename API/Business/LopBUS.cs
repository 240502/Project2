using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess;

namespace Business
{
    public class LopBUS
    {
        LopDAL lopDAL = new LopDAL();

        public List<LopModel> GetAll()
        {
            return lopDAL.GetAll();
        }
        public List<LopModel> getLop( int?pageSize, int?pageIndex, string makhoa, out int total)
        {
            List<LopModel> list = lopDAL.getLop(pageSize, pageIndex, makhoa,out total);
            return list;
        }
        public List<LopModel> GetLop(int? pageIndex,int? pageSize , out int total)
        {
            return lopDAL.GetLop(pageIndex, pageSize, out total);
        }

        public List<LopModel> GetListLop()
        {
            return lopDAL.GetListLop();
        }
        public int Create(LopModel lop)
        {
            int result = lopDAL.Create(lop);
            return result;
        }

        public int Delete(string MaLop)
        {
            int result = lopDAL.Delete(MaLop);
            return result;
        }

        public int Update(LopModel lop)
        {
            int result = lopDAL.Update(lop);
            return result;
        }
        public List<LopModel> SearchLop(string value,out int total,int pageIndex,int pageSize)
        {
            return lopDAL.SearchLop(value, out total,pageIndex,pageSize);
        }
    }
}
