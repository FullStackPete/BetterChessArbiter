using System.Security.Claims;

namespace bcaAPI.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(IList<Claim> claims, int expires, string issuer, string audience);
        public bool IsTokenValid(string token);
        public string GetUserIdFromToken(string token);
    }
}
