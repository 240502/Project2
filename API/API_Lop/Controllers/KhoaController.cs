using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Business;
namespace API_Lop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoaController : ControllerBase
    {
        KhoaBUS  khoabus = new KhoaBUS();
        [Route("GetListKhoa")]
        [HttpGet]
        public IActionResult GetListKhoa()
        {
            try
            {
                List<KhoaModel> list = khoabus.GetList();
                return list!=null? Ok(list):NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
