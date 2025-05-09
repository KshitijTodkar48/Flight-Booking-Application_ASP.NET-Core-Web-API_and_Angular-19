namespace FlightBooking.DTOs
{
    public class FlightSearchDto
    {
        public string Departure { get; set; } = string.Empty;
        public string Arrival { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }

}
