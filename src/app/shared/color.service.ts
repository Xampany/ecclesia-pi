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
    'https://e058e2af50c2bd0a8119d48dffc38266.balena-devices.com/api/colors';

  constructor(private client: HttpClient) {}

  /**
   * Aktualisiert die Farbe für den angegebenen index
   */
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

  /**
   * Liefert die Liste der Leds mit den aktuellen Farben
   */
  readColors(): Observable<Led[]> {
    const url = this.BASE_URL;
    const res$ = this.client.get<string[]>(url);

    const leds$ = res$.pipe(map(colors => this.parseColors(colors)));

    return leds$;
  }

  /**
   *
   * @param colors Die Farben als Liste von Strings
   */
  private parseColors(colors: string[]): Led[] {
    return colors.map((color, index) => ({ index, color }));
  }
}
