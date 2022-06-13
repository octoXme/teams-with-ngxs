import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ITeam } from 'src/app/models/team.model';
import { TeamState } from 'src/app/store/teams/teams.state';

@Component({
  selector: 'app-sprint-teams',
  templateUrl: './sprint-teams.component.html',
  styleUrls: ['./sprint-teams.component.scss'],
})
export class SprintTeamsComponent implements OnInit {
  @Select(TeamState.selectCurrentSprintTeams)
  teams$: Observable<ITeam[]>;

  @Select(TeamState.selectCurrentSprint)
  sprint$: Observable<string>;

  constructor() {}

  ngOnInit(): void {}
}
