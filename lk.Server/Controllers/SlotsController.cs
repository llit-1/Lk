using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using static lk.Server.Controllers.SlotsController;

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
        [Authorize]
        public IActionResult GetOldUserSheets([FromBody] GetUsersSheetsJson getUsersSheetsJson)
        {
            if (getUsersSheetsJson == null || getUsersSheetsJson.Phone == null || getUsersSheetsJson.Year == null || getUsersSheetsJson.Month == null)
            {
                return BadRequest(new { message = "unavailable data" });
            }
            try
            {
                DateTime begin = new DateTime(getUsersSheetsJson.Year.Value, getUsersSheetsJson.Month.Value, 1);
                DateTime end = begin.AddMonths(1);
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
        [Authorize]
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

        [HttpPatch("getstatistic")]
        [Authorize]
        public IActionResult GetStatistic([FromBody] GetUsersSheetsJson getUsersSheetsJson)
        {
            GetStatisticJsonResponse response = new GetStatisticJsonResponse();
            DateTime begin = new DateTime(getUsersSheetsJson.Year.Value, getUsersSheetsJson.Month.Value, 1);
            DateTime end = begin.AddMonths(1);

            List < WorkingSlots > workingSlots = _rKNETDBContext.WorkingSlots.Include(c => c.Personalities)
                                                                              .Include(c => c.Locations)
                                                                              .Include(c => c.JobTitles)
                                                                              .Where(c => c.Personalities.Phone == getUsersSheetsJson.Phone && (c.Status == 4 || c.Status == 5)  && c.Begin >= begin && c.End < end)
                                                                              .ToList();

            List<TimeSheets> timeSheets = _rKNETDBContext.TimeSheets.Include(c => c.Personalities)
                                                                    .Include(c => c.Location)
                                                                    .Include(c => c.JobTitle)
                                                                    .Where(c => c.Personalities.Phone == getUsersSheetsJson.Phone && c.Begin >= begin && c.End < end && c.Begin < DateTime.Now)
                                                                    .ToList();

            var a = CompleeteGetUsersSheetsResponse(workingSlots, timeSheets);

            response.CompletedSheets = a.Where(x => x.Status == 5 || x.Status == 4).Count();
            response.CancelledSheets = a.Where(x => x.Status == 2 || x.Status == 3).Count();

            response.CompletedSheets += a.Where(x => x.Status == null && x.Id == null && DateTime.ParseExact(x.Date + " " + x.EndTime,"dd.MM.yyyy HH.mm",CultureInfo.InvariantCulture) < DateTime.Now).Count();

            double totalHours = 0;

            foreach (var shift in a)
            {
                if (shift.Status == null && shift.Id == null && DateTime.Parse(shift.Date) > DateTime.Now)
                {
                    continue;
                }

                if (shift.Status != null && shift.Id != null && (shift.Status != 5 || shift.Status != 4))
                {
                    continue;
                }

                var beginTimeString = shift.BeginTime.Replace(".", ":");
                var endTimeString = shift.EndTime.Replace(".", ":");

                if (TimeSpan.TryParse(beginTimeString, out TimeSpan beginTime) &&
                    TimeSpan.TryParse(endTimeString, out TimeSpan endTime))
                {
                    // Если конец смены раньше начала, значит был переход через полночь
                    if (endTime < beginTime)
                    {
                        endTime = endTime.Add(TimeSpan.FromHours(24)); // Добавляем 24 часа
                    }

                    // Вычисляем продолжительность смены
                    TimeSpan duration = endTime - beginTime;
                    totalHours += duration.TotalHours;
                }
            }


            response.HouseWorked = totalHours;

            return Ok(response);
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
            public int? Month { get; set; }
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

        public class GetStatisticJsonResponse
        {
            public int CompletedSheets { get; set; }
            public int CancelledSheets { get; set; }
            public double HouseWorked { get; set; }

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
                usersSheet.EndTime = item.End.ToString("HH.mm");
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
                usersSheet.EndTime = item.End.ToString("HH.mm");
                jsonResponse.Add(usersSheet);
            }

            return jsonResponse.OrderByDescending(x => x.Date).ToList();
        }
    }
}

