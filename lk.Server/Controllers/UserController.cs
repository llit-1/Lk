using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace lk.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RKNETDBContext _rKNETDBContext;
        public UserController(RKNETDBContext rKNETDBContext)
        {
            _rKNETDBContext = rKNETDBContext;
        }


        [HttpGet("get")]
     //   [Authorize]
        public IActionResult GetUser(string phone)
        {
            if (phone.IsNullOrEmpty())
            {
                return BadRequest(new { message = "phone is NullOrEmpty"});
            }
            Personality? personality = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);

            if (personality is null)
            {
                return BadRequest(new { message = "Пользователь не найден, обратитесь к руководителю!" });
            }

            var personalityVersion = _rKNETDBContext.PersonalityVersions.Include(c => c.JobTitle)
                                                    .Include(c => c.Schedule)
                                                    .Include(c => c.Location)
                                                    .FirstOrDefault(c => c.Personalities == personality && c.Actual == 1);


            //PersonalityVersion? personalityVersion = _rKNETDBContext.PersonalityVersions.FirstOrDefault(c => c.Personalities == personality && c.Actual == 1);
            //if (personalityVersion is null)
            //{
            //    return BadRequest(new { message = "отсутствует актуальная personalityVersion" });
            //}
            //JobTitle? jobTitle = _rKNETDBContext.JobTitles.FirstOrDefault(c => c == personality.JobTitle);

            return new JsonResult(personalityVersion);
        }




    }


    public class User
    {
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public DateOnly Birthday { get; set; }
        public string JobTitle { get; set; }
        public string Location { get; set; }
        public string ScheduleStart { get; set; }
        public string ScheduleEnd { get; set; }
        public string Entity { get; set; }
        public int Experience { get; set; }


    }
}
