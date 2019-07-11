import { Injectable } from '@angular/core';
import { Led } from '../model/led';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly BASE_URL =
    'https://ae680a0551cf8bd14b83c131e0796b82.balena-devices.com/api/colors';

  constructor(private client: HttpClient) {}

  updateColor(index: number, color = 'goldenrod'): Observable<string> {
    const url = `${this.BASE_URL}/${index}`;
    const body = {
      color
    };
    const res$ = this.client.put(url, body, {
      responseType: 'text'
    });

    return res$;
  }

  readColors(): Observable<Led[]> {
    const url = this.BASE_URL;
    const res$ = this.client.get<string[]>(url);

    const leds$ = res$.pipe(
      map(colors => {
        const leds: Led[] = [];
        for (let i = 0; i < colors.length; i++) {
          leds.push({
            index: i,
            color: colors[i]
          });
        }
        return leds;
      })
    );

    return leds$;
  }
}
