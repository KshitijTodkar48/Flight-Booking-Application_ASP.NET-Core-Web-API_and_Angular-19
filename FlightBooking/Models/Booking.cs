using System.ComponentModel.DataAnnotations.Schema;

namespace FlightBooking.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public int PassengerId { get; set; }

        public DateTime BookingTime { get; set; } = DateTime.UtcNow;
        public int SeatsBooked { get; set; }

        public Flight Flight { get; set; }
        public User Passenger { get; set; }
    }
}
