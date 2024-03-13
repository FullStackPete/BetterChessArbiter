using bcaAPI.Models;
using bcaAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Cryptography.X509Certificates;

namespace bcaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _addressService;
        public AddressController(AddressService addressService)
        {
            _addressService = addressService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Address>> GetAddresses()
        {
            var allAddresses = _addressService.GetAllAddresses();
            return Ok(allAddresses);
        }

        [HttpGet("{id}")]
        public ActionResult<Address> GetAddress(string id)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            var address = _addressService.GetAddressById(objectId);
            if (address != null) {
                return Ok(address);
                }
            return BadRequest();
        }
        [HttpPost]
        public ActionResult<Address> AddAddress(Address address) {
            _addressService.AddAddress(address);
            return Ok(address);    
            
        }
        [HttpPut("{id}")]
        public ActionResult UpdateAddress(string id,Address newAddress) {
        var idToUpdate = new MongoDB.Bson.ObjectId(id);
            if(!_addressService.GetAddressById(idToUpdate).Equals(newAddress))
            {
                return BadRequest("Ids don't match!");
            }
            try
            {
                _addressService.EditAddress(newAddress);
            }
            catch (DBConcurrencyException ex) {
            return BadRequest(ex.Message);  
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteAddress(string id)
        {
            
            var objectId = new MongoDB.Bson.ObjectId(id);
            var address = _addressService.GetAddressById(objectId);
            try
            {
                _addressService.DeleteAddress(address);
                return Ok("Address deleted");
            }
            catch (DBConcurrencyException ex)
            {
                return NotFound(ex.Message);
            }            
        }

    }
}
