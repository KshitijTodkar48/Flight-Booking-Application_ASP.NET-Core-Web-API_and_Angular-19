using FlightBooking.DTOs;
using FlightBooking.Models;
using FlightBooking.Repositories.Interfaces;
using FlightBooking.Services.Interfaces;

namespace FlightBooking.Services
{
    public class FlightService : IFlightService
    {
        private readonly IFlightRepository _flightRepo;

        public FlightService(IFlightRepository flightRepo)
        {
            _flightRepo = flightRepo;
        }

        public async Task<IEnumerable<Flight>> GetAllFlightsAsync() =>
            await _flightRepo.GetAllAsync();

        public async Task<IEnumerable<Flight>> SearchFlightsAsync(FlightSearchDto dto)
        {
            return await _flightRepo.SearchFlightsAsync(dto);
        }

        public async Task<Flight?> GetFlightByIdAsync(int id) =>
            await _flightRepo.GetByIdAsync(id);

        public async Task AddFlightAsync(FlightCreateDto dto)
        {
            var flight = new Flight
            {
                Airline = dto.Airline,
                Departure = dto.Departure,
                Arrival = dto.Arrival,
                DepartureTime = dto.DepartureTime,
                ArrivalTime = dto.ArrivalTime,
                Price = dto.Price
            };
            await _flightRepo.AddAsync(flight);
        }

        public async Task UpdateFlightAsync(FlightUpdateDto dto)
        {
            var flight = new Flight
            {
                Id = dto.Id,
                Airline = dto.Airline,
                Departure = dto.Departure,
                Arrival = dto.Arrival,
                DepartureTime = dto.DepartureTime,
                ArrivalTime = dto.ArrivalTime,
                Price = dto.Price
            };
            await _flightRepo.UpdateAsync(flight);
        }

        public async Task DeleteFlightAsync(int id) =>
            await _flightRepo.DeleteAsync(id);
    }

}
