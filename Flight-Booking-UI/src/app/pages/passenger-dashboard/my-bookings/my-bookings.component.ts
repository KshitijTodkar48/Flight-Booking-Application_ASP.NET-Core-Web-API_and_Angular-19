import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService, public auth: AuthService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (res) => (this.bookings = res),
      error: () => alert('Failed to load bookings')
    });
  }

  cancelBooking(id: number) {
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        alert('Booking cancelled');
        this.loadBookings();
      },
      error: () => alert('Cancellation failed')
    });
  }
}
