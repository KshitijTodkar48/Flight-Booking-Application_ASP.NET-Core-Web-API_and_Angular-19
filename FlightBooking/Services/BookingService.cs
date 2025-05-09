using FlightBooking.DTOs;
using FlightBooking.Models;
using FlightBooking.Repositories.Interfaces;
using FlightBooking.Services.Interfaces;

namespace FlightBooking.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repo;
        private readonly IFlightRepository _flightRepo;
        private readonly IUserRepository _userRepo;
        private readonly IEmailService _emailService;

        public BookingService(
            IBookingRepository repo,
            IFlightRepository flightRepo,
            IUserRepository userRepo,
            IEmailService emailService)
        {
            _repo = repo;
            _flightRepo = flightRepo;
            _userRepo = userRepo;
            _emailService = emailService;
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync() =>
            await _repo.GetAllAsync();

        public async Task<IEnumerable<Booking>> GetBookingsByPassengerAsync(int passengerId) =>
            await _repo.GetByPassengerIdAsync(passengerId);

        public async Task AddBookingAsync(BookingCreateDto dto, int passengerId)
        {
            try
            {
                var flight = await _flightRepo.GetByIdAsync(dto.FlightId);
                if (flight == null)
                    throw new Exception("Flight not found");

                var user = await _userRepo.GetByIdAsync(passengerId);
                if (user == null)
                    throw new Exception("User not found");

                var booking = new Booking
                {
                    FlightId = dto.FlightId,
                    PassengerId = passengerId,
                    SeatsBooked = dto.SeatsBooked,
                    BookingTime = DateTime.UtcNow
                };

                await _repo.AddAsync(booking);

                // ✅ Send booking email
                _emailService.SendEmail(
                    user.Email,
                    "Flight Booking Confirmation",
                    $"Hi {user.Username},\n\nYour flight from {flight.Departure} to {flight.Arrival} on {flight.DepartureTime} has been booked.\n\nThank you!"
                );
            }
            catch (Exception ex)
            {
                // Log the error in a real-world scenario
                throw new ApplicationException("Booking failed: " + ex.Message);
            }
        }

        public async Task CancelBookingAsync(int id, int passengerId)
        {
            try
            {
                var booking = await _repo.GetByIdAsync(id);
                if (booking == null || booking.PassengerId != passengerId)
                    throw new UnauthorizedAccessException("Booking not found or not allowed");

                var user = await _userRepo.GetByIdAsync(passengerId);
                var flight = await _flightRepo.GetByIdAsync(booking.FlightId);

                await _repo.DeleteAsync(id);

                // ✅ Send cancellation email
                if (user != null && flight != null)
                {
                    _emailService.SendEmail(
                        user.Email,
                        "Booking Cancelled",
                        $"Hi {user.Username},\n\nYour booking for the flight from {flight.Departure} to {flight.Arrival} on {flight.DepartureTime} has been cancelled."
                    );
                }
            }
            catch (Exception ex)
            {
                // Log the error in a real-world scenario
                throw new ApplicationException("Cancellation failed: " + ex.Message);
            }
        }
    }
}
