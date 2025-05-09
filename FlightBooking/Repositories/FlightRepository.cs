using FlightBooking.Data;
using FlightBooking.DTOs;
using FlightBooking.Models;
using FlightBooking.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlightBooking.Repositories
{
    public class FlightRepository : IFlightRepository
    {
        private readonly AppDbContext _context;

        public FlightRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Flight>> GetAllAsync() =>
            await _context.Flights.ToListAsync();

        public async Task<Flight?> GetByIdAsync(int id) =>
            await _context.Flights.FindAsync(id);

        public async Task<IEnumerable<Flight>> SearchFlightsAsync(FlightSearchDto dto)
        {
            return await _context.Flights
                .Where(f =>
                    f.Departure.ToLower() == dto.Departure.ToLower() &&
                    f.Arrival.ToLower() == dto.Arrival.ToLower() &&
                    f.ArrivalTime.Date == dto.Date.Date)
                .ToListAsync();
        }

        public async Task AddAsync(Flight flight)
        {
            await _context.Flights.AddAsync(flight);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Flight flight)
        {
            _context.Flights.Update(flight);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight != null)
            {
                _context.Flights.Remove(flight);
                await _context.SaveChangesAsync();
            }
        }
    }

}
