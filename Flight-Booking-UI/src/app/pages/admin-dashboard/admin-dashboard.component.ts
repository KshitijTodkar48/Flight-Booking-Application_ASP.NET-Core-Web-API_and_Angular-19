import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {
  flights: any[] = [];
  bookings: any[] = [];
  editingId: number | null = null;

  newFlight = {
    airline: '',
    departure: '',
    arrival: '',
    departureTime: '',
    arrivalTime: '',
    price: 100
  };

  minDateTime = '';

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for local timezone
    this.minDateTime = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    this.loadData();
  }

  loadData() {
    this.flightService.getAllFlights().subscribe({
      next: (res) => (this.flights = res)
    });

    this.bookingService.getAllBookings().subscribe({
      next: (res) => (this.bookings = res)
    });
  }

  addFlight() {
    this.flightService.addFlight(this.newFlight).subscribe({
      next: () => {
        alert('Flight added');
        this.newFlight = {
          airline: '', departure: '', arrival: '',
          departureTime: '', arrivalTime: '', price: 0
        };
        this.loadData();
      },
      error: () => alert('Failed to add flight')
    });
    }
    editFlight(flight: any) {
      this.editingId = flight.id;
      this.newFlight = {
        airline: flight.airline,
        departure: flight.departure,
        arrival: flight.arrival,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        price: flight.price
      };
    }

    resetForm() {
    this.editingId = null;
    this.newFlight = {
      airline: '',
      departure: '',
      arrival: '',
      departureTime: '',
      arrivalTime: '',
      price: 0
    };
  }


  submitFlight() {
    if (this.editingId) {
      // Update existing
      this.flightService.updateFlight(this.editingId, this.newFlight).subscribe({
        next: () => {
          alert('Flight updated');
          this.resetForm();
          this.loadData();
        },
        error: () => alert('Update failed')
      });
      } else {
      // Add new
      this.flightService.addFlight(this.newFlight).subscribe({
        next: () => {
          alert('Flight added');
          this.resetForm();
          this.loadData();
        },
        error: () => alert('Failed to add flight')
    });
   }
  }

  deleteFlight(id: number) {
    if (!confirm('Delete this flight?')) return;
    this.flightService.deleteFlight(id).subscribe({
      next: () => {
        alert('Flight deleted');
        this.loadData();
      },
      error: () => alert('Deletion failed')
    });
  }

  checkInBooking(id: number) {
    this.bookingService.checkIn(id).subscribe({
      next: () => {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) booking.checkedIn = true;
      },
      error: () => alert('Failed to check in passenger.')
    });
  }
}
