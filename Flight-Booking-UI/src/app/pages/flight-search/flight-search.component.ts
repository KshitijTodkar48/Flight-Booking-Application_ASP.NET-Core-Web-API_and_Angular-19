import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent {
  departure = '';
  arrival = '';
  date = '';
  minDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  @Output() search = new EventEmitter<{
    departure: string;
    arrival: string;
    date: Date;
  }>();

  @Output() clear = new EventEmitter<void>();

  clearSearch() {
    this.departure = '';
    this.arrival = '';
    this.date = '';
    this.clear.emit();
  }

  onSubmit() {
    const trimmedDeparture = this.departure.trim().toLowerCase();
    const trimmedArrival = this.arrival.trim().toLowerCase();
    const selectedDate = new Date(this.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time for accurate comparison

    if (!this.departure || !this.arrival || !this.date) {
      alert('Please fill all fields');
      return;
    }

    if (trimmedDeparture === trimmedArrival) {
      alert('Departure and arrival locations cannot be the same.');
      return;
    }

    if (selectedDate < today) {
      alert('You cannot search for flights in the past.');
      return;
    }

    this.search.emit({
      departure: this.departure.trim(),
      arrival: this.arrival.trim(),
      date: selectedDate
    });
  }
}
