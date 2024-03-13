using bcaAPI.Models;
using MongoDB.Bson;

namespace bcaAPI.Services.Interfaces
{
    public interface IAddressService
    {
        IEnumerable<Address> GetAllAddresses();
        Address GetAddressById(ObjectId id);

        void AddAddress(Address address);
        void DeleteAddress(Address address);

        void EditAddress(Address address);

    }
}
