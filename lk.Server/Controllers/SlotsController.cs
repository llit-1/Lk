using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            List<WorkingSlots> workSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Locations)
                                                                       .Include(c => c.JobTitles)
                                                                       .Where(c => c.Status == 0 && c.Begin > DateTime.Now.AddHours(1)).ToList();
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

        [HttpPatch("getoldusersheets")]
        //[Authorize]
        public IActionResult GetOldUserSheets([FromBody] GetUsersSheetsJson getUsersSheetsJson)
        {
            if (getUsersSheetsJson == null || getUsersSheetsJson.Phone == null || getUsersSheetsJson.Year == null || getUsersSheetsJson.Mounth == null)
            {
                return BadRequest(new { message = "unavailable data" });
            }
            try
            {
                DateTime begin = new DateTime(getUsersSheetsJson.Year.Value, getUsersSheetsJson.Mounth.Value, 1);
                DateTime end = new DateTime(getUsersSheetsJson.Year.Value, getUsersSheetsJson.Mounth.Value + 1, 1);
                List<WorkingSlots> workingSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Personalities)
                                                                              .Include(c => c.Locations)
                                                                              .Include(c => c.JobTitles)
                                                                              .Where(c => c.Personalities.Phone == getUsersSheetsJson.Phone && c.Status != 1 && c.Begin >= begin && c.End < end)
                                                                              .ToList();
                List<TimeSheets> timeSheets = _rKNETDBContext.TimeSheets.Include(c => c.Personalities)
                                                                        .Include(c => c.Location)
                                                                        .Include(c => c.JobTitle)
                                                                        .Where(c => c.Personalities.Phone == getUsersSheetsJson.Phone && c.Begin >= begin && c.End < end && c.Begin < DateTime.Now)
                                                                        .ToList();
                return Ok(CompleeteGetUsersSheetsResponse(workingSlots, timeSheets));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("getfutureusersheets")]
       // [Authorize]
        public IActionResult GetFutureUserSheets(string phone)
        {
            if (phone == null)
            {
                return BadRequest(new { message = "unavailable data" });
            }
            try
            {
                List<WorkingSlots> workingSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Personalities)
                                                                          .Include(c => c.Locations)
                                                                          .Include(c => c.JobTitles)
                                                                          .Where(c => c.Personalities.Phone == phone && (c.Status == 1))
                                                                          .ToList();
                List<TimeSheets> timeSheets = _rKNETDBContext.TimeSheets.Include(c => c.Personalities)
                                                                        .Include(c => c.Location)
                                                                        .Include(c => c.JobTitle)
                                                                        .Where(c => c.Personalities.Phone == phone && c.Begin > DateTime.Now)
                                                                        .ToList();
                return Ok(CompleeteGetUsersSheetsResponse(workingSlots, timeSheets));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        [HttpPut("takesheet")]
        [Authorize]
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
            if (workingSlot is null || workingSlot.Status != 0)
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

        [HttpPut("dropsheet")]
        [Authorize]
        public IActionResult DropSheet([FromBody] TakeSheetJson takeSheetJson)
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
            if (workingSlot is null || workingSlot.Status != 1)
            {
                return BadRequest(new { message = "смена не найдена" });
            }
                workingSlot.Personalities = null;
                workingSlot.Status = 0;
                _rKNETDBContext.SaveChanges();
            return Ok();
        }



        private bool CheckShiftTimeConflict(DateTime begin, DateTime end, string userPhone)
        {
            List<WorkingSlots> userWorkSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Personalities)
                                                                          .Where(c => c.Personalities.Phone == userPhone && c.Begin > DateTime.Now)
                                                                          .ToList();
            List<TimeSheets> usertimeSheets = _rKNETDBContext.TimeSheets.Include(c => c.Personalities)
                                                                           .Where(c => c.Personalities.Phone == userPhone && c.Begin > DateTime.Now)
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

        public class GetUsersSheetsJson
        {
            public string Phone { get; set; }
            public int? Year { get; set; }
            public int? Mounth { get; set; }
        }

        public class GetUsersSheetsJsonResponse
        {
            public int? Id { get; set; }
            public Guid? Guid { get; set; }
            public string LocationName { get; set; }
            public string JobTitleName { get; set; }
            public string Date { get; set; }
            public string BeginTime { get; set; }
            public string EndTime { get; set; }
            public int? Status { get; set; }

        }

        private List<GetUsersSheetsJsonResponse> CompleeteGetUsersSheetsResponse(List<WorkingSlots> workingSlots, List<TimeSheets> timeSheets)
        {
            List<GetUsersSheetsJsonResponse> jsonResponse = new();
            foreach (var item in workingSlots)
            {
                GetUsersSheetsJsonResponse usersSheet = new();
                usersSheet.Id = item.Id;
                usersSheet.LocationName = item.Locations.Name;
                usersSheet.JobTitleName = item.JobTitles.Name;
                usersSheet.Date = item.Begin.ToString("dd.MM.yyyy");
                usersSheet.BeginTime = item.Begin.ToString("HH.mm");
                usersSheet.EndTime = item.Begin.ToString("HH.mm");
                usersSheet.Status = item.Status;
                jsonResponse.Add(usersSheet);
            }
            foreach (var item in timeSheets)
            {
                GetUsersSheetsJsonResponse usersSheet = new();
                usersSheet.Guid = item.Guid;
                usersSheet.LocationName = item.Location.Name;
                usersSheet.JobTitleName = item.JobTitle.Name;
                usersSheet.Date = item.Begin.ToString("dd.MM.yyyy");
                usersSheet.BeginTime = item.Begin.ToString("HH.mm");
                usersSheet.EndTime = item.Begin.ToString("HH.mm");
                jsonResponse.Add(usersSheet);
            }
            return jsonResponse;
        }
    }
}

