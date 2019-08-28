import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class CookieStorage implements Storage {
  [index: number]: string;
  [key: string]: any;
  length: number;

  constructor(private cookieService: CookieService) {
  }

  public clear(): void {
    this.cookieService.deleteAll();
  }

  public getItem(key: string): string {
    return this.cookieService.get(key);
  }

  public key(index: number): string {
    return this.cookieService.getAll().propertyIsEnumerable[index];
  }

  public removeItem(key: string): void {
    this.cookieService.delete(key);
  }

  public setItem(key: string, data: string): void {
    this.cookieService.set(key, data);
  }
}
