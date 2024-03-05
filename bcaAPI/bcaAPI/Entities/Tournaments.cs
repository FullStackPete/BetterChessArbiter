namespace bcaAPI.Entities
{
    public class Tournaments
    {
        public string Title { get; set; }
        public string EventUrl { get; set; }
        public string County { get; set; }
        public string Status { get; set; }
        public string TournamentType {  get; set; }
        public Boolean IsFide {  get; set; }
        public TournamentDetails Details { get; set; }
    }
    public class TournamentDetails
    {
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Place { get; set; }
        public string GameTempo { get; set; } 
        public string Referee { get; set; }
        public string Organizer { get; set; }
        public int RoundsTotal { get; set; }
        public int RoundsEnded { get; set; }
        public string System {  get; set; }

    }

}
