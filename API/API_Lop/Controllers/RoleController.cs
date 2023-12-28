using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Business;
namespace API_Lop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        RoleBUS  ro = new RoleBUS();
        [Route("GetRoById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                RoleModel model = ro.GetById(id);
                return model!=null ? Ok(model): NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
