using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Models
{
    public enum TournamentStatus
    {
        Planned,
        Ongoing,
        Finished,
    }
    public enum TournamentType
    {
        Classic,
        Rapid,
        Blitz,
        Bullet
    }
    [Collection("tournaments")]
    public class Tournament
    {         
        public ObjectId? UserId { get; set; }
        public ObjectId Id { get; set; }
        [Required(ErrorMessage ="Title is required")]
        public string Title { get; set; }        
        public string EventUrl { get; set; }        
        public string County { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public TournamentStatus Status { get; set; }


        [Required(ErrorMessage ="Provide type of tournament")]
        public TournamentType Type {  get; set; }
        [Required(ErrorMessage = "Provide information whether the tournament is FIDE classified")]
        public Boolean IsFide {  get; set; }
        [Required(ErrorMessage ="Provide details for tournament")]
        public TournamentDetails Details { get; set; }        
    }
    

}
