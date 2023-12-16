using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Model;
using Business;
namespace API_Lop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        AccountBUS acc = new AccountBUS();
        [Route("Login")]
        [HttpPost]
        public IActionResult login([FromBody] Dictionary<string, object> options)
        {
            try
            {
                string un = "";
                string ps = "";
                if (options.Keys.Contains("username") && !string.IsNullOrEmpty(options["username"].ToString()))
                {
                    un = options["username"].ToString();
                }
                if (options.Keys.Contains("password") && !string.IsNullOrEmpty(options["password"].ToString()))
                {
                    ps = options["password"].ToString();
                }
                AccountModel model = acc.Login(un, ps);
                return model !=null ? Ok(model) : BadRequest();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
