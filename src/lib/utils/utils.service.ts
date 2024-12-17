import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  genRandomString(length: number = 24): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let secretCode = '';

    for (let i = 0; i <= length; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      secretCode += chars.substring(randomNumber, randomNumber + 1);
    }

    return secretCode;
  }
}
