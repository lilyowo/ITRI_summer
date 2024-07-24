import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: number =-1;

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number  {
    return this.userId;
  }
}
