import { Pipe, PipeTransform } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Pipe({
  name: 'piColor'
})
export class PiColorPipe implements PipeTransform {
  transform(value: string, format?: any): string {
    return tinycolor(value).toString(format);
  }
}
