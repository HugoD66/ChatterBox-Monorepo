import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageValidationService {
  validateMessage(message: string): boolean {
    // HTML validation
    if (/<[^>]*>/g.test(message)) {
      console.log('Validation failed: HTML tags are not allowed.');
      return false;
    }
    // JavaScript validation
    if (/script.*?\/script/.test(message)) {
      console.log('Validation failed: JavaScript content is not allowed.');
      return false;
    }
    // URL validation
    if (
      /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi.test(
        message,
      )
    ) {
      console.log('Validation failed: URLs are not allowed.');
      return false;
    }
    //Trop gros message
    if (message.length > 1000) {
      console.log('Validation failed: Message is too long.');
      return false;
    }
    return true;
  }
}
