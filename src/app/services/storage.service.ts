import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  get(key: string): string {
    const data = localStorage.getItem(key);
    if (data && data !== 'undefined' && data !== 'null') {
      return data;
    }

    return null;
  }
}
