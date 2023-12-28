using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Business;
namespace API_Lop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        UserBUS usBUS = new UserBUS();

        [Route("GetUsById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                UsersModel us = usBUS.GetUserById(id);
                return us != null ? Ok(us):NotFound();

            }catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("GetAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                List<UsersModel> list = usBUS.GetAll();
                return list != null ? Ok(list) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("SearchUs")]
        [HttpPost]

        public IActionResult Search([FromBody] Dictionary<string, object> data)
        {
            try
            {
                string value = "";
                int? pageIndex = null;
                int?pageSize = null;
                if (data.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(data["pageIndex"].ToString()))
                    pageIndex = int.Parse(data["pageIndex"].ToString());
                if (data.Keys.Contains("pageSize") && !string.IsNullOrEmpty(data["pageSize"].ToString()))
                    pageSize = int.Parse(data["pageSize"].ToString());
                if(data.Keys.Contains("value") && !string.IsNullOrEmpty(data["value"].ToString()))
                    value = data["value"].ToString();
                int total = 0;
                List<UsersModel> list = usBUS.Search(pageIndex, pageSize, value,out total);
                return list != null ? Ok(new
                {
                    pageIndex = pageIndex,
                    pageSize = pageSize,
                    totalItems = total,
                    data = list
                }) : NotFound();

            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        [Route("GetPhanTrangUs")]
        [HttpPost]

        public IActionResult GetPhanTrangUs([FromBody] Dictionary<string, object> data)
        {
            try
            {
                int? pageIndex = null;
                int? pageSize = null;
                if (data.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(data["pageIndex"].ToString()))
                    pageIndex = int.Parse(data["pageIndex"].ToString());
                if (data.Keys.Contains("pageSize") && !string.IsNullOrEmpty(data["pageSize"].ToString()))
                    pageSize = int.Parse(data["pageSize"].ToString());
               
                int total = 0;
                List<UsersModel> list = usBUS.GetPhanTrang(pageIndex, pageSize, out total);
                return list != null ? Ok(new
                {
                    pageIndex = pageIndex,
                    pageSize = pageSize,
                    totalItems = total,
                    data = list
                }) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [Route("Create_Us")]
        [HttpPost]
        public IActionResult Create([FromBody] UsersModel us)
        {
            try
            {
                int result = usBUS.CreateUs(us);
                return result >= 1 ? Ok("Thêm thành công") : BadRequest("Thêm thất bại");

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Delete_US")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                int result = usBUS.DeleteUs(id);
                return result >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa thất bại");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Update_Us")]
        [HttpPut]
        public IActionResult Update([FromBody] UsersModel us)
        {
            try
            {
                int result = usBUS.UpdateUs(us);
                return result >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa thất bại");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
