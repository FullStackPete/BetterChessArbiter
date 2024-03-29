using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using bcaAPI.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace bcaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly PasswordService _passwordService;
        private readonly IConfiguration _configuration;
        public AuthController(IUserService userService, IJwtService jwtService, PasswordService passwordService, IConfiguration configuration)
        {
            _userService = userService;
            _jwtService = jwtService;
            _passwordService = passwordService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user = _userService.FindByEmail(loginModel.Email);

            if (user == null || !VerifyPassword(user, loginModel.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            string role = GetRoleForUser(user); // Pobierz rolę użytkownika

            var token = GenerateJwtToken(user, role);
            return Ok(new { token,role });
        }
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            var userInDb = _userService.FindByEmail(user.Email);
            if (userInDb != null) { return BadRequest("Email already in use"); }
            user.Role = "User";
            _userService.AddUser(user);
            return Ok(user);

        }
        [Authorize]
        [HttpGet("refresh")]
        public IActionResult Refresh()
        {            
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) {
                return BadRequest(new { message = "User ID claim not found" });
            }
            var userId = new Guid (userIdClaim.Value);
            var user = _userService.GetUserById(userId);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }
            string role = GetRoleForUser(user);
            if (role == null)
            {
                return BadRequest(new { message = "User without specified role." });
            }
            var token = GenerateJwtToken (user, role);
            return Ok(new { token,role });  
        }

        private bool VerifyPassword(User user, string password)
        {
            var saltedPassword = user.Salt + password;
            var hashedSaltedPassword = _passwordService.HashPassword(saltedPassword);
            return user.Password == hashedSaltedPassword;
        }
        private string GetRoleForUser(User user)
        {
            var userInDb = _userService.FindByEmail(user.Email);
            if (userInDb == null) { return null; }

            return userInDb.Role.ToString();
        }
        private string GenerateJwtToken(User user,string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName,user.Name),
                new Claim(ClaimTypes.Surname,user.Surname),
                new Claim(ClaimTypes.Gender,user.Sex),
                // You can add more claims here as needed
            };

            var token = _jwtService.GenerateToken(claims, Convert.ToInt32(_configuration["JwtSettings:ExpirationMinutes"]), _configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"]);
            return token;
        }
        
    }
}
