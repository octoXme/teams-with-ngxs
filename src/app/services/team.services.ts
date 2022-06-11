import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ITeam } from '../models/team.model';

const url = 'assets/data/teams/feature-teams.json';

@Injectable({ providedIn: 'root' })
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  getTeams(): Observable<ITeam[]> {
    return this.httpClient.get<ITeam[]>(url).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
