import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, results: number = 20): Observable<User[]> {
    return this.http
      .get<ApiResponse>(`${this.API_URL}?page=${page}&results=${results}`)
      .pipe(map((response) => response.results));
  }

  getUserByIndex(index: number): User | null {
    const cachedUsers = localStorage.getItem('cachedUsers');
    if (!cachedUsers) return null;

    const users: User[] = JSON.parse(cachedUsers);
    return users[index] ?? null;
  }
}
