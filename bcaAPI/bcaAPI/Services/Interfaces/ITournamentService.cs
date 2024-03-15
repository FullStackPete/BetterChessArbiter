using bcaAPI.Models;
using MongoDB.Bson;

namespace bcaAPI.Services.Interfaces
{
    public interface ITournamentService
    {
        IEnumerable<Tournament> GetAllTournaments();
        Tournament GetTournamentById(Guid id);

        void AddTournament(Tournament newTournament);
        void EditTournament(Tournament editedTournament);
        void DeleteTournament(Tournament tournamentToDelete);
    }
}
