using bcaAPI.Models;
using bcaAPI.Services;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(string id)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            var user = _userService.GetUserById(objectId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost("verifylogin")]
        public ActionResult<User> VerifyUserLogin([FromBody] LoginVerificationBody data) {

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
        public IActionResult PutUser(string id, User user)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);

            if (!_userService.GetUserById(objectId).Equals(user))
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
        public IActionResult DeleteUser(string id)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            var user = _userService.GetUserById(objectId);

            if (user == null)
            {
                return NotFound();
            }

            _userService.DeleteUser(user);
            return NoContent();
        }
    }
}
