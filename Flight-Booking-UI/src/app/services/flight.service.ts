import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private apiUrl = 'https://localhost:7250/api/flight';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllFlights() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addFlight(data: any) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(this.apiUrl, data, { headers });
  }

  updateFlight(id: number, data: any) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}`, {...data, id}, { headers });
  }

  deleteFlight(id: number) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  searchFlights(criteria: { departure: string; arrival: string; date: Date }) {
    const url = `${this.apiUrl}/search`;
    return this.http.post<any[]>(url, criteria);
  }
}
