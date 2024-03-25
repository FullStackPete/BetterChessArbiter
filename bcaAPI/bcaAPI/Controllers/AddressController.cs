using bcaAPI.Models;
using bcaAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;
using System.Security.Claims;
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
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<Address>> GetAddresses()
        {
            var allAddresses = _addressService.GetAllAddresses();
            return Ok(allAddresses);
        }
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Address> GetAddressById(Guid id)
        {
            var addressOfUser = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (addressOfUser != id.ToString() )
            {
                return Forbid();
            }

            var address = _addressService.GetAddressById(id);
            if (address != null) {
                return Ok(address);
                }
            return BadRequest();
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Address> AddAddress(Address address) {
            var addressOfUser = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (addressOfUser != address.UserId.ToString()) {
                return Forbid();
            }
            _addressService.AddAddress(address);
            return Ok(address);    
            
        }

        [HttpPut("{id}")]
        public ActionResult UpdateAddress(Guid id,Address newAddress) {
            var addressOfUser = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (addressOfUser != newAddress.UserId.ToString())
            {
                return Forbid();
            }
            if(!_addressService.GetAddressById(id).Equals(newAddress))
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
        public ActionResult DeleteAddress(Guid id)
        {
            var addressOfUser = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (addressOfUser != id.ToString())
            {
                return Forbid();
            }
            var address = _addressService.GetAddressById(id);
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
