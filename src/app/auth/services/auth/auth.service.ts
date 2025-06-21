import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { USER_LIST } from '../../utils';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): Observable<{ username: string }> {
    return of(USER_LIST).pipe(
      delay(500),
      map((users: User[]) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          return { username: user.username };
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }
}
