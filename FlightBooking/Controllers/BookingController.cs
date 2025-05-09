using FlightBooking.DTOs;
using FlightBooking.Models;
using FlightBooking.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlightBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _service;

        public BookingController(IBookingService service)
        {
            _service = service;
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _service.GetAllBookingsAsync();
            return Ok(bookings);
        }

        [HttpGet]
        [Authorize(Roles = "Passenger")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var bookings = await _service.GetBookingsByPassengerAsync(userId);
            return Ok(bookings);
        }

        [HttpPost]
        [Authorize(Roles = "Passenger")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await _service.AddBookingAsync(dto, userId);
            return Ok(new { message = "Flight booked successfully." });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Passenger")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await _service.CancelBookingAsync(id, userId);
            return Ok(new { message = "Booking canceled." });
        }
    }

}
