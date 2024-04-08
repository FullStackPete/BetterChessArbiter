using bcaAPI.DBContext;
using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace bcaAPI.Services
{
    public class UserService : IUserService
    {
        private readonly BCAContextDb _BCAContextDb;
        private readonly PasswordService _PasswordService;
        public UserService(BCAContextDb BCAContextDb, PasswordService passwordService)
        {
            _BCAContextDb = BCAContextDb;
            _PasswordService = passwordService;
        }
        public IEnumerable<User> GetLimitedUsers(int limit,int? from) {
            if (from.HasValue && from.Value >= 0)
            {
                return _BCAContextDb.Users.OrderBy(user => user.Id)
                                          .Skip(from.Value)
                                          .Take(limit)
                                          .AsNoTracking()
                                          .ToList();
            }
            else
            {
                // Jeśli nie ma określonego "from", zwróć początkowe "limit" rekordów
                return _BCAContextDb.Users.OrderBy(user => user.Id)
                                          .Take(limit)
                                          .AsNoTracking()
                                          .ToList();
            }
        }
        public int CountUsers()
        {
            return _BCAContextDb.Users.Count();
        }
        public IEnumerable<User> GetAllUsers()
        { var users = _BCAContextDb.Users.OrderBy(user => user.Id).AsNoTracking().AsEnumerable<User>();
            foreach (var user in users)
            {
                user.Password = null;
            }
            return users;
        }
        public User GetUserById(Guid id) {
            return _BCAContextDb.Users.FirstOrDefault(user => user.Id == id);
        }
        public void AddUser(User newUser)
        {            
            var salt = _PasswordService.Salt();
            var saltedP = salt + newUser.Password;
            var hashedSaltedPassword = _PasswordService.HashPassword(saltedP);            
            newUser.Password = hashedSaltedPassword;
            newUser.Salt = salt;

            _BCAContextDb.Users.Add(newUser);
            _BCAContextDb.ChangeTracker.DetectChanges();
            Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
            _BCAContextDb.SaveChanges(); 
        }
        public void EditUser(User user)
        {
            var userToUpdate = _BCAContextDb.Users.FirstOrDefault(u => u.Id == user.Id);
            if(userToUpdate != null)
            {
                userToUpdate.Name=user.Name;
                userToUpdate.Surname=user.Surname;
                userToUpdate.Email=user.Email;
                userToUpdate.Password=user.Password;
                userToUpdate.Sex = user.Sex;                
                userToUpdate.EmailConfirmed=user.EmailConfirmed;
                userToUpdate.Role = user.Role;
                userToUpdate.RefreshToken = user.RefreshToken;

                _BCAContextDb.Users.Update(userToUpdate);

                _BCAContextDb.ChangeTracker.DetectChanges();
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
                _BCAContextDb.SaveChanges();
            }
            else
            {
                throw new ArgumentException("The user to update was not found.");
            }
        }
        public void DeleteUser(User user)
        {
            var userToDelete = _BCAContextDb.Users.Where(u => u.Id == user.Id).FirstOrDefault();
            if(userToDelete != null)
            {
                _BCAContextDb.Users.Remove(userToDelete);
                _BCAContextDb.ChangeTracker.DetectChanges() ;
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
                _BCAContextDb.SaveChanges();
            }
            else
            {
                throw new ArgumentException("User to delete was not found.");
            }
        }
        public User FindByEmail(string email)
        {
            return _BCAContextDb.Users.FirstOrDefault(user => user.Email == email);
        }
    }
}
