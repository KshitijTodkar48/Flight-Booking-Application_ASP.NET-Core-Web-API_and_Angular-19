using FlightBooking.DTOs;
using FlightBooking.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlightBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _service;

        public FlightController(IFlightService service)
        {
            _service = service;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllFlights()
        {
            var flights = await _service.GetAllFlightsAsync();
            return Ok(flights);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFlightById(int id)
        {
            var flight = await _service.GetFlightByIdAsync(id);
            if (flight == null) return NotFound();
            return Ok(flight);
        }

        [HttpPost("search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchFlights([FromBody] FlightSearchDto dto)
        {
            var flights = await _service.SearchFlightsAsync(dto);
            return Ok(flights);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddFlight([FromBody] FlightCreateDto dto)
        {
            await _service.AddFlightAsync(dto);
            return Ok(new { message = "Flight added." });
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFlight([FromBody] FlightUpdateDto dto)
        {
            await _service.UpdateFlightAsync(dto);
            return Ok(new { message = "Flight updated." });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            await _service.DeleteFlightAsync(id);
            return Ok(new { message = "Flight deleted." });
        }
    }

}
