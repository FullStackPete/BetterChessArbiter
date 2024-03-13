using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bcaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        public readonly ITournamentService _tournamentService;
        public TournamentController(ITournamentService tournamentService)
        {
            _tournamentService = tournamentService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Tournament>> GetTournaments()
        {
            var allTournaments = _tournamentService.GetAllTournaments();
            return Ok(allTournaments);
        }
        [HttpGet("{id}")]
        public ActionResult<Tournament> GetTournamentById(string id)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            var tournament = _tournamentService.GetTournamentById(objectId);

            if (tournament == null) { return NotFound(); }
            return Ok(tournament);
        }
        [HttpPost]
        public ActionResult<Tournament> PostTournament(Tournament tournament)
        {
            _tournamentService.AddTournament(tournament);
            return CreatedAtAction(nameof(GetTournamentById), new {id = tournament.Id}, tournament);
        }
        [HttpPut("{id}")]
        public IActionResult PutTournament(string id, Tournament tournament)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            if (!_tournamentService.GetTournamentById(objectId).Equals(tournament))
            {
                return BadRequest();
            }
            try
            {
                _tournamentService.EditTournament(tournament);
            }
            catch (DbUpdateConcurrencyException) {
                return NotFound();
            }
            return Ok(tournament);
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteTournament(string id) {
            var objectId = new MongoDB.Bson.ObjectId(id);
            var tournament = _tournamentService.GetTournamentById(objectId);
            if(tournament == null) {
                return NotFound();
            }
            _tournamentService.DeleteTournament(tournament);            
            return NoContent();

        }
    }
}
