﻿using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace bcaAPI.Models.Tournament
{
    public class TournamentDetails
    {
        [Required(ErrorMessage = "Provide start date")]
        public DateTime? StartDate { get; set; }

       [Required(ErrorMessage = "Provide end date")]
        public DateTime? EndDate { get; set; }

       [Required(ErrorMessage = "Place is required")]
        public string? Place { get; set; }

       [Required(ErrorMessage = "Game tempo is required")]
        public string? GameTempo { get; set; }

        public string? Referee { get; set; }
        [Required(ErrorMessage = "Organizer details are required")]
        public string? Organizer { get; set; }

        public int? RoundsTotal { get; set; }
        public int? RoundsEnded { get; set; }
       [Required(ErrorMessage = "Game system is required")]
        public string? GameSystem { get; set; }

        public int? NumOfTeams { get; set; }
      
        public int? NumOfPlayers { get; set; }
      
        public int? NumOfFederations { get; set; }
        public int? ContestantsWithFIDE { get; set; }
        public int? NumOfWomen { get; set; }
        public int? AverageRanking { get; set; }
      
      
    }
}
