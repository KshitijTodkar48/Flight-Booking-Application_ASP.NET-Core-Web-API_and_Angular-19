using FlightBooking.Data;
using FlightBooking.Models;
using FlightBooking.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlightBooking.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Booking>> GetAllAsync() =>
            await _context.Bookings.Include(b => b.Flight).Include(b => b.Passenger).ToListAsync();

        public async Task<IEnumerable<Booking>> GetByPassengerIdAsync(int passengerId) =>
            await _context.Bookings
                .Where(b => b.PassengerId == passengerId)
                .Include(b => b.Flight)
                .ToListAsync();

        public async Task<Booking?> GetByIdAsync(int id) =>
            await _context.Bookings.FindAsync(id);

        public async Task AddAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        public async Task CheckInAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) throw new Exception("Booking not found");

            booking.CheckedIn = true;
            await _context.SaveChangesAsync();
        }

    }

}
