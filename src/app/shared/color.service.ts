import { Injectable } from '@angular/core';
import { Led } from '../model/led';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as tinycolor from 'tinycolor2';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly BASE_URL =
    'https://e058e2af50c2bd0a8119d48dffc38266.balena-devices.com/api/colors';

  /**
   * Eine Liste zufälliger Farben
   */
  private readonly COLORS = Array.from(Array(8), () =>
    tinycolor.random().toRgbString()
  );

  constructor(private client: HttpClient) {}

  /**
   * Aktualisiert die Farbe für den angegebenen index
   */
  updateColor(index: number, color = 'goldenrod'): Observable<string> {
    const url = `${this.BASE_URL}/${index}`;
    const body = {
      color
    };
    const res$ = this.client
      .put(url, body, {
        responseType: 'text'
      })
      .pipe(catchError(() => of(color)));

    return res$;
  }

  /**
   * Liefert die Liste der Leds mit den aktuellen Farben
   */
  readColors(): Observable<Led[]> {
    const url = this.BASE_URL;
    const res$ = this.client.get<string[]>(url);

    const leds$ = res$.pipe(
      catchError(() => of(this.COLORS)),
      map(colors => this.parseColors(colors))
    );

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
