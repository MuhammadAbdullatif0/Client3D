import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../shared/Device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'https://localhost:7292/api/Devices';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }
}
