using FlightBooking.DTOs;
using FlightBooking.Models;

namespace FlightBooking.Repositories.Interfaces
{
    public interface IFlightRepository
    {
        Task<IEnumerable<Flight>> GetAllAsync();
        Task<Flight?> GetByIdAsync(int id);
        Task<IEnumerable<Flight>> SearchFlightsAsync(FlightSearchDto dto);

        Task AddAsync(Flight flight);
        Task UpdateAsync(Flight flight);
        Task DeleteAsync(int id);
    }

}
