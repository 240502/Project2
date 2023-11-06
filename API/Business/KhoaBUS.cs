using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Model;
namespace Business
{
    public class KhoaBUS
    {
       KhoaDAL khoaDAL = new KhoaDAL();
        public List<KhoaModel> GetList()
        {
            return khoaDAL.GetList();
        }
    }
}
