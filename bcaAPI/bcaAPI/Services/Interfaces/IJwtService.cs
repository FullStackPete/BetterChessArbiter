using System.Security.Claims;

namespace bcaAPI.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(IList<Claim> claims, int expires);
    }
}
