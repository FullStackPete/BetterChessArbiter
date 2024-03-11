using System.Security.Cryptography;
using System.Text;

namespace bcaAPI.Services
{
    public class PasswordService
    {
        public string HashPassword(string p)
        {
            SHA256 hash = SHA256.Create();
            var bytesP = Encoding.Default.GetBytes(p);
            var hashedP = hash.ComputeHash(bytesP);
            return Convert.ToHexString(hashedP);
        }
        public string Salt()
        {
            var salt = DateTime.Now.ToString();
            return salt;
        }
    }
}
