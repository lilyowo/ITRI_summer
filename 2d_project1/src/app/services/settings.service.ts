import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private jsonUrl = '../assets/setting_item.json';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.jsonUrl);
  }
}
