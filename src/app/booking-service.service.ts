import { Injectable } from '@angular/core';

@Injectable()
export class BookingServiceService {

  constructor() { }
  private booking = {};

  setBooking(value) {
    this.booking = value;
  }

  getBooking() {
    return this.booking;
  }
}
