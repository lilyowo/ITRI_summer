import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'userId';

  setUserId(id: number): void {
    localStorage.setItem(this.storageKey, id.toString());
  }

  getUserId(): number {
    const storedId = localStorage.getItem(this.storageKey);
    return storedId ? parseInt(storedId, 10) : -1;
  }

  clearUserId(): void {
    localStorage.removeItem(this.storageKey);
  }
}
