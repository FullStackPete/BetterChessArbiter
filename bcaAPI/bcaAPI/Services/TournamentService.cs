using bcaAPI.DBContext;
using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace bcaAPI.Services
{
    public class TournamentService : ITournamentService
    {
        private readonly BCAContextDb _BCAContextDb;
        public TournamentService(BCAContextDb BcaContextDb)
        {
            _BCAContextDb = BcaContextDb;            
        }

        public void AddTournament(Tournament newTournament)
        {                        
            _BCAContextDb.Tournaments.Add(newTournament);
            _BCAContextDb.ChangeTracker.DetectChanges();
            Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
            _BCAContextDb.SaveChanges();
        }

        public void DeleteTournament(Tournament tournament)
        {
            var tournamentToDelete = _BCAContextDb.Tournaments.Where(t=>t.Id==tournament.Id).FirstOrDefault();
            if (tournamentToDelete!=null) {
                _BCAContextDb.Tournaments.Remove(tournamentToDelete);
                _BCAContextDb.ChangeTracker.DetectChanges();
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
                _BCAContextDb.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Tournament to delete was not found");
            }
        }

        public void EditTournament(Tournament tournament)
        {
            var tournamentToUpdate = _BCAContextDb.Tournaments.FirstOrDefault(t => t.Id == tournament.Id);
            if (tournamentToUpdate!=null)
            {
                tournamentToUpdate.Status = tournament.Status;
                tournamentToUpdate.County = tournament.County;
                tournamentToUpdate.Details = tournament.Details;
                tournamentToUpdate.EventUrl = tournament.EventUrl;
                tournamentToUpdate.Title = tournament.Title;
                tournamentToUpdate.Type = tournament.Type;
                tournamentToUpdate.IsFide=tournament.IsFide;
                
                _BCAContextDb.Tournaments.Update(tournamentToUpdate);

                _BCAContextDb.ChangeTracker.DetectChanges();
                Console.WriteLine(_BCAContextDb.ChangeTracker.DebugView.LongView);
                _BCAContextDb.SaveChanges();
            }
            else { throw new ArgumentException("Tournament to update was not found");
            }
        }

        public IEnumerable<Tournament> GetAllTournaments()
        {
            return _BCAContextDb.Tournaments.OrderBy(tournament=>tournament.Id).AsNoTracking().AsEnumerable();
        }

        public Tournament GetTournamentById(Guid id)
        {
            return _BCAContextDb.Tournaments.FirstOrDefault(tournament => tournament.Id == id);
        }
    }
}
