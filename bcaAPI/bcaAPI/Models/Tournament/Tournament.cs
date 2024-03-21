using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Models.Tournament
{
    
    [Collection("tournaments")]
    public class Tournament
    {        
        public Guid Id { get; set; } = new Guid();
        public Guid? UserId { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        public string EventUrl { get; set; }
        public string County { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }


        [Required(ErrorMessage = "Provide type of tournament")]
        public string Type { get; set; }
        public bool IsVerified { get; set; }
        [Required(ErrorMessage = "Provide information whether the tournament is FIDE classified")]
        public bool IsFide { get; set; }
        [Required(ErrorMessage = "Provide details for tournament")]
        public TournamentDetails Details { get; set; }
    }
    public enum Type{
        Rapid,
        Classic,
        Blitz,
        Bullet,
         
    }
    public enum Status
    {
        Planned,
        Ongoing,
        NoInfo,
        Finished,
    }

}