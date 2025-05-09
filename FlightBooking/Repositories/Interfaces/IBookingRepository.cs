using FlightBooking.Models;

namespace FlightBooking.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<IEnumerable<Booking>> GetByPassengerIdAsync(int passengerId);
        Task<Booking?> GetByIdAsync(int id);
        Task AddAsync(Booking booking);
        Task DeleteAsync(int id);
    }

}
