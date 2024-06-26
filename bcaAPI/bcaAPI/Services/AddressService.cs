﻿using bcaAPI.DBContext;
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
            var addressToEdit = _BCAContextDb.Addresses.Find(address.Id); // fix this fucking shit 
            if (addressToEdit != null)
            {
                if (address.isPrimary)
                {
                    var userAdresses = _BCAContextDb.Addresses.Where(a => a.UserId == address.UserId && a.Id != address.Id).ToList();
                    foreach(var addr in userAdresses)
                    {
                        addr.isPrimary = false;
                    }
                }
                addressToEdit.Name = address.Name;
                addressToEdit.Country = address.Country;
                addressToEdit.City = address.City;
                addressToEdit.Street = address.Street;
                addressToEdit.HouseNumber = address.HouseNumber;
                addressToEdit.PostalCode = address.PostalCode;
                addressToEdit.isPrimary = address.isPrimary;

                _BCAContextDb.Addresses.Update(addressToEdit);
                _BCAContextDb.ChangeTracker.DetectChanges();
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);


                _BCAContextDb.SaveChanges();
            }
        }

        public Address GetAddressById(Guid id)
        {
            return _BCAContextDb.Addresses.FirstOrDefault(a => a.Id == id);
        }
        public IEnumerable<Address> GetAddressesByUserId(Guid id)
        {
            return _BCAContextDb.Addresses.OrderBy(a => a.UserId == id);
        }

        public IEnumerable<Address> GetAllAddresses()
        {
            return _BCAContextDb.Addresses.OrderBy(a => a.UserId);
        }
    }
}
