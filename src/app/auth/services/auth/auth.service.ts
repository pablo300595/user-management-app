import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { USER_LIST } from '../../utils';
import { User } from '../../models/user';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): Observable<{ username: string }> {
    return of(USER_LIST).pipe(
      delay(500),
      map((users: User[]) => {
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
          const token = btoa(`${user.username}:${user.password}`);
          localStorage.setItem(TOKEN_KEY, token);
          return { username: user.username };
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
