using bcaAPI.Entities;
using MongoDB.Bson;

namespace bcaAPI.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(ObjectId id);

        void AddUser(User newUser);
        void EditUser(User updatedUser);
        void DeleteUser(User userToDelete);
        User FindByEmail(string email);
    }
}
