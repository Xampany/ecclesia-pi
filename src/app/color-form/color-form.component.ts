import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pi-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {
  color = 'red';

  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      color: new FormControl('goldenrod', [
        Validators.required,
        Validators.minLength(3)
      ])
    });

    this.form.get('color').valueChanges.subscribe({
      next: v => console.log(v)
    });
  }

  updateColor(value: { color: string }) {
    // TODO an service senden this.color
    console.log(value);
  }
}
