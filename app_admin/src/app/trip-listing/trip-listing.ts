import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {

  private readonly tripData = inject(TripData);
  private readonly router = inject(Router);

  trips: Trip[] = [];

  ngOnInit(): void {
    console.log('TripListing started');

    this.tripData.getTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('Trips received:', trips);
        this.trips = trips;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }

  editTrip(tripCode: string): void {
    this.router.navigate(['/edit-trip', tripCode]);
  }
}