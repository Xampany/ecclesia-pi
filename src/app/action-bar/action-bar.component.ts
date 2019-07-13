import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pi-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Output()
  flash = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  handleFlash() {
    this.flash.emit();
  }
}
