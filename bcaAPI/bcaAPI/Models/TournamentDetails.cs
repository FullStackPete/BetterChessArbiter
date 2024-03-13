using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Models
{
    public class TournamentDetails
    {
        [Required(ErrorMessage ="Provide start date")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage ="Provide end date")]
        public DateTime EndDate { get; set; }
        
        [Required(ErrorMessage ="Place is required")]
        public string Place { get; set; }
        
        [Required(ErrorMessage ="Game tempo is required")]
        public string GameTempo { get; set; }

        public string Referee { get; set; }
        [Required(ErrorMessage ="Organizer details are required")]
        public string Organizer { get; set; }

        public int RoundsTotal { get; set; }
        public int RoundsEnded { get; set; }
        [Required(ErrorMessage ="Game system is required")]
        public string GameSystem { get; set; }

    }
}
