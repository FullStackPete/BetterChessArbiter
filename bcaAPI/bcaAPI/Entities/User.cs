﻿using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Entities
{
    [Collection("users")]
    public class User
    {       
        public ObjectId Id { get; set; }
        [MinLength(1,ErrorMessage ="Name must be at least 1 character long")]
        [Required(ErrorMessage ="You must provide first name")]
        public string Name { get; set; }

        [MinLength(1, ErrorMessage = "Surame must be at least 1 character long")]
        [Required(ErrorMessage="You must provide surname")]
        public string Surname { get; set; }

        [EmailAddress(ErrorMessage ="Must be an email address.")]
        [Required(ErrorMessage ="You must provide email")]
        public string Email { get; set; }

        [MinLength(8,ErrorMessage ="Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[0-9]).+$", ErrorMessage = "Password must contain at least one numeric digit")]
        [Required(ErrorMessage ="Please provide password")]
        public string Password { get; set; }
        [Required(ErrorMessage ="Please provide gender")]
        public string Sex { get; set; }
        public Boolean EmailConfirmed { get; set; }
        [Required(ErrorMessage ="User must have a role")]
        public string Role { get; set; }


    }
}
