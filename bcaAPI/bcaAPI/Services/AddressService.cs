using bcaAPI.DBContext;
using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using MongoDB.Bson;

namespace bcaAPI.Services
{
    public class AddressService : IAddressService
    {
        private readonly BCAContextDb _BCAContextDb;
        public AddressService(BCAContextDb BCAContextDb)
        {
            _BCAContextDb = BCAContextDb;
        }
        public void AddAddress(Address address)
        {
            _BCAContextDb.Add(address);

            _BCAContextDb.ChangeTracker.DetectChanges();
            Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
            _BCAContextDb.SaveChanges();

        }

        public void DeleteAddress(Address address)
        {
            var addressToDelete = _BCAContextDb.Addresses.Where(a => a.Id == address.Id).FirstOrDefault();
            if (addressToDelete != null)
            {
                _BCAContextDb.Addresses.Remove(addressToDelete);
                _BCAContextDb.ChangeTracker.DetectChanges() ;
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
                _BCAContextDb.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Address to delete was not found");
            }
        }

        public void EditAddress(Address address)
        {
            var addressToEdit = _BCAContextDb.Addresses.FirstOrDefault();
            if (addressToEdit != null)
            {
                addressToEdit.Country = address.Country;
                addressToEdit.City = address.City;
                addressToEdit.Street = address.Street;
                addressToEdit.HouseNumber = address.HouseNumber;
                addressToEdit.PostalCode = address.PostalCode;
                addressToEdit.isPrimary = address.isPrimary;
            }
        }

        public Address GetAddressById(ObjectId id)
        {
            return _BCAContextDb.Addresses.FirstOrDefault(a => a.Id == id);
        }
        public IEnumerable<Address> GetAddressesByUserId(ObjectId id)
        {
            return _BCAContextDb.Addresses.OrderBy(a => a.UserId == id);
        }

        public IEnumerable<Address> GetAllAddresses()
        {
            return _BCAContextDb.Addresses.OrderBy(a => a.UserId);
        }
    }
}
