using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Business;
using Microsoft.SqlServer.Server;
using Microsoft.AspNetCore.Mvc.Abstractions;

namespace API_Lop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThiSinhController : ControllerBase
    {
        ThiSinhBUS tsBUS = new ThiSinhBUS();
        [Route("Get_All_ThiSinh")]
        [HttpGet]

        public IActionResult GetAll()
        {
            try
            {
                List<ThiSinhModel> list = tsBUS.GetAll();
                return list != null ? Ok(list) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        
        }
        [Route("Create_ThiSinh")]
        [HttpPost]
        public IActionResult Create([FromBody] ThiSinhModel model)
        {
            try
            {
                int result = tsBUS.Create(model);
                return result >= 1? Ok("Them thanh cong"):BadRequest("Them that bai");

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Delete_ThiSinh")]
        [HttpDelete]

        public IActionResult Delete(string  id)
        {
            try
            {
                int result = tsBUS.Delete(id);
                return result >= 1 ? Ok("Xóa thanh cong") : BadRequest("Xóa that bai");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Update_ThiSinh")]
        [HttpPut]

        public IActionResult Update([FromBody] ThiSinhModel model)
        {
            try
            {
                int result = tsBUS.Update(model);
                return result >= 1 ? Ok("Sua thanh cong") : BadRequest("Sua that bai");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("GetList_ThiSinh")]

        [HttpPost]
        public IActionResult GetList([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                int? pageSize = null;
                int? pageIndex = null;
                string malop = "";
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                {
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                }
                if (formData.Keys.Contains("malop") && !string.IsNullOrEmpty(formData["malop"].ToString())) malop = formData["malop"].ToString();
                int total = 0;
                var listhisinh = tsBUS.GetList(pageIndex, pageSize, malop, out total);
                return listhisinh != null ? Ok(new { data = listhisinh, pageIndex = pageIndex, pageSize = pageSize, totalItems = total }) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("GetThiSinhById")]
        [HttpGet]
        public IActionResult GetByID(string id)
        {
            try
            {
                ThiSinhModel model = tsBUS.GetByID(id);
                return model !=null ? Ok(model) : NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Search_ThiSinh")]

        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int? pageSize = null;
                int? pageIndex = null;
                string value = "";
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                {
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                }
                if (formData.Keys.Contains("value") && !string.IsNullOrEmpty(formData["value"].ToString()))
                {
                    value = (formData["value"].ToString());
                }

                int total = 0;
                var listhisinh = tsBUS.Search(pageIndex, pageSize,value, out total);
                return listhisinh != null ? Ok(new { data = listhisinh, pageIndex = pageIndex, pageSize = pageSize, totalItems = total }) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }

}
