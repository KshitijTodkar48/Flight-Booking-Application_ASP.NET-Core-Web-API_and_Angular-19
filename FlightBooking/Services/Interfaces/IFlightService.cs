using FlightBooking.DTOs;
using FlightBooking.Models;

namespace FlightBooking.Services.Interfaces
{
    public interface IFlightService
    {
        Task<IEnumerable<Flight>> GetAllFlightsAsync();
        Task<Flight?> GetFlightByIdAsync(int id);
        Task<IEnumerable<Flight>> SearchFlightsAsync(FlightSearchDto dto);

        Task AddFlightAsync(FlightCreateDto dto);
        Task UpdateFlightAsync(FlightUpdateDto dto);
        Task DeleteFlightAsync(int id);
    }

}
