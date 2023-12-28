using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AccountModel
    {
        public int id { get; set; }
        public int user_id { get; set; }

        public string username { get; set; }
        public string password { get; set; }
        public int role_id { get; set; }


    }
}
