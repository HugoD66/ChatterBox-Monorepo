import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatPluralize',
})
export class FormatPluralizePipe implements PipeTransform {
  transform(value: number, singular: string, plural: string): string {
    return `${value} ${value === 1 ? singular : plural}`;
  }
}
