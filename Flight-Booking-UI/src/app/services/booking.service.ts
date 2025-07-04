import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'https://localhost:7250/api/Booking';

  constructor(private http: HttpClient, private auth: AuthService) {}

  bookFlight(flightId: number, seats: number = 1) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(this.apiUrl, { flightId, seatsBooked: seats }, { headers });
  }

  getMyBookings() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }
  
  cancelBooking(id: number) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  getAllBookings() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(this.apiUrl + '/all', { headers }); // Adjust endpoint if needed
  }


  checkIn(id: number) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(`${this.apiUrl}/checkin/${id}`, null, { headers });
  }

}
