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
    if (!this.departure || !this.arrival || !this.date) {
      alert('Please fill all fields');
      return;
    }

    this.search.emit({
      departure: this.departure.trim(),
      arrival: this.arrival.trim(),
      date: new Date(this.date)
    });
  }
  
}
