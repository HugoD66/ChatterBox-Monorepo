import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate',
})
export class TruncateLongPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 150) {
      return value.substring(0, 150) + '...';
    } else {
      return value;
    }
  }
}
