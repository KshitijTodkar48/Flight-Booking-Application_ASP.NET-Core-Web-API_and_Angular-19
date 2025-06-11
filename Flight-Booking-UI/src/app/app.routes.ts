import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AvailableFlightsComponent } from './pages/passenger-dashboard/available-flights/available-flights.component';
import { MyBookingsComponent } from './pages/passenger-dashboard/my-bookings/my-bookings.component';
import { authGuard } from './guards/auth.guard';
import { passengerGuard } from './guards/passenger.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: AvailableFlightsComponent },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard, passengerGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'book/:flightId',
    loadComponent: () =>
      import('./pages/passenger-dashboard/book-flight/book-flight.component')
        .then(m => m.BookFlightComponent),
    canActivate: [authGuard, passengerGuard]
  },
  { path: '', redirectTo: 'flights', pathMatch: 'full' }
];
