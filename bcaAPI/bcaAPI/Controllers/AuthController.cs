using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace bcaAPI.Controllers
{
    [Route("/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IJwtService _jwtService;
        public AuthController(IJwtService jwtService)
        {
            _jwtService = jwtService;
        }
        [HttpGet("/gettoken")]
        public string GetToken()
        {
            return _jwtService.GenerateToken();
        }
        [HttpGet]
        public ActionResult Login()
        {
            return Ok("Success");
        }
    }
}
