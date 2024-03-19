using bcaAPI.Models.Tournament;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace bcaAPI.Controllers

{

    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly ITournamentService _tournamentService;
        private readonly IUserService _userService;
        public TournamentController(ITournamentService tournamentService, IUserService userService)
        {
            _tournamentService = tournamentService;
            _userService = userService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Tournament>> GetTournaments()
        {
            var allTournaments = _tournamentService.GetAllTournaments();
            return Ok(allTournaments);
        }
        [HttpGet("{id}")]
        public ActionResult<Tournament> GetTournamentById(Guid id)
        {                        
            var tournament = _tournamentService.GetTournamentById(id);

            if (tournament == null) { return NotFound(); }
            return Ok(tournament);
        }
        [HttpPost]
        public ActionResult<Tournament> PostTournament(Tournament tournament)
        {                        
            _tournamentService.AddTournament(tournament);
            return CreatedAtAction(nameof(GetTournamentById), new { id = tournament.Id }, tournament);
        }
        [HttpPut("{id}")]
        public ActionResult PutTournament(Guid id, Tournament tournament)
        {
            
            if (!_tournamentService.GetTournamentById(id).Equals(tournament))
            {
                return BadRequest();
            }
            try
            {
                _tournamentService.EditTournament(tournament);
            }
            catch (DbUpdateConcurrencyException ex) {
                return NotFound(ex.Message);
            }
            return Ok(tournament);
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteTournament(Guid id) {            
            var tournament = _tournamentService.GetTournamentById(id);
            if(tournament == null) {
                return NotFound();
            }
            _tournamentService.DeleteTournament(tournament);            
            return NoContent();

        }
    }
}
