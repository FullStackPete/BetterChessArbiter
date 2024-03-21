using bcaAPI.Models;
using bcaAPI.Services;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace bcaAPI.Controllers
{
    
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

        [Authorize(Roles ="Admin")]
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
            var requestingUserId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (requestingUserId != user.Id.ToString())
            {                
                return Forbid();
            }
            return Ok(user);
        }

        [Authorize(Roles ="Admin")]
        // POST: api/User
        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {            
            var emailInBase = _userService.FindByEmail(user.Email);
            if (emailInBase != null) return BadRequest("Email is already in base");
            _userService.AddUser(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }


        [Authorize(Roles="User, Organizer, Moderator, Admin")]
        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult PutUser(Guid id, User user)
        {

            var requestingUserId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (requestingUserId != user.Id.ToString())
            {
                return Forbid();
            }            

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

        [Authorize(Roles ="Admin")]
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
