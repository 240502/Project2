using Business;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Model;

namespace API_Lop.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LopController : ControllerBase
    {
        List<LopModel> listlop ;
        LopBUS lopBUS = new LopBUS();
        [Route("Create_Lop")]
        [HttpPost]
        public IActionResult Create([FromBody]LopModel lop)
        {
            try
            {
                int reuslt = lopBUS.Create(lop);
                return reuslt == 1 ? Ok(reuslt):BadRequest("Thêm thất bại");
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Update_Lop")]
        [HttpPut]
        public IActionResult Update([FromBody] LopModel lop)
        {
            try
            {
                int reuslt = lopBUS.Update(lop);
                return reuslt == 1 ? Ok(reuslt) : BadRequest("Sửa thất bại");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Delete_Lop")]
        [HttpDelete]
        public IActionResult Delete(string malop)
        {
            try
            {
                int reuslt = lopBUS.Delete(malop);
                return reuslt >= 1 ? Ok(reuslt) : BadRequest("Xóa thất bại");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Get_Lop1")]
        [HttpPost]
        public IActionResult GetLop1([FromBody] Dictionary<string, object> data)
        {
            try
            {
                int? pageIndex = null;
                int? pageSize = null;
                if(data.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(data["pageIndex"].ToString()))
                {
                    pageIndex = int.Parse(data["pageIndex"].ToString());
                }

                if (data.Keys.Contains("pageSize") && !string.IsNullOrEmpty(data["pageSize"].ToString()))
                {
                    pageSize = int.Parse(data["pageSize"].ToString());
                }
                int total = 0;

                List<LopModel> result = lopBUS.GetLop(pageIndex,pageSize,out total);
                return result !=null ? Ok(result) : NotFound();
            }
            catch(Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }
        }
        [Route("Get_Lop")]
        [HttpPost]
        public IActionResult GetLop([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int? pageSize = null;
                int? pageIndex = null;
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                {
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                }
               
                int total = 0;
                listlop = lopBUS.getLop(pageSize, pageIndex, out total);
                return listlop != null ? Ok(new {data=listlop,pageIndex = pageIndex,pageSize= pageSize,totalItems=total}) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Search_Lop")]
        [HttpPost]
        public IActionResult SearchLop([FromBody] Dictionary<string,object> formData)    
        {
            try
            {
                string value = "";
                int pageIndex = 0;
                int pageSize = 0;
                if(formData.Keys.Contains("value") && !string.IsNullOrEmpty(formData["value"].ToString()))
                {
                    value = formData["value"].ToString(); 
                }
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                {
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                }
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }

                int total = 0;
                List<LopModel> list = lopBUS.SearchLop(value,out total,pageIndex,pageSize);
                return list!=null ? Ok(new {data= list, totalItems = total,pageIndex = pageIndex,pageSize = pageSize}) : NotFound();  
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
