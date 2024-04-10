import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = 50000;
    if (value.size > maxSize) {
      throw new BadRequestException(`File is too large`);
    }
    return value;
  }
}
