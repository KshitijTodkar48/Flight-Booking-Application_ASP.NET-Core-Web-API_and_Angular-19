import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { FlightService } from '../../../services/flight.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-available-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  seatsToBook: { [flightId: number]: number } = {};

  book(flightId: number) {
    const seats = this.seatsToBook[flightId] || 1; // default to 1 seat if none entered
    this.bookingService.bookFlight(flightId, seats).subscribe({
      next: () => alert('Flight booked successfully!'),
      error: () => alert('Booking failed or not authorized.')
    });
  }
}
