import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../shared/color.service';
import { map } from 'rxjs/operators';
import { Led } from '../model/led';
import { Observable } from 'rxjs';

@Component({
  selector: 'pi-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  led: Led;

  led$: Observable<Led>;

  constructor(private route: ActivatedRoute, private service: ColorService) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');

    this.led$ = this.service.readColors().pipe(map(leds => leds[index]));
  }
}
