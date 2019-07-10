import { Component, OnInit } from '@angular/core';
import { Led } from '../model/led';

@Component({
  selector: 'pi-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LedComponent implements OnInit {
  led: Led = {
    index: 0,
    color: 'blue'
  };

  constructor() {}

  ngOnInit() {}

  handleClick() {
    console.log('Clicked');
  }
}
