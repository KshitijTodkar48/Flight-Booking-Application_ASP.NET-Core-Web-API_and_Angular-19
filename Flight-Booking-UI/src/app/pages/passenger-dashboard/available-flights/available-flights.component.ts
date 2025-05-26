import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-available-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-flights.component.html'
})
export class AvailableFlightsComponent implements OnInit {
  flights: any[] = [];

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService,
    public auth: AuthService // used in template
  ) {}

  ngOnInit() {
    this.flightService.getAllFlights().subscribe({
      next: (res) => (this.flights = res),
      error: () => alert('Failed to load flights'),
    });
  }

  book(flightId: number) {
    this.bookingService.bookFlight(flightId).subscribe({
      next: () => alert('Flight booked successfully!'),
      error: () => alert('Booking failed or not authorized.')
    });
  }
}
