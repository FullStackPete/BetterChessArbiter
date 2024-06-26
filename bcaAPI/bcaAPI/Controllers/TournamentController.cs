﻿using bcaAPI.Models;
using bcaAPI.Models.Tournament;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IGoogleMapService _googleMapService;
        public TournamentController(ITournamentService tournamentService, IUserService userService, IGoogleMapService googleMapService)
        {
            _tournamentService = tournamentService;
            _userService = userService;
            _googleMapService = googleMapService;
        }
        
        [HttpGet("mostpopulartournaments")]
        public ActionResult <IEnumerable<Tournament>> Get10MostPopular() {
            var mostPopularTournaments = _tournamentService.GetAllTournaments().OrderByDescending(t=>t.Details.NumOfPlayers).Take(10);
            return Ok(mostPopularTournaments);
        }
        [HttpGet]
        public ActionResult<IEnumerable<Tournament>> GetTournaments()
        {
            var allTournaments = _tournamentService.GetAllTournaments();
            return Ok(allTournaments);
        }
        [Authorize(Roles ="Moderator,Admin")]
        [HttpGet("verifytournaments")]
        public ActionResult<IEnumerable<Tournament>> GetNotVerifiedTournaments()
        {
            var tournamentsToVerify = _tournamentService.GetAllTournaments().Where(t => t.IsVerified == false);
            return Ok(tournamentsToVerify);
        }
        [HttpGet("{id}")]
        public ActionResult<Tournament> GetTournamentById(Guid id)
        {                        
            var tournament = _tournamentService.GetTournamentById(id);

            if (tournament == null) { return NotFound(); }
            return Ok(tournament);
        }
        [Authorize(Roles ="Organizer,Admin,Moderator")]
        [HttpPost]
        public ActionResult<Tournament> PostTournament(Tournament tournament)
        {                        
            _tournamentService.AddTournament(tournament);
            return CreatedAtAction(nameof(GetTournamentById), new { id = tournament.Id }, tournament);
        }
        [Authorize(Roles ="Organizer, Admin, Moderator")]
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
        [Authorize(Roles ="Admin, Moderator")]
        [HttpDelete("{id}")]
        public ActionResult DeleteTournament(Guid id) {            
            var tournament = _tournamentService.GetTournamentById(id);
            if(tournament == null) {
                return NotFound();
            }
            _tournamentService.DeleteTournament(tournament);            
            return NoContent();
        }
        [HttpGet("coordinates/{id}")]
        public async Task<ActionResult<Coordinates>> GetCoordinates(Guid id)
        {
            
                var tournament = _tournamentService.GetTournamentById(id);
                if(tournament == null)
                {
                    return NotFound("ERROR");
                }
                var place = tournament.Details.Place;

                var coordinates = await _googleMapService.GetCoordinatesAsync(place);
                return Ok(coordinates);

                      

        }
        
    }
}
