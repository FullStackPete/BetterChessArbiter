using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace bcaAPI.Services
{
    public class JwtService : IJwtService
    {
        private readonly string _secretKey;

        public JwtService(string secretKey)
        {
            _secretKey = secretKey;
        }

        public string GenerateToken(IList<Claim> claims, int expires, string issuer, string audience)
        {
            // Tworzenie tokena

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expires), // Czas ważności tokena
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public string GetUserIdFromToken(string token)
        {
            var principals = GetPrincipalFromExpiredToken(token);
            if (principals != null)
            {
                var userIdClaim = principals.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

                if (userIdClaim != null)
                {
                    return userIdClaim.Value;
                }
                else return null;
            }
            return null;
            

        }
        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return null;
            }
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }catch(Exception ex)
            {
                Console.WriteLine($"Error validating token:{ex.Message}");
                return null;
            }
        }
        public bool IsTokenValid(string token)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var refreshTokenData = handler.ReadJwtToken(token);

                long? expirationDateUnix = refreshTokenData.Payload.Expiration;
                if (expirationDateUnix.HasValue)
                {
                    var expirationDate = DateTimeOffset.FromUnixTimeSeconds(expirationDateUnix.Value).UtcDateTime;
                    return expirationDate > DateTime.UtcNow;
                }
                else
                {
                    return false;
                }
            }catch (Exception)
            {
                return false;
            }
        }
    }
}
