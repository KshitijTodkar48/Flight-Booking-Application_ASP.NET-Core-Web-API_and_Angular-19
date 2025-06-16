import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FlightService } from '../../../services/flight.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightSearchComponent } from '../../flight-search/flight-search.component';

@Component({
  selector: 'app-available-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightSearchComponent],
  templateUrl: './available-flights.component.html'
})
export class AvailableFlightsComponent implements OnInit {
  flights: any[] = [];

  constructor(
    private flightService: FlightService,
    public auth: AuthService,
    private router: Router
  ) {}

  loadAllFlights() {
    this.flightService.getAllFlights().subscribe({
      next: res => this.flights = res,
      error: () => alert('Failed to load flights.')
    });
  }

  ngOnInit() {
    this.loadAllFlights();
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

  onSearch(criteria: { departure: string; arrival: string; date: Date }) {
    this.flightService.searchFlights(criteria).subscribe({
      next: res => this.flights = res,
      error: () => alert('No flights found or error occurred.')
    });
  }

  onClearSearch() {
    this.loadAllFlights();
  }

}
