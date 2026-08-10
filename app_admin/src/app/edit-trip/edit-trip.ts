import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  private readonly tripData = inject(TripData);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  ngOnInit(): void {
    const tripCode =
      this.route.snapshot.paramMap.get('tripCode') ||
      this.route.snapshot.paramMap.get('code');

    console.log('Edit trip code:', tripCode);

    if (!tripCode) {
      console.error('No trip code found in route.');
      return;
    }

    this.tripData.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        console.log('Trip loaded for editing:', trip);
        this.trip = trip;
      },
      error: (err) => {
        console.error('Error loading trip:', err);
      }
    });
  }

  updateTrip(): void {
    console.log('Saving trip:', this.trip);

    this.tripData.updateTrip(this.trip).subscribe({
      next: (updatedTrip) => {
        console.log('Trip updated:', updatedTrip);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating trip:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}