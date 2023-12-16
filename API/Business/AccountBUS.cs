using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccess;
namespace Business
{
    public class AccountBUS
    {
        AccountDAL acc = new AccountDAL();  
        public AccountModel Login(string un ,string pass)
        {
            return acc.Login(un , pass);
        }
    }
}
