import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  private apiKey = 'AIzaSyBCZaKItU1xHKDPjehxZyNRxMBwYyw0vvU';

  constructor(private http: HttpClient) { }

  geocodeAddress(address: string): Observable<any> {
    const encodedAddress = encodeURIComponent(address);
    const url = `${this.apiUrl}?address=${encodedAddress}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
