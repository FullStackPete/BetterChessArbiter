using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Entities
{
    [Collection("addresses")]
    public class Address
    {
        [Required(ErrorMessage ="Address must have Id")]
        public ObjectId Id { get; set; }
        [Required(ErrorMessage ="Address must have an assigned user!")]
        public ObjectId UserId { get; set; }
        [Required(ErrorMessage ="Country is required")]
        public string Country { get; set; }
        [Required(ErrorMessage ="City is required")]
        public string City { get; set; }
        [Required(ErrorMessage = "You must enter a street")]
        public string Street { get; set; }
        [Required(ErrorMessage ="You must enter a house number")]
        public string HouseNumber { get; set; }        
        [Required(ErrorMessage ="You must enter a zip code")]
        
        public string PostalCode { get; set; }
        [Required(ErrorMessage ="Specify whether the address is primary or not")]
        public Boolean isPrimary {  get; set; }
    }
}
