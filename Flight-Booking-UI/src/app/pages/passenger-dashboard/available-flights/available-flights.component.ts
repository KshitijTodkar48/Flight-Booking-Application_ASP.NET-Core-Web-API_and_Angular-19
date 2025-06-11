import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { FlightService } from '../../../services/flight.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.flightService.getAllFlights().subscribe({
      next: (res) => (this.flights = res),
      error: () => alert('Failed to load flights'),
    });
  }

  seatsToBook: { [flightId: number]: number } = {};

  book(flightId: number) {
    if(!this.auth.getToken()) {
       this.router.navigate(['/login']) ;
    }
    else {
       this.router.navigate([`/book/${flightId}`]) ;
    }
  }
}
