using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static lk.Server.Controllers.AuthorizationController;

namespace lk.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {

        private readonly RKNETDBContext _rKNETDBContext;
        public SlotsController(RKNETDBContext rKNETDBContext)
        {
            _rKNETDBContext = rKNETDBContext;
        }


        [HttpGet("getall")]
        [Authorize]
        public IActionResult GetAll(string userPhone)
        {
            if (userPhone == null)
            {
                return BadRequest(new { message = "user is null" });
            }           
            List<JsonSlot> jsonSlots = new List<JsonSlot>();
            List<WorkingSlots> workSlots = _rKNETDBContext.WorkingSlots.Include(c=>c.Locations)
                                                                       .Include(c => c.JobTitles)
                                                                       .Where(c => c.Status == 0 && c.Begin < DateTime.Now.AddHours(-1)).ToList();
            foreach (var workSlot in workSlots)
            {
                JsonSlot jsonSlot = new();
                jsonSlot.Id = workSlot.Id;
                jsonSlot.Personalities = workSlot.Personalities;
                jsonSlot.Locations = workSlot.Locations;
                jsonSlot.JobTitles = workSlot.JobTitles;
                jsonSlot.Begin = workSlot.Begin;
                jsonSlot.End = workSlot.End;
                jsonSlot.Status = workSlot.Status;
                jsonSlot.Available = Convert.ToInt32(CheckShiftTimeConflict(workSlot.Begin, workSlot.End, userPhone));
                jsonSlots.Add(jsonSlot);
            }
            return Ok(jsonSlots);
        }

        [HttpGet("getuserssheets")]
        [Authorize]
        public IActionResult GetUsersSheets(string userPhone)
        { 
        
        return Ok();
        }

        [HttpPut("takesheet")]
       // [Authorize]
        public IActionResult TakeSheet([FromBody] TakeSheetJson takeSheetJson)
        {
            if (takeSheetJson == null || takeSheetJson.Id == null || takeSheetJson.Phone == null)
            {
                return BadRequest(new { message = "unavailable data" });
            }
            Personality personality = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == takeSheetJson.Phone);
            if (personality is null)
            {
                return BadRequest(new { message = "пользователь не найден" });
            }
            WorkingSlots workingSlot = _rKNETDBContext.WorkingSlots.FirstOrDefault(c => c.Id == takeSheetJson.Id);
            if (workingSlot is null)
            {
                return BadRequest(new { message = "смена не найдена" });
            }
            if (CheckShiftTimeConflict(workingSlot.Begin, workingSlot.End, takeSheetJson.Phone))
            {
                workingSlot.Personalities = personality;
                workingSlot.Status = 1;
                _rKNETDBContext.SaveChanges();
                return Ok();
            }
            return BadRequest(new { message = "конфликт рабочего времени" });
        }


        private bool CheckShiftTimeConflict(DateTime begin, DateTime end, string userPhone)
        {
            List<WorkingSlots> userWorkSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Personalities)
                                                                          .Where(c => c.Personalities.Phone == userPhone && c.Begin < DateTime.Now.AddHours(-1))
                                                                          .ToList();
            List<TimeSheets> usertimeSheets = _rKNETDBContext.TimeSheets.Include(c => c.Personalities)
                                                                           .Where(c => c.Personalities.Phone == userPhone && c.Begin < DateTime.Now.AddHours(-1))
                                                                           .ToList();

            foreach (var item in userWorkSlots)
            {
                if (item.Begin <= begin && item.End > begin || item.Begin < end && item.End >= end || item.Begin > begin && item.End < end)
                {
                    return false;
                }
            }
            foreach (var item in usertimeSheets)
            {
                if (item.Begin <= begin && item.End > begin || item.Begin < end && item.End >= end || item.Begin > begin && item.End < end)
                {
                    return false;
                }
            }
            return true;
        }

        public class JsonSlot : WorkingSlots
        {
            public int Available { get; set; }
        }
        public class TakeSheetJson
        {
            public int? Id { get; set; }
            public string? Phone { get; set; }
        }
    }
}

