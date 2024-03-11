using bcaAPI.Entities;
using MongoDB.Bson;

namespace bcaAPI.Services.Interfaces
{
    public interface ITournamentService
    {
        IEnumerable<Tournament> GetAllTournaments();
        Tournament GetTournamentById(ObjectId id);

        void AddTournament(Tournament newTournament);
        void EditTournament(Tournament editedTournament);
        void DeleteTournament(Tournament tournamentToDelete);
    }
}
