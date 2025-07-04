using FlightBooking.DTOs;
using FlightBooking.Models;

namespace FlightBooking.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<IEnumerable<Booking>> GetBookingsByPassengerAsync(int passengerId);
        Task AddBookingAsync(BookingCreateDto dto, int passengerId);
        Task CancelBookingAsync(int id, int passengerId);
        Task CheckInAsync(int id);
    }

}
