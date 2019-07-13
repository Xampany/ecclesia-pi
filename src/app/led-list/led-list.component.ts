import { Component, OnInit, OnDestroy } from '@angular/core';
import { Led } from '../model/led';
import { ColorService } from '../shared/color.service';
import { tap, switchMap, take } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'pi-led-list',
  templateUrl: './led-list.component.html',
  styleUrls: ['./led-list.component.css']
})
export class LedListComponent implements OnInit, OnDestroy {
  leds: Led[];

  private sub: Subscription;

  constructor(private service: ColorService) {}

  ngOnInit() {
    const regular$ = interval(1000);

    this.sub = regular$
      .pipe(
        take(2),
        tap(index => console.log(index)),
        switchMap(() => {
          return this.service.readColors();
        }),
        tap(leds => console.log(leds))
      )
      .subscribe({
        next: leds => (this.leds = leds),
        complete: () => console.log('complete')
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateLed(index: number) {
    console.log(index);
    this.service
      .updateColor(index)
      .pipe(tap(res => console.log(res)))
      .subscribe({
        next: color => (this.leds[index] = { index, color })
      });
  }

  updateFlash() {
    // TODO service aufrufen
  }
}
