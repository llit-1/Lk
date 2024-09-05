using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace lk.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly RKNETDBContext _rKNETDBContext;
        public AuthorizationController(RKNETDBContext rKNETDBContext)
        {
            _rKNETDBContext = rKNETDBContext;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            string password = loginModel.Password;
            string phone = loginModel.Phone;
            if (password == null || phone == null)
            {
                return Unauthorized(new { message = "Данные введены некорректно!"});
            }
            Personality user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null || user.Password == null|| user.Password != Global.Encrypt(password))
            {
                return Unauthorized(new { message = "Такого пользователя не существует, обратитесь к руководителю" });
            }
            return Ok(GetToken(phone));
        }      

        [HttpGet("check-token")]
        [Authorize]
        public IActionResult CheckToken()
        {
            return Ok("Token is valid");
        }

        [HttpPost("set-password")]
        public IActionResult SetPassword([FromBody] LoginModel loginModel)
        {
            string password = loginModel.Password;
            string phone = loginModel.Phone;
            string code = loginModel.Code;
            if (password == null || phone == null)
            {
                return BadRequest(new { message = "Данные введены некорректно!" });
            }
            Personality user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null)
            {
                return BadRequest(new { message = "Пользователь не найден, обратитесь к руководителю!" });
            }

            if (user.PhoneCode != code)
            {
                return BadRequest(new { message = "Неверно введен код!" });
            }
            user.Password = Global.Encrypt(password);
            _rKNETDBContext.SaveChanges();
            return Ok("Password set successfully");
        }

        [HttpPatch("set-phone-code")]
        public async Task<IActionResult> SetPhoneCode(string phone)
        {
            if (string.IsNullOrEmpty(phone))
            {
                return BadRequest(new { message = "Phone is empty" });
            }
            Personality user = _rKNETDBContext.Personalities.FirstOrDefault();
            user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null)
            {
                return BadRequest(new { message = "Такого пользователя не существует, обратитесь к руководителю" });
            }
            if (user.LastPhoneCall == null)
            {
                user.LastPhoneCall = DateTime.Now;
            }
            if (user.PhoneCallAttempts == null)
            {
                user.PhoneCallAttempts = 0;
            }
            if (user.LastPhoneCall.Value.Date == DateTime.Now.Date && user.PhoneCallAttempts > 3)
            {
                return BadRequest(new { message = "Вы слишком часто запрашивали код, попробуйте позже" });
            }
            PhoneModel phoneModel = new();
            using (HttpClient client = new HttpClient())
            {

                try
                {
                    string Url = "https://sms.ru/code/call?phone=7" + phone + "&ip=-1&api_id=990DA73E-E2DA-6964-7933-7AF52DB2696D";
                    HttpResponseMessage response = await client.GetAsync(Url);
                    response.EnsureSuccessStatusCode();
                    string json = await response.Content.ReadAsStringAsync();
                    phoneModel = JsonConvert.DeserializeObject<PhoneModel>(json);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            if (phoneModel.status.ToLower() != "ok")
            {
                return BadRequest(new { message = phoneModel.status });
            }
            if (user.PhoneCallAttempts > 3)
            {
                user.PhoneCallAttempts = 0;
            }
            user.PhoneCallAttempts++;
            user.LastPhoneCall = DateTime.Now;
            user.PhoneCode = phoneModel.code;
            _rKNETDBContext.SaveChanges();
            return Ok();
        }

        [HttpPost("check-phone-code")]
        public IActionResult CheckPhoneCode([FromBody] LoginModel loginModel)
        {
            string code = loginModel.Code;
            string phone = loginModel.Phone;
            if (code == null || phone == null)
            {
                return BadRequest("Code or Phone is null");
            }
            Personality user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null)
            {
                return BadRequest(new { message = "Такого пользователя не существует, обратитесь к руководителю" });
            }
            if (code != user.PhoneCode)
            {
                return BadRequest(new { message = "Неверно введен код!" });
            }
            return Ok(code);
        }

        private string GetToken(string name)
        {
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key = Encoding.UTF8.GetBytes(Global.SecretKey);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, name)
            }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tok = tokenHandler.CreateToken(tokenDescriptor);
            string? token = tokenHandler.WriteToken(tok);
            return token; 
        }

        public class LoginModel
        {
            public string Phone { get; set; }
            public string Password { get; set; }
            public string Code { get; set; }

        }

        public class PhoneModel
        {
            public string status { get; set; }
            public string code { get; set; }
            public string call_id { get; set; }
            public decimal money { get; set; }
            public decimal balance { get; set; }
        }



    }
}
