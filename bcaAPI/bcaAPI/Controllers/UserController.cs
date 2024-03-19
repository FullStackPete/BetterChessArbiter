using bcaAPI.Models;
using bcaAPI.Services;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bcaAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {        
        private readonly IUserService _userService;
        private readonly PasswordService _PasswordService;

        public UserController(IUserService userService, PasswordService passwordService)
        {
            _userService = userService;
            _PasswordService = passwordService;
        }

        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(Guid id)
        {            
            var user = _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] LoginModel data) {

            User user = _userService.FindByEmail(data.Email);
            if (user == null) {
                return NotFound(data.Email);
            }
            var saltedP = user.Salt + data.Password;
            var hashedSaltedP = _PasswordService.HashPassword(saltedP);

            if(user.Email== data.Email && user.Password == hashedSaltedP)
            {
                return Ok(user);
            } else
            {
                return BadRequest("Verification failed!");
            }                                                
        }
        // POST: api/User
        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {            
            var emailInBase = _userService.FindByEmail(user.Email);
            if (emailInBase != null) return BadRequest("Email is already in base");
            _userService.AddUser(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult PutUser(Guid id, User user)
        {            

            if (!_userService.GetUserById(id).Equals(user))
            {
                return BadRequest();
            }

            try
            {
                _userService.EditUser(user);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return NotFound(ex.Message);
            }

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(Guid id)
        {            
            var user = _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.DeleteUser(user);
            return NoContent();
        }
    }
}
