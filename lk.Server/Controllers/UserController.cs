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
        [Authorize]
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
                                                    .Include(c=> c.Entity)
                                                    .FirstOrDefault(c => c.Personalities == personality && c.Actual == 1);
            if (personalityVersion is null)
            {
                return BadRequest(new { message = "отсутствует актуальная personalityVersion" });
            }
            if (personalityVersion.JobTitle is null)
            {
                return BadRequest(new { message = "отсутствует JobTitle" });
            }
            if (personalityVersion.Schedule is null)
            {
                return BadRequest(new { message = "отсутствует Schedule" });
            }
            if (personalityVersion.Location is null)
            {
                return BadRequest(new { message = "отсутствует Location" });
            }
            if (personalityVersion.Entity is null)
            {
                return BadRequest(new { message = "отсутствует Entity" });
            }

            User user = new();
            user.Surname = personalityVersion.Surname;
            user.Name = personalityVersion.Name;
            user.Patronymic = personalityVersion.Patronymic;
            user.Birthday = DateOnly.FromDateTime(personality.BirthDate);
            user.JobTitle = personalityVersion.JobTitle.Name;
            user.Location = personalityVersion.Location.Name;
            user.ScheduleStart = personalityVersion.Schedule.BeginTime.ToString(@"hh\:mm");
            user.ScheduleEnd = personalityVersion.Schedule.EndTime.ToString(@"hh\:mm");
            user.Entity = personalityVersion.Entity.Name;
            user.Experience = (DateTime.Now - personalityVersion.HireDate).Days;
            return new JsonResult(user);
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
