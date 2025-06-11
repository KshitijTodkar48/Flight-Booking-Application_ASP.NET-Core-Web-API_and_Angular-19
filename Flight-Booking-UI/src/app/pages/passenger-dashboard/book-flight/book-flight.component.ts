import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../../services/flight.service';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-flight.component.html'
})

export class BookFlightComponent implements OnInit {
  flight: any;
  passengers: { name: string; age: number | string; passport: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('flightId'));
    this.flightService.getAllFlights().subscribe((flights) => {
      this.flight = flights.find(f => f.id === id);
    });

    this.addPassenger(); // initialize with one passenger
  }

  addPassenger() {
    this.passengers.push({ name: '', age: '', passport: '' });
  }

  removePassenger(index: number) {
    this.passengers.splice(index, 1);
  }

  submit() {
    const seats = this.passengers.length;

    this.bookingService.bookFlight(this.flight.id, seats).subscribe({
      next: () => {
        alert(`Booked ${seats} seat(s) successfully.`);
        this.router.navigate(['/my-bookings']);
      },
      error: () => {
        alert('Booking failed. Please try again.');
      }
    });
  }
}
