using lk.Server.DbContexts.RKNETDB;
using lk.Server.DbContexts.RKNETDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
                return Unauthorized();
            }
            Personality user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null || user.Password == null|| user.Password != Global.Encrypt(password))
            {
                return Unauthorized();
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
            if (password == null || phone == null)
            {
                return BadRequest("Password or Phone is null");
            }

            var use = _rKNETDBContext.Personalities.FirstOrDefault();

            Personality user = _rKNETDBContext.Personalities.FirstOrDefault(c => c.Phone == phone);
            if (user == null)
            {
                return BadRequest("User not Found");
            }
            user.Password = Global.Encrypt(password);
            _rKNETDBContext.SaveChanges();
            use = new Personality();
            return Ok("Password set successfully");
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

        }
    }
}
