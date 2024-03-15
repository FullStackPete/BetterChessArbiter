using bcaAPI.Models;
using MongoDB.Bson;

namespace bcaAPI.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(Guid id);

        void AddUser(User newUser);
        void EditUser(User updatedUser);
        void DeleteUser(User userToDelete);
        User FindByEmail(string email);
    }
}
