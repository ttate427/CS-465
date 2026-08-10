import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  private readonly tripData = inject(TripData);

  newTrip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  message = '';

  addTrip(): void {
    this.tripData.addTrip(this.newTrip).subscribe({
      next: () => {
        this.message = 'Trip added successfully!';

        this.newTrip = {
          code: '',
          name: '',
          length: '',
          start: '',
          resort: '',
          perPerson: '',
          image: '',
          description: ''
        };
      },
      error: (err) => {
        console.error('Error adding trip:', err);
        this.message = 'Unable to add trip.';
      }
    });
  }
}
