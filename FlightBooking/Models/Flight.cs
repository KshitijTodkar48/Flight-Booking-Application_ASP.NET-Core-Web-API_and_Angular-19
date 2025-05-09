namespace FlightBooking.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public string Airline { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public decimal Price { get; set; }
    }

}
