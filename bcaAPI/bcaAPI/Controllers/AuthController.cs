using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using bcaAPI.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

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
            var refreshToken = GenerateRefreshToken(user, role);
            user.RefreshToken = refreshToken;
            _userService.EditUser(user);
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
        [HttpGet("refresh")]
        public IActionResult Refresh()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"];
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return BadRequest(new { message = "Authorization header is missing" });
            }

            var accessToken = authorizationHeader.ToString().Split(' ')[1];

            var accessTokenValid = _jwtService.IsTokenValid(accessToken);
            if (!accessTokenValid)
            {
                // AccessToken wygasł, więc próbujemy odświeżyć go za pomocą refreshTokena
                var userIdClaim = _jwtService.GetUserIdFromToken(accessToken);
                if (userIdClaim == null)
                {
                    return BadRequest(new { message = "User ID claim not found in access token" });
                }

                var user = _userService.GetUserById(new Guid(userIdClaim));
                if (user == null)
                {
                    return BadRequest(new { message = "User not found." });
                }

                var refreshToken = user.RefreshToken;
                var refreshTokenActive = _jwtService.IsTokenValid(refreshToken);
                if (!refreshTokenActive)
                {
                    return Unauthorized("Refresh token not valid - possibly expired.");
                }

                string role = GetRoleForUser(user);
                if (role == null)
                {
                    return BadRequest(new { message = "User without specified role." });
                }

                // Generowanie nowego accessTokena na podstawie refreshTokena
                var newAccessToken = GenerateJwtToken(user, role);
                return Ok(new { token = newAccessToken, role });
            }

            // AccessToken jest nadal aktywny, więc zwracamy go bez zmian
            return Ok(new { token = accessToken });
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
                new (ClaimTypes.NameIdentifier, user.Id.ToString()),
                new (ClaimTypes.Role, role),
                new (ClaimTypes.Email, user.Email),
                new (ClaimTypes.GivenName,user.Name),
                new (ClaimTypes.Surname,user.Surname),
                new (ClaimTypes.Gender,user.Sex),
                // You can add more claims here as needed
            };

            var token = _jwtService.GenerateToken(claims, Convert.ToInt32(_configuration["JwtSettings:ExpirationMinutes"]), _configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"]);
            return token;
        }
        private string GenerateRefreshToken(User user,string role)
        {
            var claims = new List<Claim>
            {
                new (ClaimTypes.NameIdentifier, user.Id.ToString()),
                new (ClaimTypes.Role, role),
                new (ClaimTypes.Email, user.Email),
                new (ClaimTypes.GivenName,user.Name),
                new (ClaimTypes.Surname,user.Surname),
                new (ClaimTypes.Gender,user.Sex),
            };
            var token = _jwtService.GenerateToken(claims, Convert.ToInt32(_configuration["JwtSettings:RefreshExpirationMinutes"]), _configuration["JwtSettings:Issuer"], _configuration["JwtSettings:Audience"]);
            return token;
        }

    }
}
