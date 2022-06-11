import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IMember } from '../models/member.model';

const prefix = 'assets/data/users';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string): Observable<IMember> {
    return this.httpClient.get<IMember>(`${prefix}/${email}.json`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
