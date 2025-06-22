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

  getUserByUuid(uuid: string): Observable<User | null> {
    // Since randomuser.me doesn't support direct uuid filtering, you’d typically implement this
    // by storing the result locally or passing the user via router state.
    return this.getUsers().pipe(map((users) => users.find((u) => u.login.uuid === uuid) ?? null));
  }
}
